import React, {} from "react";
import { useSelector } from "react-redux";

import User from "./User";
import "./Users.css";

const UsersList = ({ users }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="userList-container">
      {users.map((person, id) => {
        if (person._id !== user._id)
          return (
            <User person={person} key={id}/>
          );
      })}
    </div>
  );
};

export default UsersList;
