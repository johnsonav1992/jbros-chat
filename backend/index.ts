import { Server, Socket } from "socket.io";
import {
	ActiveUser,
	ClientToServerEvents,
	ServerToClientEvents,
} from "./types/types";

const io = new Server<ClientToServerEvents, ServerToClientEvents>({
	cors: { origin: "*" },
});

const activeUsers = new Map<Socket["id"], ActiveUser>();

io.on("connection", (socket) => {
	// New User Logs In
	socket.on("new-user", (submittedUserName) => {
		activeUsers.set(socket.id, {
			socketId: socket.id,
			userName: submittedUserName,
		});

		socket.broadcast.emit("user-connected", submittedUserName);

		console.log(
			`A new user has logged on - ${submittedUserName}, id: ${socket.id}`
		);
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
			if (
				[...room[1]].some((setRoom) => {
					return setRoom === room[0];
				}) === false
			) {
				actualRooms.push(room[0]);
			}
		});

		return actualRooms;
	};

	// Join Chatroom
	socket.on("join-chatroom", async (roomName) => {
		await socket.join(roomName);

		io.emit("all-chatrooms", getAllRooms());
	});

	// Leave Chatroom
	socket.on("leave-chatroom", async (roomName) => {
		await socket.leave(roomName);

		io.emit("all-chatrooms", getAllRooms());
	});

	// Get All Chatrooms
	socket.on("get-all-chatrooms", () => {
		io.emit("all-chatrooms", getAllRooms());
	});

	// Send Message to Chatroom
	socket.on("send-chatroom-message", (message, roomName) => {
		socket.to(roomName).emit("receive-chatroom-message", message);
	});
});

io.listen(4000);
