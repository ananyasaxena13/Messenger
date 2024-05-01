import {React,useState} from "react";
import "./home.css";
import logout from "../assests/logout.png";
import chat from "../assests/chat.png";
import wave from "../assests/wave.png";
import profile_logo from "../assests/profile_logo.jpg";
import { Navigate } from "react-router-dom";
import { Logout } from "../hooks/logout";
import { ChatComponent } from "../ChatComponent/chatComponent";
import { Link } from "react-router-dom";
import { UserProfile } from "../UserProfile/userProfile";

export const Home = () => {

  const [seeChat , setSeeChat] = useState(true)
  const seeProfileChat = () =>{
    setSeeChat(!seeChat);
  }
  const logoutFunc = () => {
    const res = Logout();
    if(res) Navigate("/");
  }

  return (
    <div className="Main" id="Main2">
      <div className="mainMain" id="Main1">
        <div className="section1">
          <div className="section1SideBar">
            <img src={chat} alt="" onClick={seeProfileChat}/>
            <div className="logoDiv">
              <Link onClick={logoutFunc} id="logoutLink"><img src={logout} alt=""/></Link>
              <div className="profileDiv">
                <img src={profile_logo} alt="" onClick={seeProfileChat}/>
              </div>
            </div>
          </div>
          {
            seeChat ? <ChatComponent/> : <UserProfile/>
          }
        </div>
        <div className="section2">
            <div className="waveHand1">
              <div className="waveHand">
                <img src={wave} alt="" />
              </div>
            </div>
            <h2>Welcome to Messenger!!</h2>
            <h3>Connect, Engage, and Grow with Messenger</h3>
        </div>
      </div>
    </div>
  );
};