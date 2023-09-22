import {
    Server
    , Socket
} from 'socket.io';
import {
    ActiveUser
    , ClientToServerEvents
    , ServerToClientEvents
} from './types/types';

const io = new Server<
    ClientToServerEvents
    , ServerToClientEvents
>( { cors: { origin: '*' } } );

const activeUsers = new Map<Socket['id'], ActiveUser>();

io.on( 'connection', socket => {
    console.log( socket.id );

    // New User Logs In
    socket.on( 'new-user', submittedUserName => {
        activeUsers.set( socket.id, {
            socketId: socket.id
            , userName: submittedUserName
        } );
        socket.broadcast.emit( 'user-connected', submittedUserName );

        console.log( `A new user has logged on - ${ submittedUserName }, id: ${ socket.id }` );
    } );

    // Chat messages between single users
    socket.on( 'chat-message-sent', ( { message, userTo } ) => {
        socket.to( userTo ).emit( 'chat-message-to-client', {
            message
            , userFrom: socket.id
        } );
    } );

} );

io.listen( 4000 );
