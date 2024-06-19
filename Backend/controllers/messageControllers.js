import { getReceiverSocketId,io } from "../Socket/socket.js";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const {currentUser } = req.body;
    const sender = await User.findOne({username:currentUser});
    const senderId = await sender["_id"];
    const { recieverUser } = req.params;
    const reciever = await User.findOne({username:recieverUser});
    const recieverId = await reciever["_id"];
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    const newMessage = new Message({
      senderId: senderId,
      receiverId: recieverId,
      message: message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);
    await conversation.save();
    await newMessage.save();

    const recieverSocketId = getReceiverSocketId(recieverId);
    if (recieverSocketId) {
			io.to(recieverSocketId).emit("newMessage", newMessage);
		}


    return res.status(201).json(newMessage);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { currentUser } = req.params;
    const sender = await User.findOne({ username: currentUser });

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const senderId = sender._id;

    const { id } = req.params; //id of a user to whom we are chatting
    const receiver = await User.findOne({ username: id });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const receiverId = receiver._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "No Previous Conversation" });
    }

    const messages = conversation.messages;
    
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


