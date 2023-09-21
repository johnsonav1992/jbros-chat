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
    socket.on( 'new-user', submittedUserName => {
        activeUsers.set( socket.id, {
            socketId: socket.id
            , userName: submittedUserName
        } );
        socket.broadcast.emit( 'user-connected', submittedUserName );

        console.log( `A new user has logged on - ${ submittedUserName }, id: ${ socket.id }` );
    } );
} );

io.listen( 4000 );
