import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../img/defaultProfile.png";
import "./Users.css";

const User = ({ person }) => {
  
  return (
    <div className="user">
      <Link to={`/profile/${person._id}`}>
        <img
          src={person.profileImage.url ? person.profileImage.url : defaultProfile}
          alt="profile"
          className="followerImage"
        />{" "}
      </Link>
      <div className="info">
        <span>
          {person.firstname.charAt(0).toUpperCase() +
            person.firstname.slice(1) +
            " " +
            person.lastname}
        </span>
        <span>@{person.username}</span>
      </div>
    </div>
  );
};

export default User;
