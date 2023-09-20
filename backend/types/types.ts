export type ActiveUser = {
    socketId: string;
    userName: string;
}

export interface ServerToClientEvents {
    'user-connected': ( userName: ActiveUser['userName'] ) => void;
}

export interface ClientToServerEvents {
    'new-user': ( submittedUserName: ActiveUser['userName'] ) => void;
}
