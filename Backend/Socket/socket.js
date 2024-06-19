import {Server} from "socket.io";
import express from "express";
import http from "http";


const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    console.log(userSocketMap[receiverId]);
    console.log("Done");
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}


io.on('connection', async (socket) => {
    console.log("A User Connected", socket.id);

    const userId = await socket.handshake.query.userId;

    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(userSocketMap);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A User Disconnected", socket.id);
        // Remove the userId from userSocketMap when socket disconnects
        const disconnectedUserId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        delete userSocketMap[disconnectedUserId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export { app, io, server };