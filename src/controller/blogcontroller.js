import blogSchema from "../model/blogSchema.js";
import userSchema from "../model/userSchema.js";

export default class blogController {
  static async addBlog(req, res) {
    try {
      const { title, author, content } = req.body;
      const insertBlog = await blogSchema.create({
        title,
        author,
        content,
      });

      return res.status(200).json({
        status: "success",
        message: "blog added successfully",
        data: insertBlog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
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
        status: "fail",
        message: "something went wrong " + error,
      });
    }
  }

  static async viewBlogById(req, res) {
    try {
      const id = req.params.id;
      const blog = await blogSchema.findById(id);
      if (!blog) {
        return res.status(500).json({
          status: "fail",
          message: "Blog not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Fail",
        message: "Something went wrong: " + error,
      });
    }
  }

  static async deleteBlogById(req, res) {
    try {
      const id = req.params.id;
      const deletedBlog = await blogSchema.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(500).json({
          status: "fail",
          message: "Item not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: deletedBlog,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong " + error,
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
        return res.status(500).json({
          status: "fail",
          message: "blog not found",
        });
      }
      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "Something went wrong " + error,
      });
    }
  }
}
