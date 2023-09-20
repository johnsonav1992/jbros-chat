import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
	const [isfocused, setIsFocused] = useState(false);

	return (
		<main className={styles.searchbarContainer}>
			<span className={styles.searchbar}>
				<img
					className={styles.searchIcon}
					src="/images/icons/icons8-search-150.png"
				/>
				<input
					onClick={() => setIsFocused(true)}
					type="text"
					placeholder="Search"
				/>
				<div className={styles.closeContainer}>
					{isfocused && (
						<img
							className={styles.closeIcon}
							src="/images/icons/icons8-close-150.png"
							onClick={() => setIsFocused(false)}
						/>
					)}
				</div>
			</span>
		</main>
	);
};

export default SearchBar;
