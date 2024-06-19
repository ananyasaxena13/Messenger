import React, { useEffect, useState } from "react";
import "./conversation.css";
import { Link } from "react-router-dom";
import { UserProfileData } from "../hooks/userProfieData";

export const Conversation = ({username,setUserChat, setRecieverData, userPP}) => {

    const [data , setData] = useState({});
    const getUserData = async()=>{
        const res  = await UserProfileData(username);
        setData(res[0]);
    }
    const conversationFunc = () =>{
        setUserChat(true);
        getUserData();
        setRecieverData(data);
    }
    useEffect(()=>{
        getUserData();
    },[])

    return (
        <Link className="conversationMain" onClick={conversationFunc}>
            <div className="profileImg"><img src={`data:image/jpeg;base64,${userPP}`} alt="" /></div>
            <div className="profileName">
                <h3>{username}</h3>
            </div>
        </Link>
    )
}