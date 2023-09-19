import { Server } from "socket.io";

const io = new Server();

io.on( "connection", ( socket ) => {
    console.log( `It's alive!!`, socket.connected )
} );

io.listen( 4000 );