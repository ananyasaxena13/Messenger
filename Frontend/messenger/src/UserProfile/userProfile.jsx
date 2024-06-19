import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { UserProfileData } from "../hooks/userProfieData";
import { UpdateDescription } from "../hooks/updateDescription";
import { UploadProfilePhoto } from "../hooks/uploadProfilePhoto";
import { DeleteAccount } from "../hooks/DeleteAccount";
import ScaleLoader from "react-spinners/ScaleLoader";

export const UserProfile = () => {
  const [AboutButton, setAboutButton] = useState(true);
  const [alldata, setallData] = useState({});
  const [description, setDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateDescription = async () => {
    const res = await UpdateDescription(
      localStorage.getItem("User"),
      description
    );
    setAboutButton(!AboutButton);
    window.location.reload();
  };

  const handleProfilePhoto = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const buttonChange = () => {
    setAboutButton(!AboutButton);
  };
  const getUserProfileData = async () => {
    const userName = localStorage.getItem("User");
    const res = await UserProfileData(userName);
    setallData(res[0]);
  };
  const uploadProfilePhoto = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    try {
      const res = await UploadProfilePhoto(
        localStorage.getItem("User"),
        formData
      );
      setLoading(false);
      if (res) window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteAccount = async () => {
    const userName = localStorage.getItem("User");
    const res = await DeleteAccount(userName);
    if (res) {
      localStorage.removeItem("User");
      window.location.href = "/";
    }
  };
  useEffect(() => {
    getUserProfileData();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="section1ChatBar" id="section1ChatBar">
      <h2 id="UserProfileFullname">Profile</h2>
      <div className="userProfileImage">
      {alldata.profilePhoto ? (
          <img
            src={`data:image/jpeg;base64,${alldata.profilePhoto}`}
            alt=""
          />
        ) : (
          <ScaleLoader color="black" height={10} width={5} />
        )}
      </div>
      <div className="addImageButton">
        {profilePhoto == null ? (
          <input type="file" onChange={handleProfilePhoto} />
        ) : (
          <input type="submit" onClick={uploadProfilePhoto} />
        )}
        {loading ? (
          <ScaleLoader color="black" height={10} width={5} />
        ) : (
          `${profilePhoto == null ? "➕" : "✔️"}`
        )}
      </div>
      <div className="divider"></div>
      <h4 id="userProfileHeading">Your Details</h4>
      <h1 id="UserProfileUsername">{localStorage.getItem("User")}</h1>
      <h2 id="UserProfileFullname">
        {alldata.fullname == null ? (
          <ScaleLoader color="black" height={10} width={5} />
        ) : (
          alldata.fullname
        )}
      </h2>

      <div id="userProfileAboutDiv">
        <h4>About</h4>
        {AboutButton ? (
          <button id="userProfileAboutEdit" onClick={buttonChange}>
            ✏️
          </button>
        ) : (
          <button id="userProfileAboutEdit" onClick={updateDescription}>
            ✔️
          </button>
        )}
      </div>
      {AboutButton ? (
        <p id="UserProfileDescription">
          {alldata.about == null ? (
            <ScaleLoader color="black" height={10} width={5} />
          ) : (
            alldata.about
          )}
        </p>
      ) : (
        <input
          type="text"
          id="UserProfileDescriptionInput"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      )}
      <div className="deleteBtnDiv">
        <button id="deleteBtn" onClick={openDialog}>
          🗑️
        </button>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2 id="UserProfileUsername">Confirm Deletion</h2>
            <p id="UserProfileFullname">
              Are you sure you want to delete your account?
            </p>
            <div className="deleteDiv">
              <button onClick={closeDialog} className="DeleteBtn">
                Cancel
              </button>
              <button className="DeleteBtn" onClick={deleteAccount}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
