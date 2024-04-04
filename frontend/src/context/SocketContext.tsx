import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { socket } from "./socket";
import { InitialSocketContext } from "../types/InitialSocketContext";

const intialContext: InitialSocketContext = {
	loggedInUsers: [],
	currentChat: "",
	currentUser: "",
	error: "",
	setCurrentUser: () => {},
	setCurrentChat: () => {},
};

export const socketContext = createContext(intialContext);

const SocketContextProvider = ({ children }: PropsWithChildren) => {
	const [loggedInUsers, setLoggedInUsers] = useState<string[]>([]);
	const [currentChat, setCurrentChat] = useState<string>("");
	const [currentUser, setCurrentUser] = useState<string>("");
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const addConnectedUser = (username: string) => {
			setCurrentUser(username);
			localStorage.setItem("username", username);
			setLoggedInUsers((prev) => {
				return [...prev, username];
			});
		};

		const addOrDeleteUser = (username: string, validating: boolean) => {
			if (validating) {
				setCurrentUser(username);
			} else {
				setError("User Already Exists");
			}
		};

		const username = localStorage.getItem("username");

		if (username) {
			socket.emit("new-user", username, true);
		}

		socket.on("user-exists", addOrDeleteUser);
		socket.on("user-connected", addConnectedUser);

		return () => {
			socket.off("user-connected", addConnectedUser);
			socket.off("user-exists", addOrDeleteUser);
		};
	}, []);

	return (
		<socketContext.Provider
			value={{
				loggedInUsers,
				currentChat,
				currentUser,
				error,
				setCurrentChat,
				setCurrentUser,
			}}
		>
			{children}
		</socketContext.Provider>
	);
};

export default SocketContextProvider;
