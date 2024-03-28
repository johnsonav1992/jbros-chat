import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";

import { FormEvent, useContext } from "react";
import { socketContext } from "../../context/SocketContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { socket } from "../../context/socket";

const Main = () => {
	const { currentUser, error } = useContext(socketContext);

	const changeUsername = (e: FormEvent) => {
		e.preventDefault();

		const userInput = ((e.target as HTMLFormElement)[0] as HTMLInputElement)
			.value;

		socket.emit("new-user", userInput, false);
	};

	return (
		<main className={styles.main}>
			<Sidebar />
			<Outlet />
			{currentUser ? undefined : (
				<div className={styles.usernameInput}>
					<form onSubmit={changeUsername}>
						<label>Enter Username</label>
						<input type="text" />
					</form>
					<span>{error ? error : undefined}</span>
				</div>
			)}
		</main>
	);
};

export default Main;
