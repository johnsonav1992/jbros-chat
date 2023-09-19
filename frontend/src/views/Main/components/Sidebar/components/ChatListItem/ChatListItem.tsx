import styles from "./ChatListItem.module.css";

const ChatListItem = () => {
	return (
		<span className={styles.listItem}>
			<span className={styles.unRead}>
				<div />
			</span>
			<img src="/images/icons/icons8-person-100.png" />
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
