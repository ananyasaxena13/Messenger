import { React, useEffect, useState } from "react";
import "./home.css";
import logout from "../assests/logout.png";
import chat from "../assests/chat.png";
import people from "../assests/people.png";
import { Navigate } from "react-router-dom";
import { Logout } from "../hooks/logout";
import { ChatComponent } from "../ChatComponent/chatComponent";
import { Link } from "react-router-dom";
import { UserProfile } from "../UserProfile/userProfile";
import { ChatComponentMain } from "../ChatComponent/chatComponentMain";
import { ChatScreen } from "../ChatComponent/ChatScreen";
import { AllUser } from "../hooks/AllUser";
import { UserProfileData } from "../hooks/userProfieData";
import ScaleLoader from "react-spinners/ScaleLoader";
import { GroupChat } from "../GroupChat/GroupChat";
import { RecieverProfile } from "../UserProfile/recieverProfile";

export const Home = () => {
  const [seeChat, setSeeChat] = useState(true);
  const [seeProfile, setSeeProfile] = useState(false);
  const [seeGroup, setSeeGroup] = useState(false);
  const [showRecieverProfile, setShowRecieverProfile] = useState(false);

  const [allUser, setAllUser] = useState();
  const [userChat, setUserChat] = useState(false);
  const [text, setText] = useState("");
  const [allRecieverData, setRecieverData] = useState({});
  const [currentUserData, setCurrentUserData] = useState({});

  const logoutFunc = () => {
    const res = Logout();
    if (res) Navigate("/");
  };
  const getUserData = async () => {
    const res = await AllUser(localStorage.getItem("User"));
    setAllUser(res);
  };
  const getUserProfileData = async () => {
    const userName = localStorage.getItem("User");
    const res = await UserProfileData(userName);
    setCurrentUserData(res[0]);
  };
  useEffect(() => {}, [userChat]);
  useEffect(() => {
    getUserData();
    getUserProfileData();
  }, []);
  return (
    <div className="Main" id="Main2">
      <div className="mainMain" id="Main1">
        <div className="section1">
          <div className="section1SideBar">
            <img
              src={chat}
              alt=""
              onClick={() => {
                setSeeChat(true);
                setSeeProfile(false);
                setSeeGroup(false);
                setShowRecieverProfile(false);
              }}
              style={{
                background: `${seeChat ? "rgb(209, 174, 173)" : "none"}`,
                padding: `${seeChat ? "8px" : "0px"}`,
                borderRadius: `${seeChat ? "50%" : "0px"}`,
                width: `${seeChat ? "83%" : "57%"}`,
                height: `${seeChat ? "6%" : "4%"}`,
              }}
            />
            <img
              src={people}
              alt=""
              onClick={() => {
                setSeeChat(false);
                setSeeProfile(false);
                setSeeGroup(true);
                setShowRecieverProfile(false);
              }}
              style={{
                background: `${seeGroup ? "rgb(209, 174, 173)" : "none"}`,
                padding: `${seeGroup ? "8px" : "0px"}`,
                borderRadius: `${seeGroup ? "50%" : "0px"}`,
                width: `${seeGroup ? "83%" : "57%"}`,
                height: `${seeGroup ? "6%" : "4%"}`,
              }}
            />
            <div className="logoDiv">
              <Link onClick={logoutFunc} id="logoutLink">
                <img src={logout} alt="" />
              </Link>
              <div className="profileDiv">
                {currentUserData.profilePhoto ? (
                  <img
                    src={`data:image/jpeg;base64,${currentUserData.profilePhoto}`}
                    alt=""
                    onClick={() => {
                      setSeeChat(false);
                      setSeeProfile(true);
                      setSeeGroup(false);
                      setShowRecieverProfile(false);
                    }}
                  />
                ) : (
                  <ScaleLoader/>
                )}
              </div>
            </div>
          </div>
          {seeChat ? (
            <ChatComponent
              setText={setText}
              setUserChat={setUserChat}
              setAllUser={setAllUser}
              allUser={allUser}
              getUserData={getUserData}
              text={text}
              setRecieverData={setRecieverData}
            />
          ) : null}
          {seeProfile ? <UserProfile /> : null}
          {seeGroup ? <GroupChat /> : null}
          {showRecieverProfile ? (
            <RecieverProfile
              allRecieverData={allRecieverData}
              setSeeChat={setSeeChat}
              setSeeProfile={setSeeProfile}
              setSeeGroup={setSeeGroup}
              setShowRecieverProfile={setShowRecieverProfile}
            />
          ) : null}
        </div>
        {userChat ? (
          <ChatScreen
            allRecieverData={allRecieverData}
            setSeeChat={setSeeChat}
            setSeeProfile={setSeeProfile}
            setSeeGroup={setSeeGroup}
            setShowRecieverProfile={setShowRecieverProfile}
            currentUserId={currentUserData._id}
          />
        ) : (
          <ChatComponentMain />
        )}
      </div>
    </div>
  );
};
