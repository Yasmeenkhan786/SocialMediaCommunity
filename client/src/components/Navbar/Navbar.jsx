import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Home from "../../img/house.png";
import profile from "../../img/user.png";
import Logo from "../../img/feather.png";
import { UilSearch } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";


const Navbar = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <div>
          <Link to="../home " className="nav-logo logo">
            <img src={Logo} alt="logo" />
          </Link>
          <p className="nav">Social Media Community</p>
        </div>

        <div className="navIcons">
          <NavLink to="../home" activeClass="active">
            <img src={Home} alt="" title="home" />
          </NavLink>

          <NavLink to="../user" activeClass="active">
            <UilSearch className="Search" />
          </NavLink>

          <NavLink to={`../profile/${user._id}`} activeClass="active">
            <img src={profile} title="profile" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
