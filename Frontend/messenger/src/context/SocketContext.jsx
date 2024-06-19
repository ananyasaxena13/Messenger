import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { UserProfileData } from "../hooks/userProfieData";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);

}


export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
    const [id, setId] = useState('');   

    const fetchData = async () => {
        try {
            const userName = localStorage.getItem("User");
            const res = await UserProfileData(userName);
            if (res && res.length > 0 && res[0]._id) {
                setId(res[0]._id);
                const socket = io("http://localhost:4000", {
                    query: {
                        userId: res[0]._id
                    }
                });
                setSocket(socket);
        
                socket.on("getOnlineUsers", (users) => {
                    setOnlineUsers(users);
                });
        
                return () => socket.close();
            } else {}
        } catch (error) {
            console.error("Error fetching user profile data:", error);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}