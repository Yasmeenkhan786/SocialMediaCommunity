import React, { useState } from "react";
import "./Post.css";
import comment from "../../img/comments.png";
import share from "../../img/shares.png";
import like from "../../img/thumbs-up.png";
import notlike from "../../img/like-otline.png";
import defaultProfile from "../../img/avatar.png";
import { likePost } from "../../api/PostsRequests";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { getPost } from "../../actions/PostsAction";
import { getAllUser } from "../../actions/UserAction";

const Post = ({ data })  => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch=useDispatch()
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const handleLike = () => {
    dispatch(getAllUser())
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    dispatch(getPost())
    
  };

  return (
    <div className="Post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              alt=""
              src={data.userProfilePicture ? data.userProfilePicture.url : defaultProfile}
              className="postProfileImg"
            />

            <span className="postUsername">{data.userPosted}</span>
            <span className="postDate">{format(data.createdAt)}</span>
          </div>
        </div>

        {data.image ? (
          <div className="postCenter">
            <span className="postText">{data.desc}</span>
            <img src={data.image.url} alt="" className="postImg" />
          </div>
        ) : (
          <div className="postCenter">
            <span className="postText">{data.desc}</span>
            <video
              src={data.video.url}
              controls
              preload=""
              noDownloads
              alt=""
              className="postImg"
            ></video>
          </div>
        )}

        <hr className="footerHr" />
        <div className="postBtmFooter">
          <div className="postBtmFooterItem">
            <img src={liked ? like : notlike} className="footerItmIcon" onClick={handleLike} />
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

export default Post;
