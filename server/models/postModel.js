import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, require: true },
    userPosted: { type: String, require: true },
    desc: { type: String, require: true },
    likes: [],
    image: {
      public_id: String,
      url: String,
    },
    video: {
      public_id: String,
      url: String,
    },
    userProfilePicture: { public_id: String, 
      url: String},
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
