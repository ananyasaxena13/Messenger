import toast from "react-hot-toast"


export const UploadProfilePhoto = async(username,formData) =>{
    try{
        const res = await fetch(`http://localhost:4000/${username}/update/updateProfilePhoto`,{
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if(data.message == "Profile Photo size exceeds 1 MB limit") {
            toast.error(`${data.message}`);
            return false
        }
        toast.success(`${data.message}`);
        return true;
    }
    catch(e){
        toast.error('Internal Error Occur Try after some time 😞');
        console.log(e);
    }
}