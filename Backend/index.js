import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from './mongodb/connectDb.js';
import {authRouter} from './routes/authRoutes.js';
import {messageRouter} from './routes/messageRoutes.js';
import { getDataRouter } from './routes/getDataRoutes.js';
import { app, server } from "./Socket/socket.js";

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials:true,
    optionSuccessStatus:200
}))
app.use(cookieParser());

app.use("/",authRouter);
app.use("/messages",messageRouter);
app.use("/",getDataRouter);

connectDb();

server.listen(4000, () => {
    console.log('Server is running on port 4000');
}) 