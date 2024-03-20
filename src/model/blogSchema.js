import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: {
    type: [Object],
  },
  likes: {
    type: [Object],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default new mongoose.model("blogs", blogSchema);
