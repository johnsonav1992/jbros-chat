import { useNavigate } from "react-router-dom";
import styles from "./ChatListItem.module.css";
import ProfileIcon from "./components/ProfileIcon/ProfileIcon";

const ChatListItem = () => {
	const navigate = useNavigate();

	const goToChat = () => {
		navigate(`/chat/someId`);
	};

	return (
		<span className={styles.listItem} onClick={goToChat}>
			<span className={styles.unRead}>
				<div />
			</span>
			<ProfileIcon />
			<section className={styles.chatInfo}>
				<span className={styles.title}>
					<h1>Alex Johnson</h1>
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
