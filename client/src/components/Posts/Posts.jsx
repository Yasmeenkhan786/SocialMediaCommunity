import React, { useEffect } from "react";
import { getPost, getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { getAllUser } from "../../actions/UserAction";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  let { posts} = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
    dispatch(getAllUser())
  }, []);

  // console.log(posts)
  if (!posts) return "No Posts";
  // console.log(posts)
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (

    <div className="Posts">
      {posts.length === 0
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
          
    </div>
  

  );
};

export default Posts;
