import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";

import { FormEvent, useContext, useRef } from "react";
import { socketContext } from "../../context/SocketContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { socket } from "../../context/socket";

const Main = () => {
	const { currentUser, error } = useContext(socketContext);
	const inputValue = useRef<HTMLInputElement>(null);

	const changeUsername = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputValue.current) {
			const userInput = inputValue.current.value;

			socket.emit("new-user", userInput, false);
		}
	};

	return (
		<main className={styles.main}>
			<Sidebar />
			<Outlet />
			{currentUser ? undefined : (
				<div className={styles.usernameInput}>
					<form onSubmit={changeUsername}>
						<label>Enter Username</label>
						<input type="text" ref={inputValue} />
					</form>
					<span>{error ? error : undefined}</span>
				</div>
			)}
		</main>
	);
};

export default Main;
