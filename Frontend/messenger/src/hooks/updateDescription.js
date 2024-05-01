import toast from "react-hot-toast";


export const UpdateDescription = async(username , description) =>{
    try{
        const res = await fetch(`http://localhost:4000/${username}/updateDesc`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({description})
        });
        const data = await res.json();
        toast.success(`${data.message}`);
        return data.message;
    }
    catch(e){
        toast.error('Internal Error Occur Try after some time 😞');
        console.log(e);
    }
}