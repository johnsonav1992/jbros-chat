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
		const setIncomingMessage = (message: string, username: string) => {
			const receivedChatSound = new Audio("/livechat-129007.mp3");

			setMessages((prev) => {
				const messageBody = {
					message: message,
					username: username,
				};

				return [...prev, messageBody];
			});

			receivedChatSound.play();
		};

		const setMessagesFromDb = (messages: MessageBody[]): void => {
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
		socket.on("receive-chatroom-message", setIncomingMessage);

		return () => {
			socket.off("get-chatroom-messages", setMessagesFromDb);
			socket.off("receive-chatroom-message", setIncomingMessage);
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
			};

			return [...prev, messageBody];
		});

		chatSound.play();
		e.target[0].value = "";
	};

	const setStyles = ({
		username,
		i,
		messages,
		styleType,
	}: {
		username?: string;
		i?: number;
		messages?: MessageBody[];
		styleType: string;
	}) => {
		const isUser = username ? currentUser === username : false;

		switch (styleType) {
			case "label":
				return isUser ? styles.userLabel : styles.otherUserLabel;
			case "messageBody":
				return isUser ? styles.userMessageCont : styles.otherUserMessageCont;
			case "messageContent":
				return `${styles.userMessage} ${
					isUser ? "" : styles.otherUserMessage
				} ${
					i != null && messages
						? i === messages.length - 1 ||
						  messages[i].username !== messages[i + 1].username
							? isUser
								? styles.last
								: styles.otherUserLast
							: undefined
						: ""
				}`;
			case "messageContainer":
				return i != null && messages
					? needsLabel(messages, i)
						? styles.chatAnimation
						: styles.chatAnimationSmall
					: "";
		}
	};

	const needsLabel = (messages: MessageBody[], i: number): boolean => {
		return i === 0 ? true : messages[i - 1].username !== messages[i].username;
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
					.map(({ message, username }, i, messages) => {
						return (
							<div
								key={i}
								className={setStyles({
									messages,
									i,
									styleType: "messageContainer",
								})}
							>
								{needsLabel(messages, i) && (
									<label
										className={setStyles({
											username,
											styleType: "label",
										})}
									>
										<span className={styles.usernameSpan}>{username}</span>
									</label>
								)}
								<span
									className={setStyles({
										username,
										styleType: "messageBody",
									})}
								>
									<h1
										className={setStyles({
											username,
											i,
											messages,
											styleType: "messageContent",
										})}
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
