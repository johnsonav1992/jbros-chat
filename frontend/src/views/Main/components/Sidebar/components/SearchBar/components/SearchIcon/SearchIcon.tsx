import { ImageProps } from "../../../../../../../../types/ImageProps";
import styles from "./SearchIcon.module.css";

const SearchIcon = ({ width, height }: ImageProps) => {
	return (
		<img
			className={styles.searchIcon}
			width={width}
			height={height}
			src="/images/icons/icons8-search-150.png"
		/>
	);
};

export default SearchIcon;
