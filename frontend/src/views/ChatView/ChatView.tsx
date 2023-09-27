import styles from "./ChatView.module.css";
import { useEffect, useState, useContext } from "react";
import { socket } from "../../context/socket";
import { useParams } from "react-router-dom";
import { socketContext } from "../../context/SocketContext";

const ChatView = () => {
	const [message, setMessage] = useState<string[]>([]);
	const { setChat } = useContext(socketContext);
	const { chatId } = useParams();

	useEffect(() => {
		const getData = (message: string) => {
			setMessage((prev) => {
				return [...prev, message];
			});
		};

		setChat(chatId!);

		socket.emit("join-chatroom", chatId);

		socket.on("receive-chatroom-message", getData);

		return () => {
			socket.off("receive-chatroom-message", getData);
		};
	}, []);

	return (
		<div className={styles.chatView}>
			<div>{message}</div>
		</div>
	);
};

export default ChatView;
