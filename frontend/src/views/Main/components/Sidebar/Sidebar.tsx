import { useNavigate } from "react-router-dom";
import ChatListItem from "./components/ChatListItem/ChatListItem";
import ComposeIcon from "./components/ComposeIcon/ComposeIcon";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./Sidebar.module.css";
import { socket } from "../../../../context/socket";
import { useContext, useEffect, useState } from "react";
import { socketContext } from "../../../../context/SocketContext";

const Sidebar = () => {
	const navigate = useNavigate();
	const [rooms, setAllRooms] = useState<string[]>([]);
	const { currentChat, setCurrentChat } = useContext(socketContext);
	const [isCreating, setIsCreating] = useState(false);

	const goHome = () => {
		if (currentChat !== "") {
			socket.emit("leave-chatroom", currentChat);

			setCurrentChat("");

			navigate("/");
		}
	};

	const createChatroom = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = e.target[0].value;

		if (currentChat !== "") {
			socket.emit("leave-chatroom", currentChat);
		}

		navigate(`/chat/${data}`);

		setIsCreating(false);
	};

	useEffect(() => {
		const setRooms = (rooms: string[]) => {
			console.log(rooms);
			setAllRooms(rooms);
		};

		socket.emit("get-all-chatrooms");

		socket.on("all-chatrooms", setRooms);

		return () => {
			socket.off("all-chatrooms", setRooms);
		};
	}, []);

	return (
		<div className={styles.sidebar}>
			<span className={styles.compose}>
				<button onClick={goHome} className={styles.homeButton}>
					Home
				</button>
				<ComposeIcon onClick={() => setIsCreating(true)} />
				{isCreating ? (
					<form onSubmit={createChatroom} className={styles.roomForm}>
						<h3>Create Room</h3>
						<input placeholder="Room Name" type="text" />
					</form>
				) : undefined}
			</span>
			<SearchBar />
			<ul className={styles.chatList}>
				{rooms.map((room: any) => {
					return <ChatListItem key={room} name={room} />;
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
