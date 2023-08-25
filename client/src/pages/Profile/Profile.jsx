import React from "react";
import "./Profile.css";
import "../../App.css";

import Navbar from "../../components/Navbar/Navbar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

const Profile = () => {
  return (
    <div>
      <Navbar />
        <div className="home">
          <ProfileInfo />
      </div>
    </div>
  );
};

export default Profile;
