import { useNavigate } from "react-router-dom";
import ChatListItem from "./components/ChatListItem/ChatListItem";
import ComposeIcon from "./components/ComposeIcon/ComposeIcon";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./Sidebar.module.css";
import { socket } from "../../../../context/socket";
import { useContext } from "react";
import { socketContext } from "../../../../context/SocketContext";

const Sidebar = () => {
    const navigate = useNavigate()
    const {currentChat} = useContext(socketContext)

    const goHome = () => {
        socket.emit("leave-chatroom", currentChat)
        navigate("/")
    }

	return (
		<div className={styles.sidebar}>
            <span className={styles.compose}>
                <button onClick={goHome} className={styles.homeButton}>Home</button>
				<ComposeIcon />
			</span>
			<SearchBar />
			<ul className={styles.chatList}>
                <ChatListItem />
			</ul>
		</div>
	);
};

export default Sidebar;
