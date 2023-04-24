import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  categories: {
    type: Array,
  },
  condition: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
});

export const PostModel = mongoose.model("posts", postSchema);
