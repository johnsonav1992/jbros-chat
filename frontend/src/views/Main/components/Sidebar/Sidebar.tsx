import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socketContext } from "../../../../context/SocketContext";
import { socket } from "../../../../context/socket";
import styles from "./Sidebar.module.css";
import ChatListItem from "./components/ChatListItem/ChatListItem";
import ComposeIcon from "./components/ComposeIcon/ComposeIcon";
import SearchBar from "./components/SearchBar/SearchBar";

const Sidebar = () => {
	const navigate = useNavigate();
	const [rooms, setAllRooms] = useState<string[]>([]);
	const { currentChat, setCurrentChat } = useContext(socketContext);
	const [isCreating, setIsCreating] = useState(false);
	const formRef = useRef<any>();

	const goHome = () => {
		if (currentChat !== "") {
			socket.emit("leave-chatroom", currentChat);

			setCurrentChat("");

			navigate("/");
		}
	};

	const createChatroom = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;

		if (currentChat !== "" && currentChat !== data) {
			socket.emit("leave-chatroom", currentChat);
		}

		navigate(`/chat/${data}`);

		setIsCreating(false);
	};

	useEffect(() => {
		const setRooms = (rooms: string[]) => {
			setAllRooms(rooms);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as HTMLFormElement)
			) {
				setIsCreating(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		socket.emit("get-all-chatrooms");
		socket.on("all-chatrooms", setRooms);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
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
					<form
						onSubmit={createChatroom}
						className={styles.roomForm}
						ref={formRef}
					>
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
