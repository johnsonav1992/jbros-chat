import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
	const [isfocused, setIsFocused] = useState(false);

	const focus = (): void => {
		setIsFocused(true);
	};

	const unFocus = (): void => {
		setIsFocused(false);
	};

	return (
		<main className={styles.searchbarContainer}>
			<span className={styles.searchbar}>
				<img
					className={styles.searchIcon}
					src="/images/icons/icons8-search-150.png"
				/>
				<input onClick={focus} type="text" placeholder="Search" />
				<div className={styles.closeContainer}>
					{isfocused && (
						<img
							className={styles.closeIcon}
							src="/images/icons/icons8-close-150.png"
							onClick={unFocus}
						/>
					)}
				</div>
			</span>
		</main>
	);
};

export default SearchBar;
