export type ActiveUser = {
    socketId: string;
    userName: string;
};

export type ChatMessageToServerParams = {
    message: string;
    userTo: string;
};

export type ChatMessageToClientParams ={
    message: string;
    userFrom: string;
    userTo: string;
};

export interface ServerToClientEvents {
    'user-connected': ( userName: ActiveUser['userName'] ) => void;
    'chat-message-server': ( params: ChatMessageToServerParams ) => void;
}

export interface ClientToServerEvents {
    'new-user': ( submittedUserName: ActiveUser['userName'] ) => void;
    'chat-message-client': ( params: ChatMessageToClientParams ) => void;
}
