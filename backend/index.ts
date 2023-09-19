import { 
    Server
    , Socket
} from "socket.io";

const io = new Server( { cors: { origin: '*' } } );

io.on( "connection", ( socket: Socket ) => {
    console.log( `It's alive!!!`, socket.id )
} );

io.listen( 4000 );
