import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileInfo.css";
import { UilPen } from "@iconscout/react-unicons";
import CurrentPost from "../Posts/CurrenPosts";
import defaultProfile from "../../img/defaultProfile.png";
import ProfileModal from "../ProfileModal/ProfileModal";
import { followUser,unfollowUser } from "../../actions/UserAction";
import { logout } from "../../actions/AuthActions";
import { getPost } from "../../actions/PostsAction";
import ProfilePicture from "../ProfileModal/ProfilePicture";


const ProfileInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const [modal, setModal] = useState(false);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const posts = useSelector((state) => state.postsReducer);
  const Post = posts.filter((post) => post.userId === id);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(currentProfile.followers.includes(user._id));
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(currentProfile._id, user))
      : dispatch(followUser(currentProfile._id, user));
    setFollowing((prev) => !prev);
    dispatch(getPost())
  };
  
  const handleLogOut = () => {
    dispatch(logout());
  };


  return (
    <div className="profile-container">
      <div className="ProfileCards">
        <div className="Profile">
          <img
            src={currentProfile.profileImage.url ? currentProfile.profileImage.url : defaultProfile}
            alt="ProfileImage"
            onClick={()=>setModal(true)}
          />
          <ProfilePicture modal={modal} setModal={setModal} data={currentProfile} />
              <div className="followStatus">
            <hr />
            <div>
              <div className="follow">
                <span>{currentProfile.followers.length}</span>
                <span>Followers</span>
              </div>
              <div className="vline"></div>
              <div className="follow" >
                <span>{currentProfile.following.length}</span>
                <span>Following</span>
              </div>
            
              
              
              <div className="vline"></div>
              <div className="follow">
                <span>{Post.length}</span>
                <span>Posts</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="infor">
          <div className="ProfileName">
            <span>
              {currentProfile.firstname} {currentProfile.lastname}
            </span>
          </div>
          <div className="edit">
            {user._id === id && (
              <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpened(true)} />
            )}
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={currentProfile} />
          </div>
        </div>
        {user._id != id ?
          <button
            className={following ? "button fc-button UnfollowButton" : "button fc-button"}
            onClick={handleFollow}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
          :
          <button className="button logout-button" onClick={handleLogOut}>
          Log Out
        </button>
        }
      </div>
      
      <CurrentPost />
    </div>
  );
};

export default ProfileInfo;
