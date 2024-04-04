import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import {
	ActiveUser,
	ClientToServerEvents,
	Message,
	ServerToClientEvents,
} from "./types/types";

const io = new Server<ClientToServerEvents, ServerToClientEvents>({
	cors: { origin: "*" },
});

const prisma = new PrismaClient();

const activeUsers = new Map<Socket["id"], ActiveUser>();

io.on("connection", (socket) => {
	console.log(Array.from(activeUsers.values()));
	// New User Logs In
	socket.on("new-user", (submittedUserName, validating) => {
		const isTaken = Array.from(activeUsers.values()).some((user) => {
			return user.userName === submittedUserName;
		});

		if (!isTaken) {
			socket.emit("user-connected", submittedUserName);

			return activeUsers.set(socket.id, {
				socketId: socket.id,
				userName: submittedUserName,
			});
		}

		socket.emit("user-exists", submittedUserName, validating);

		console.log(Array.from(activeUsers.values()));
	});

	// Chat messages between single users
	socket.on("chat-message-send", ({ message, userTo }) => {
		const userExists = !!activeUsers.get(userTo);

		if (userExists) {
			socket.to(userTo).emit("chat-message-receive", {
				message,
				userFrom: socket.id,
			});
		} else {
			socket.emit("error", {
				error: {
					name: "chatMessageError",
					message: "User is not logged on or does not exist.",
				},
			});
		}
	});

	const getAllRooms = () => {
		let actualRooms: string[] = [];

		const allRooms = [...io.of("/").adapter.rooms.entries()];

		allRooms.forEach((room) => {
			const roomUserIds = [...room[1]];
			const roomName = room[0];
			const noneMatch = !roomUserIds.some((id) => {
				return id === roomName;
			});

			if (noneMatch) {
				actualRooms.push(roomName);
			}
		});
		console.log(actualRooms);
		return actualRooms;
	};

	// Join Chatroom
	socket.on("join-chatroom", async (roomName) => {
		await socket.join(roomName);

		const foundRoom = await prisma.chatRoom.findFirst({
			where: { name: roomName },
		});
		console.log(foundRoom);
		if (foundRoom) {
			console.log("Room already exists");
			const messages: Message[] = await prisma.message.findMany({
				where: { chatroomId: foundRoom?.id },
			});
			io.emit("get-chatroom-messages", messages);
		} else {
			const newRoom = await prisma.chatRoom.create({
				data: { name: roomName },
			});
			io.emit("get-chatroom-messages", []);
			console.log(newRoom);
		}
		io.emit("all-chatrooms", getAllRooms());
	});

	// Leave Chatroom
	socket.on("leave-chatroom", async (roomName) => {
		await socket.leave(roomName);
		if (!getAllRooms().find((room) => roomName === room)) {
			await prisma.chatRoom.deleteMany({
				where: { name: roomName },
			});
		}
		io.emit("all-chatrooms", getAllRooms());
	});

	// Get All Chatrooms
	socket.on("get-all-chatrooms", () => {
		io.emit("all-chatrooms", getAllRooms());
	});

	// Send Message to Chatroom
	socket.on("send-chatroom-message", async (message, roomName, username) => {
		socket.to(roomName).emit("receive-chatroom-message", message, username);
		const foundRoom = await prisma.chatRoom.findFirst({
			where: { name: roomName },
		});
		await prisma.message.create({
			data: {
				message: message,
				username: username,
				chatRoom: { connect: { id: foundRoom?.id } },
			},
		});
	});
});

prisma.chatRoom.deleteMany({}).then(() => io.listen(4000));
