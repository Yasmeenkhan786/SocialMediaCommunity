import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

// creating a post

export const createPost = async (req, res) => {
  const { desc, userId, userPosted, userProfilePicture, image, video } = req.body;
  try {
    if (image) {
      const mycloud = await cloudinary.v2.uploader.upload(image, { folder: "Posts" });
      const newPost = new PostModel({
        userId,
        userPosted,
        userProfilePicture,
        desc,
        image:{
          public_id: mycloud.public_id,
          url: mycloud.url,
        },
      });
      await newPost.save();
      res.status(200).json(newPost);
    } else {
      const mycloud = await cloudinary.v2.uploader.upload(video, {resource_type: "video",folder: "Posts",
      });
      const newPost = new PostModel({
        userId,
        userPosted,
        userProfilePicture,
        desc,
        video:{
          public_id: mycloud.public_id,
          url: mycloud.url,
        }
      });
      await newPost.save();
      res.status(200).json(newPost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post
export const getPost = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find();
    res.status(200).json(
      currentUserPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  console.log(postId , userId)
  if (postId === userId) {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, req.body, { new: true });
      res.status(200).json({ post });
    } catch (error) {
      console.log("Error agya hy");
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("Authentication failed");
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      
      await post.deleteOne();
      await cloudinary.v2.uploader.destroy(post.image.public_id)
      res.status(200).json("Post Deleted");
      
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json({message : error});
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
 
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
