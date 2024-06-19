
export const UserProfileData = async(username) =>{
    try{
        const res = await fetch(`http://localhost:4000/${username}`,{
            method: "GET",
            headers: {"Content-Type":"application/json"}
        })
        const data = await res.json();
        return data.data;
    }
    catch(e){console.log(e)}
}