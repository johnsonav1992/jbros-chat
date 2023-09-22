import styles from "./ComposeIcon.module.css";
import { ImageProps } from "../../../../../../types/ImageProps";

const ComposeIcon = ({ height, width }: ImageProps) => {
	return (
		<img
			className={styles.composeIcon}
			height={height}
			width={width}
			src="/images/icons/icons8-compose-100.png"
		/>
	);
};

export default ComposeIcon;
