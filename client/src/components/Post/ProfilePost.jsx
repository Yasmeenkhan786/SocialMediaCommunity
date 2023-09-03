import React, { useState } from "react";
import "./Post.css";
import comment from "../../img/comments.png";
import share from "../../img/shares.png";
import thumbsUp from "../../img/thumbs-up.png";
import likeOutline from "../../img/like-otline.png";
import defaultProfile from "../../img/avatar.png";
import { likePost } from "../../api/PostsRequests";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { useParams } from "react-router-dom";
import morebtn from "../../img/more.png";

import { deletePost} from "../../actions/PostsAction";

const ProfilePost = ({ data }) => {
  const dispatch = useDispatch();
const {id} = useParams()
  const { user } = useSelector((state) => state.authReducer.authData);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  let name = currentProfile.firstname+" " +currentProfile.lastname
  const [openDelete, setopenDelete] = useState(false);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
console.log(currentProfile)
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    
  };

  const handleDeletePost = () => {
    dispatch(deletePost(data._id, user._id));
    window.location.reload();
    
  };
  return (
    <div className="Post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              alt=""
              src={currentProfile.profileImage.url ? currentProfile.profileImage.url : defaultProfile}
              className="postProfileImg"
            />

            <span className="postUsername">{name}</span>
            <span className="postDate">{format(data.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {data.userId === user._id && (
              <img
                src={morebtn}
                style={{ width: "20px", cursor: "pointer" }}
                alt=""
                onClick={() => setopenDelete((prev) => !prev)}
              />
            )}
          </div>
        </div>
        {openDelete && data.userId === user._id && (
          <div>
            <p className="postDelete" onClick={handleDeletePost}>
              Delete Post
            </p>
          </div>
        )}

        {data.image?
        <div className="postCenter">
          <span className="postText">{data.desc}</span>
          <img src={data.image.url} alt="" className="postImg" />
        </div>:
         <div className="postCenter">
         <span className="postText">{data.desc}</span>
         <video src={data.video.url} controls preload="" noDownloads  alt="" className="postImg" ></video>
       </div>
      
}
        <hr className="footerHr" />
        <div className="postBtmFooter">
          <div className="postBtmFooterItem">
            <img
              src={liked ? thumbsUp : likeOutline}
              className="footerItmIcon"
              onClick={handleLike}
            />
            <span className="footerItmText">Like</span>
          </div>
          <div className="postBtmFooterItem">
            <img src={comment} className="footerItmIcon" />
            <span className="footerItmText">Comment</span>
          </div>
          <div className="postBtmFooterItem">
            <img src={share} className="footerItmIcon" />
            <span className="footerItmText">Share</span>
          </div>
        </div>
        <span
          style={{
            color: "var(--gray)",
            fontSize: "14px",
            marginTop: "1rem ",
            marginLeft: "0.5rem",
            alignItems: "center",
          }}
        >
          {likes} likes
        </span>
      </div>
    </div>
  );
};

export default ProfilePost;
