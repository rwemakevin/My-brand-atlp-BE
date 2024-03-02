import blogSchema from "../model/blogSchema.js";
import mongoose from "mongoose";

export default class blogController {
  static async addBlog(req, res) {
    try {
      const { title, author, content } = req.body;
      const insertBlog = await blogSchema.create({
        title,
        author,
        content,
      });

      return res.status(201).json({
        status: "created",
        message: "blog added successfully",
        data: insertBlog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal server Error",
        message: "Something went wrong: " + error,
      });
    }
  }

  static async viewBlogs(req, res) {
    try {
      const allBlogs = await blogSchema.find();
      return res.status(200).json({
        status: "Success",
        totalBlogs: allBlogs.length,
        data: allBlogs,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal Server error",
        message: "something went wrong " + error,
      });
    }
  }

  static async viewBlogById(req, res) {
    try {
      const id = req.params.id;
      const blog = await blogSchema.findById(id);
      if (!blog) {
        throw new Error("id not found");
      }

      return res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return res.status(404).json({
          status: "not found",
          message: "Blog not found",
        });
      }

      return res.status(404).json({
        status: "not found",
        message: "blog not found",
      });
    }
  }

  static async deleteBlogById(req, res) {
    try {
      const id = req.params.id;
      const deletedBlog = await blogSchema.findByIdAndDelete(id);
      console.log(deletedBlog);
      if (!deletedBlog) {
        throw new Error("id not found");
      }

      return res.status(204).json({
        status: "No content",
        data: deletedBlog,
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return res.status(404).json({
          status: "not found",
          message: "Blog not found",
        });
      }
      return res.status(404).json({
        status: "not found",
        message: "blog not found",
      });
    }
  }

  static async updateBlogById(req, res) {
    try {
      const id = req.params.id;
      const { title, author, content } = req.body;
      const updatedBlog = await blogSchema.findByIdAndUpdate(
        { _id: id },
        {
          title,
          author,
          content,
          updatedAt: Date.now(),
        }
      );

      if (!updatedBlog) {
        throw new Error("id not found");
      }

      return res.status(200).json({
        status: "OK",
        data: updatedBlog,
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return res.status(404).json({
          status: "not found",
          message: "Blog not found",
        });
      }

      return res.status(404).json({
        status: "not found",
        message: "blog not found",
      });
    }
  }
}
