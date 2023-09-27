import styles from "./ChatView.module.css";
import { useContext } from "react";
import { socketContext } from "../../context/SocketContext";
import { socket } from "../../context/socket";

const ChatView = () => {
    const { loggedInUsers } = useContext(socketContext)

    const sendId = () => {
        socket.emit('chat-message-send', {message: "Sup bro", userTo: "_s8gWlm0Hi9cHb_0AAAD"})
    }
    
	return (
		<div className={styles.chatView}>
            <div>
                {loggedInUsers}
                <button onClick={sendId}>Send My Id</button>
            </div>
		</div>
	);
};

export default ChatView;
