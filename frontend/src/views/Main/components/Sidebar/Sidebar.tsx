import ChatListItem from "./components/ChatListItem/ChatListItem";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<span className={styles.compose}>
				<img src="/images/icons/icons8-compose-100.png" />
			</span>
			<SearchBar />
			<ul className={styles.chatList}>
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
                <ChatListItem />
			</ul>
		</div>
	);
};

export default Sidebar;
