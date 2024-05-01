import { Conversation } from "../Conversation/conversation";
import search from "../assests/search.png";


export const ChatComponent = () =>{
    return(
        <div className="section1ChatBar">
            <div className="section1ChatBarHeading">
              <h1>Chats</h1>
              <div className="userInput">
                <div className="userInputLogo">
                  <img src={search} alt="" />
                </div>
                <input type="text" placeholder="Search" />
              </div>
            </div>
            <div className="userChat">
                <div className="fitUserChat">
                  <Conversation username={"Bhagyodaya07"}/>
                  <Conversation username={"Ayush Pandey"}/>
                </div>
            </div>
          </div>
    )
}