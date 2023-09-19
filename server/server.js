"use strict";
import { Server } from "socket.io";
var io = new Server();
io.on("connection", function (socket) {
    console.log("It's alive!!!", socket.connected);
});
io.listen(4000);