import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { socket } from "./socket";
import { InitialSocketContext } from "../types/InitialSocketContext";

const intialContext: InitialSocketContext = {
	loggedInUsers: [],
	currentChat: "",
	setChat: () => {},
};

export const socketContext = createContext(intialContext);

const SocketContextProvider = ({ children }: PropsWithChildren) => {
	const [loggedInUsers, setLoggedInUsers] = useState<string[]>([]);
	const [currentChat, setCurrentChat] = useState<string>("");

	useEffect(() => {
		const addConnectedUser = (username: string) => {
			setLoggedInUsers((prev) => {
				return [...prev, username];
			});
		};

		socket.on("user-connected", addConnectedUser);

		return () => {
			socket.off("user-connected", addConnectedUser);
		};
	}, []);

	const setChat = (chatId: string) => {
		setCurrentChat(chatId);
	};

	return (
		<socketContext.Provider value={{ loggedInUsers, currentChat, setChat }}>
			{children}
		</socketContext.Provider>
	);
};

export default SocketContextProvider;
