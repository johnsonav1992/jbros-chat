import { ImageProps } from "../../../../../../../../types/ImageProps";
import styles from "./ProfileIcon.module.css";

const ProfileIcon = ({ height, width }: ImageProps) => {
	return (
		<img
			className={styles.profileIcon}
			height={height}
			width={width}
			src="/images/icons/icons8-person-100.png"
		/>
	);
};

export default ProfileIcon;
