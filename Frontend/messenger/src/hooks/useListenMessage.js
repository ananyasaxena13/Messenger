import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { LoadMessages } from "../hooks/LoadMessages";

const useListenMessages = ({ allRecieverData }) => {
    const { socket } = useSocketContext();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadConversation = async () => {
            const currentUser = localStorage.getItem("User");
            const res = await LoadMessages(allRecieverData.username, currentUser);
            setMessages(res);
        };

        loadConversation();

        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, allRecieverData]);

    return messages;
};


export default useListenMessages;
