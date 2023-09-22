import styles from "./ChatWelcome.module.css";

const ChatWelcome = () => {
	return (
		<main className={styles.welcomeScreen}>
			<div>
                <h1 className={styles.title}>Welcome to JBros's Chat!!</h1>
                <h2 className={styles.subTitle}>Enjoy your stay and happy chatting!</h2>
			</div>
		</main>
	);
};

export default ChatWelcome;
