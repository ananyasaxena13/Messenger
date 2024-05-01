import React from "react";
import "./conversation.css";
import { Link } from "react-router-dom";

export const Conversation = ({username}) => {
    const conversationFunc = () =>{
        console.log(username);
    }
    return (
        <Link className="conversationMain" onClick={conversationFunc}>
            <div className="profileImg"><img src="" alt="" /></div>
            <div className="profileName">
                <h3>Profile Name</h3>
                <p>Last Message</p>
            </div>
        </Link>
    )
}