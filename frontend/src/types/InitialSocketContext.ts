export interface InitialSocketContext {
	loggedInUsers: string[];
	currentChat: string;
	currentUser: string;
	error: string;
	setCurrentUser: (username: string) => void;
	setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}
