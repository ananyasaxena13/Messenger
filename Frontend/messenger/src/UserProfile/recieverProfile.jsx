import profilePhoto from "../assests/profile_logo.jpg";

export const RecieverProfile = ({allRecieverData, setSeeChat, setSeeProfile, setSeeGroup, setShowRecieverProfile}) => {
  return (
    <div className="Rsection1ChatBar" id="Rsection1ChatBar">
      <div className="recieverProfileInner">
        <h2 id="RecieverProfileHeading">Profile</h2>
        <div onClick={()=>{
            setSeeChat(true);
            setSeeProfile(false);
            setSeeGroup(false);
            setShowRecieverProfile(false);
        }}>❌</div>
      </div>
      <div className="userProfileImage">
        <img src={`data:image/jpeg;base64,${allRecieverData.profilePhoto}`} alt="" />
      </div>
      <div className="RecieverProfiledivider"></div>
      <h4 id="userProfileHeading">Details</h4>
      <h1 id="UserProfileUsername">{allRecieverData.username}</h1>
      <h2 id="UserProfileFullname">
      {allRecieverData.fullname}
      </h2>

      <div id="userProfileAboutDiv">
        <h4>About</h4>
      </div>
      <p id="UserProfileDescription">
      {allRecieverData.about}
      </p>
    </div>
  );
};
