import "./message.css";
import { extractTime } from "../utils/extractTime";

export const Message = ({msg,currentUserId}) => {
    const time = extractTime(msg.createdAt)
    return(
        <div className="messageMain" style={{alignItems: `${currentUserId == msg.senderId ? "flex-end" : "flex-start"}`}}>
            <div className="message" style={{background:`${currentUserId == msg.senderId ? "rgb(250, 200, 200)" : "rgb(200, 170, 170)"}`}}>{msg.message}</div>
            <div className="messageTimeDiv">{time}</div>
        </div>
    )
}