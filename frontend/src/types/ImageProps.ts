import { ComponentProps } from "react";

export interface ImageProps extends ComponentProps<"img"> {
	width?: string;
	height?: string;
}
