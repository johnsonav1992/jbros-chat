import { Server, Socket } from "socket.io";

const io = new Server( { 
    cors: { origin: '*' }
} );

io.on( "connection", ( socket: Socket ) => {
    console.log( `It's alive!!!`, socket.connected )
} );

io.listen( 4000 );
