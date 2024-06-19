import toast from "react-hot-toast";

export const LoadMessages = async(username,currentUser) =>{
    try{
        const res = await fetch(`http://localhost:4000/messages/${username}/${currentUser}`,{method:"GET"});
        const messages = await res.json();
        return messages;
    }
    catch(e){
        console.log(e);
        toast.error("Internal Error Occur");
    }
}