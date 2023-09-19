import { Server } from "socket.io";

const io = new Server();

io.on( "connection", ( socket ) => {
    console.log( `it's alive!!`, socket.connected )
} );

io.listen( 4000 );