import React from "react";
import PostSide from "../components/PostSide/PostSide";
import "./Home.css";
import'../App.css'
import Navbar from "../components/Navbar/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="home">
      <PostSide />
      </div>
    </div>
  );
};

export default Home;
