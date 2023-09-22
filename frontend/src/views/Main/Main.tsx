import styles from "./Main.module.css";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";

const Main = () => {
	return (
		<main className={styles.main}>
			<Sidebar />
			<Outlet />
		</main>
	);
};

export default Main;
