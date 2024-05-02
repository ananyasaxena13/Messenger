import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;


    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, id] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: { $all: [senderId, id] },
      });
    }

    console.log("Checked");

    const newMessage = new Message({
      senderId: senderId,
      receiverId: id,
      message: message,
    });

    console.log("Checked");

    if (newMessage) conversation.messages.push(newMessage._id);

    console.log("Checked");

    return res.status(201).json(newMessage);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};