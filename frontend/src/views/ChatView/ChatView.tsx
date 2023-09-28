import styles from "./ChatView.module.css";
import { useEffect, useState, useContext } from "react";
import { socket } from "../../context/socket";
import { useParams } from "react-router-dom";
import { socketContext } from "../../context/SocketContext";
import { MessageBody } from "../../types/MessageBody";

const ChatView = () => {
	const [messages, setMessages] = useState<MessageBody[]>([]);
	const { setChat } = useContext(socketContext);
	const { chatId } = useParams();

	useEffect(() => {
		const getData = (message: string) => {
			setMessages((prev) => {
				const messageBody = {
					message: message,
					isUser: false,
				};

				return [...prev, messageBody];
			});
		};

		setChat(chatId!);

		socket.emit("join-chatroom", chatId);

		setMessages([]);

		socket.on("receive-chatroom-message", getData);

		return () => {
			socket.off("receive-chatroom-message", getData);
		};
	}, [chatId]);

	const sendMessage = (e: any) => {
		e.preventDefault();

		const data = e.target[0].value;

		socket.emit("send-chatroom-message", data, chatId);

		setMessages((prev) => {
			const messageBody = {
				message: data,
				isUser: true,
			};

			return [...prev, messageBody];
		});

		e.target[0].value = "";
	};

	return (
		<div className={styles.chatView}>
			<div className={styles.chatSpace}>
				{messages.map(({ message, isUser }) => {
					return (
						<span
							className={`${
								isUser ? styles.userMessageCont : styles.otherUserMessageCont
							}`}
							key={message}
						>
							<h1
								className={`${styles.userMessage} ${
									isUser ? "" : styles.otherUserMessage
								}`}
							>
								{message}
							</h1>
						</span>
					);
				})}
			</div>
			<span className={styles.formCont}>
				<form className={styles.submitForm} onSubmit={sendMessage}>
					<input placeholder="Message" type="text" />
				</form>
			</span>
		</div>
	);
};

export default ChatView;
