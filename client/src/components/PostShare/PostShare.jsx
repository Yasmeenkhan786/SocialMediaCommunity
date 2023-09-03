import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/PostsAction"
import defaultProfile from "../../img/avatar.png";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const desc = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  // handle Image Change
  const onImageChange = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  //handle Video Change
  const onVideoChange = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideo(reader.result);
    };
  };

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image && !video) {
      alert("Please select something to post");
    } else {
      const newPost = {
        userId: user._id,
        userPosted: user.firstname + " " + user.lastname,
        userProfilePicture: user.profileImage,
        desc: desc.current.value,
        image: image,
        video: video,
      };

      dispatch(uploadPost(newPost));
      resetShare();
    }
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      <img src={user.profileImage ? user.profileImage.url : defaultProfile} alt="Profile" />
      <div>
        <input type="text" placeholder="What's happening?" required ref={desc} />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle />
            Video
          </div>
          <div className="option opt" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option opt" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" onClick={handleUpload} disabled={loading}>
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} accept="image/*" onChange={onImageChange} />
          </div>
          <div style={{ display: "none" }}>
            <input type="file" ref={videoRef} accept="video/mp4" onChange={onVideoChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={image} alt="preview" className="preview" />
          </div>
        )}
        {video && (
          <div className="previewImage">
            <UilTimes onClick={() => setVideo(null)} />
            <video src={video} alt="preview" className="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
