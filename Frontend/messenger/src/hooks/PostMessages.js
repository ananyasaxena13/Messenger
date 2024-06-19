import toast from "react-hot-toast"
export const PostMessages = async(currentUser,recieverUser,message) =>{
    try{
        const res = await fetch(`http://localhost:4000/messages/send/${recieverUser}`,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({currentUser,message})
        });
    }
    catch(e){console.log(e);toast.error("Internal Error Occur")}
}