import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Users.css";
import UsersList from "./UsersList";
import Navbar from "../../components/Navbar/Navbar";
import { getAllUser } from "../../actions/UserAction";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);
  console.log(users);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const search = (users) => {
   return users.filter(
      (user) =>
         user.firstname.includes(input) || user.firstname.toLowerCase().includes(input) ||
        user.lastname.includes(input) || user.lastname.toLowerCase().includes(input)||
        user.username.includes(input)|| user.username.toLowerCase().includes(input) 
    );
  };
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="users">
          <div className="Searchs">
            <input
              type="search"
              placeholder="#Explore"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <UsersList users={search(users)} />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Users;
