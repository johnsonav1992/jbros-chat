/* eslint-disable @typescript-eslint/ban-types */
export type ActiveUser = {
	socketId: string;
	userName: string;
};

export type ChatMessageToServerParams = {
	message: string;
	userTo: ActiveUser["socketId"];
};

export type ChatMessageToClientParams = {
	message: string;
	userFrom: ActiveUser["socketId"];
};

export type ErrorType =
	| {
			name: "genericError";
			message: "There was an error with your request. Please try again or contact support.";
	  }
	| {
			name: "chatMessageError";
			message: "User is not logged on or does not exist.";
	  };

export interface ServerError {
	error: ErrorType;
}

export interface ServerToClientEvents {
	"user-connected": (userName: ActiveUser["userName"]) => void;
	"chat-message-receive": (params: ChatMessageToClientParams) => void;
	error: (error: ServerError) => void;
	"receive-chatroom-message": (message: string) => void;
}

export interface ClientToServerEvents {
	"new-user": (submittedUserName: ActiveUser["userName"]) => void;
	"chat-message-send": (params: ChatMessageToServerParams) => void;
    "join-chatroom": (roomName: string) => void;
    "leave-chatroom": (roomName: string) => void;
	"send-chatroom-message": (message: string, roomName: string) => void;
}
