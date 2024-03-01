import blogSchema from "../model/blogSchema.js";

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
        data: allBlogs,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong " + error,
      });
    }
  }
}
