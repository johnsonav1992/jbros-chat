import { useNavigate } from "react-router-dom";
import styles from "./ChatListItem.module.css";
import ProfileIcon from "./components/ProfileIcon/ProfileIcon";
import { socket } from "../../../../../../context/socket";
import { useContext } from "react";
import { socketContext } from "../../../../../../context/SocketContext";

interface Props {
	name: string;
}

const ChatListItem = ({ name }: Props) => {
	const navigate = useNavigate();
	const { currentChat } = useContext(socketContext);

	const goToChat = () => {
		if (name === currentChat) {
			return;
		}

		socket.emit("leave-chatroom", currentChat);

		navigate(`/chat/${name}`);
	};

	return (
		<span className={styles.listItem} onClick={goToChat}>
			<span className={styles.unRead}>
				<div />
			</span>
			<ProfileIcon />
			<section className={styles.chatInfo}>
				<span className={styles.title}>
					<h1>{name}</h1>
					<h4>3:00 PM</h4>
				</span>
				<p className={styles.textContent}>
					This is some sick dummy chat text to test out this sick freaking chat
					app
				</p>
			</section>
		</span>
	);
};

export default ChatListItem;
