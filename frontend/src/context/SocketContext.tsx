import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { socket } from "./socket";
import { InitialSocketContext } from "../types/initialSocketContext";

const intialContext: InitialSocketContext = {
    loggedInUsers: []
};

export const socketContext = createContext(intialContext);

const SocketContextProvider = ({ children }: PropsWithChildren) => {
	const [loggedInUsers, setLoggedInUsers] = useState<string[]>([]);

	useEffect(() => {
		const addConnectedUser = (username: string) => {
			setLoggedInUsers((prev) => {
				return [...prev, username];
			});
        };
        
        socket.on("user-connected", addConnectedUser);
        
        return () => {
            socket.off("user-connected", addConnectedUser);
        }
	}, []);

	return (
		<socketContext.Provider value={{ loggedInUsers }}>
			{children}
		</socketContext.Provider>
	);
};

export default SocketContextProvider;
