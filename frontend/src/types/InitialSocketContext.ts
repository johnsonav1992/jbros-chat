export interface InitialSocketContext {
	loggedInUsers: string[];
	currentChat: string;
	setCurrentChat: (chatId: string) => void;
}
