export interface InitialSocketContext {
	loggedInUsers: string[];
	currentChat: string;
	setChat: (chatId: string) => void;
}
