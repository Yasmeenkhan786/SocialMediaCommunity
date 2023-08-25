import React, { useEffect } from "react";
import { getPost} from "../../actions/PostsAction";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import ProfilePost from "../Post/ProfilePost";
import { getAllUser } from "../../actions/UserAction";



const CurrentPost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost());
    dispatch(getAllUser()) 
  });

   let posts = useSelector((state) => state.postsReducer)
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
      <div className="Posts">
      {posts.length ===0
      ? <h1 className="heading" >No Post</h1>
      : posts.map((post, id) => {
            return <ProfilePost data={post} key={id} />;
          })}
    </div>
  
  );
};

export default CurrentPost;
