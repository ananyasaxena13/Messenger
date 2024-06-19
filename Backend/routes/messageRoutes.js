import express from "express";
import { sendMessage, getMessages} from "../controllers/messageControllers.js";

const messageRouter = express.Router();

messageRouter.post("/send/:recieverUser",sendMessage);
messageRouter.get("/:id/:currentUser",getMessages);


export {messageRouter};