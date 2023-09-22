/* eslint-disable @typescript-eslint/ban-types */
export type ActiveUser = {
    socketId: string;
    userName: string;
};

export type ChatMessageToServerParams = {
    message: string;
    userTo: ActiveUser['socketId'];
};

export type ChatMessageToClientParams ={
    message: string;
    userFrom: ActiveUser['socketId'];
};

export type ErrorType = {
    name: 'chatMessageError' | ( string & {} );
    message: string;
};

export interface ServerError {
    error: ErrorType;
}

export interface ServerToClientEvents {
    'user-connected': ( userName: ActiveUser['userName'] ) => void;
    'chat-message-to-client': ( params: ChatMessageToClientParams ) => void;
    'error': ( error: ServerError ) => void;
}

export interface ClientToServerEvents {
    'new-user': ( submittedUserName: ActiveUser['userName'] ) => void;
    'chat-message-sent': ( params: ChatMessageToServerParams ) => void;
}
