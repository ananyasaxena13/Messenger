import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import send from "../assests/send.png";
import { LoadMessages } from "../hooks/LoadMessages";
import { PostMessages } from "../hooks/PostMessages";
import ClipLoader from "react-spinners/ClipLoader";
import { Message } from "../Message/message";
import { useSocketContext } from "../context/SocketContext";
import useListenMessages from "../hooks/useListenMessage";


export const ChatScreen = ({
  allRecieverData,
  setShowRecieverProfile,
  setSeeChat,
  setSeeProfile,
  setSeeGroup,
  currentUserId,
}) => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [Mloading, setMLoading] = useState(false);
  const [messages, setMessages] = useState();

  const Messages = useListenMessages({ allRecieverData });

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(allRecieverData._id);

  const postMessage = async () => {
    setLoading(true);
    await PostMessages(
      localStorage.getItem("User"),
      allRecieverData.username,
      message
    );
    setMessage("");
    
    loadConversation();
    setLoading(false);
  };

  const loadConversation = async () => {
    const currentUser = localStorage.getItem("User");
    if (allRecieverData && allRecieverData.username) {
      setMLoading(true);
      const res = await LoadMessages(allRecieverData.username, currentUser);
      setMessages(res);
      setMLoading(false);
    } else {
      console.error("Error: allRecieverData is undefined or missing username");
    }
  };


  useEffect(() => {
    loadConversation();
    setMessages(Messages);
  }, [allRecieverData]);
  return (
    <div className="ChatScreenMain">
      <div className="ChatScreenHeader">
        <div className="chatScreenProfileImg">
          <img
            src={`data:image/jpeg;base64,${allRecieverData.profilePhoto}`}
            onClick={() => {
              setShowRecieverProfile(true);
              setSeeChat(false);
              setSeeProfile(false);
              setSeeGroup(false);
            }}
            alt=""
          />
        </div>
        <div className="chatScreenRecieverInfo">
          <h3>{allRecieverData.username}</h3>
          <h5>{isOnline ? "Online" : "Offline"}</h5>
        </div>
      </div>
      <div className="ChatScreenChat">
        {Mloading ? (
          <ClipLoader color="#000000" size={30} />
        ) : messages === "No Previous Conversation" ? (
          <h1>Send a Message to start a Conversation</h1>
        ) : messages && messages.length > 0 ? (
          Messages.map((msg, index) => (
            <Message key={index} msg={msg} currentUserId={currentUserId} />
          ))
        ) : <h1>Send a Message to start a Conversation</h1>}
      </div>
      <div className="ChatScreenFooter">
        <button id="addImgBtn">⌚</button>
        <input
          type="text"
          placeholder="Type a message"
          id="chatInput"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              postMessage();
            }
          }}
        />
        {loading ? (
          <ClipLoader color="#000000" size={30} />
        ) : (
          <img src={send} alt="" onClick={postMessage} />
        )}
      </div>
    </div>
  );
};
