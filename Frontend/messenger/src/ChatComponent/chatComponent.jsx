import { Conversation } from "../Conversation/conversation";
import search from "../assests/search.png";
import { useEffect, useState } from "react";
import { AllUser } from "../hooks/AllUser";

export const ChatComponent = ({getUserData,setAllUser, allUser,setUserChat,setText, text, setRecieverData}) => {

  const [threeDot, setThreeDot] = useState(false);
  const showThreeDot = () => {setThreeDot(!threeDot)};

  useEffect(() => {
    const fetchData = async () => {
        let data = await AllUser(localStorage.getItem("User"));
        let fiteredData = data?.filter(user => user.username.toLowerCase().includes(text.toLowerCase()));
        setAllUser(fiteredData);
    }
    fetchData();
}, [text]);
  return (
    <div className="section1ChatBar">
      <div className="section1ChatBarHeading">
        <div className="heading">
          <h1>Chats</h1>
          </div>
        <div className="userInput">
          <div className="userInputLogo">
            <img src={search} alt="" />
          </div>
          <input type="text" placeholder="Search" onChange={(e)=>setText(e.target.value)}/>
        </div>
      </div>
      <div className="userChat">
        {allUser && allUser.map((user) => (
          <Conversation
            key={user._id} // Assuming _id is a unique identifier
            username={user.username}
            userPP={user.profilePhoto}
            setUserChat={setUserChat}
            setRecieverData={setRecieverData}
          />
        ))}
      </div>
    </div>
  );
};
