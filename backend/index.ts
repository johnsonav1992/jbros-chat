import { 
    Server
    , Socket
} from "socket.io";
import { 
    ActiveUser
    , ClientToServerEvents
    , ServerToClientEvents
} from "./types/types";

const io = new Server<
    ClientToServerEvents
    , ServerToClientEvents
>( { cors: { origin: '*' } } );

const activeUsers: Record<Socket['id'], ActiveUser> = {}

io.on( "connection", socket => {
    socket.on('new-user', userName => {
        activeUsers[ socket.id ] = { socketId: socket.id, userName }
        socket.broadcast.emit( 'user-connected', userName )

        console.log( `A new user has logged on - ${ userName }, id: ${ socket.id }` )
    })
} );

io.listen( 4000 );
