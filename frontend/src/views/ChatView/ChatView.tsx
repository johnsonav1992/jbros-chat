import styles from "./ChatView.module.css";
import { useEffect, useState, useContext } from "react";
import { socket } from "../../context/socket";
import { useParams } from "react-router-dom";
import { socketContext } from "../../context/SocketContext";
import { MessageBody } from "../../types/MessageBody";

const ChatView = () => {
	const [messages, setMessages] = useState<MessageBody[]>([]);
	const { setCurrentChat, currentUser } = useContext(socketContext);
	const { chatId } = useParams();

	useEffect(() => {
		const getData = (message: string, username: string) => {
			const receivedChatSound = new Audio("/livechat-129007.mp3");

			setMessages((prev) => {
				const messageBody = {
					message: message,
					username: username,
					needsLabel:
						prev.length >= 1
							? prev[prev.length - 1].username !== username
							: true,
					isUser: false,
				};

				return [...prev, messageBody];
			});

			receivedChatSound.play();
		};

		const setMessagesFromDb = (messages: MessageBody[]): void => {
			messages.forEach((message, i, messages) => {
				message.needsLabel =
					i === 0 ? true : messages[i - 1].username !== messages[i].username;
				message.isUser = currentUser === message.username;
			});
			setMessages(messages);
		};

		setCurrentChat((prev) => {
			if (prev !== chatId) {
				socket.emit("join-chatroom", chatId);
				return chatId!;
			} else {
				return prev;
			}
		});

		socket.on("get-chatroom-messages", setMessagesFromDb);
		socket.on("receive-chatroom-message", getData);

		return () => {
			socket.off("get-chatroom-messages", setMessagesFromDb);
			socket.off("receive-chatroom-message", getData);
		};
	}, [chatId]);

	const sendMessage = (e: any) => {
		e.preventDefault();

		const chatSound = new Audio("/the-notification-email-143029.mp3");

		const data = e.target[0].value;

		if (data.trim() === "") {
			e.target[0].value = "";
			return;
		}

		socket.emit("send-chatroom-message", data, chatId, currentUser);

		setMessages((prev) => {
			const messageBody = {
				message: data,
				username: currentUser,
				needsLabel:
					messages.length >= 1
						? messages[messages.length - 1].username !== currentUser
						: true,
				isUser: true,
			};

			return [...prev, messageBody];
		});

		chatSound.play();
		e.target[0].value = "";
	};

	return (
		<div className={styles.chatView}>
			<span className={styles.chatTopBar}>
				<p>
					Room: <strong>{chatId}</strong>
				</p>
			</span>
			<div className={styles.chatSpace}>
				{messages
					.map(({ message, isUser, username, needsLabel }, i, messages) => {
						return (
							<div
								key={i}
								className={
									needsLabel ? styles.chatAnimation : styles.chatAnimationSmall
								}
							>
								{needsLabel ? (
									<label
										className={`${
											isUser ? styles.userLabel : styles.otherUserLabel
										}`}
									>
										<span className={styles.usernameSpan}>{username}</span>
									</label>
								) : undefined}
								<span
									className={`${
										isUser
											? styles.userMessageCont
											: styles.otherUserMessageCont
									}`}
								>
									<h1
										className={`${styles.userMessage} ${
											isUser ? "" : styles.otherUserMessage
										} ${
											i === messages.length - 1 ||
											messages[i].username !== messages[i + 1].username
												? isUser
													? styles.last
													: styles.otherUserLast
												: undefined
										}`}
									>
										{message}
									</h1>
								</span>
							</div>
						);
					})
					.reverse()}
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
