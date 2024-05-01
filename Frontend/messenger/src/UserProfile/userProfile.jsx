import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { UserProfileData } from "../hooks/userProfieData";
import { UpdateDescription } from "../hooks/updateDescription";
import profile_logo from "../assests/profile_logo.png";
import { UploadProfilePhoto } from "../hooks/uploadProfilePhoto";

export const UserProfile = () => {
    

    const [AboutButton , setAboutButton] = useState(true);
    const [alldata , setallData] = useState({});
    const [description , setDescription] = useState("");
    const [profilePhoto , setProfilePhoto] = useState(null);

    const updateDescription = async() =>{
        const res = await UpdateDescription(localStorage.getItem("User"),description);
        setAboutButton(!AboutButton);
    }
    const handleProfilePhoto = (event)  =>{
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    }
    const uploadProfilePhoto = async() =>{
        const formData = new FormData();
        formData.append("file", profilePhoto);
        const res = await UploadProfilePhoto(localStorage.getItem("User"),formData);
    }
    const buttonChange = () =>{
        setAboutButton(!AboutButton);
    }
    const getUserProfileData = async() =>{
        const userName = localStorage.getItem("User");
        const res = await UserProfileData(userName);
        setallData(res[0]);
    }

    useEffect(() => {getUserProfileData();}, []);
    return(
        <div className="section1ChatBar" id="section1ChatBar">
            <h2 id="UserProfileFullname">Profile</h2>
            <div className="userProfileImage"><img src={profilePhoto==null ? {profile_logo} : profilePhoto} alt="" /></div>
            <div className="addImageButton">
                {profilePhoto==null ? <input type="file"  onChange={handleProfilePhoto}/> : <input type="submit" onClick={uploadProfilePhoto} />}
                {profilePhoto==null ? '➕' : '✔'}
            </div>
            <div className="divider"></div>
            <h4 id="userProfileHeading">Your Username</h4>
            <h1 id="UserProfileUsername">{localStorage.getItem("User")}</h1>
            <h2 id="UserProfileFullname">{alldata.fullname}</h2>
            <div id="userProfileAboutDiv"><h4>About</h4> {AboutButton ? <button id="userProfileAboutEdit" onClick={buttonChange}>✏</button> : <button id="userProfileAboutEdit" onClick={updateDescription}>✔</button>}</div>
            {AboutButton ? <p id="UserProfileDescription">{alldata.about}</p> : <input type="text" id="UserProfileDescriptionInput" placeholder={alldata.about}  onChange={(e) => setDescription(e.target.value)}/>}
        </div>
    )
}
