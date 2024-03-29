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

      if (!deletedBlog) {
        throw new Error("id not found");
      }

      return res.status(200).json({
        status: "Sucess",
        message: "blog deleted",
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
        data: await blogSchema.findById(updatedBlog._id),
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
        message: "blog not found!!",
      });
    }
  }

  static async addCommentOnBlog(req, res) {
    //get blog id perfect

    const { content, name, email } = req.body;
    const id = req.params.id;

    const comment = {
      name,
      email,
      content,
      timestamp: Date.now(),
    };

    try {
      //perfect
      const blog = await blogSchema.findById(id);

      if (!blog) {
        return res.status(404).json({
          status: "not found",
          message: "blog not found",
        });
      }

      const addComment = await blogSchema.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $push: { comments: comment },
        }
      );

      if (!addComment) {
        return res.status(404).json({
          status: "can't comment",
          message: "can't comment",
        });
      }

      res.status(200).json({
        status: "Ok",
        data: await blogSchema.findById(id),
      });
    } catch (e) {
      return res.status(404).json({
        status: "not found",
        message: "Operation Failed",
      });
    }
  }

  static async addLikeOnBlog(req, res) {
    //get blog id perfect

    const { name, email, userId } = req.body;
    const id = req.params.id;

    const likeData = {
      userId,
      name,
      email,
      timestamp: Date.now(),
    };

    try {
      //check if we have blog with provided Id
      const blog = await blogSchema.findById(id);

      if (!blog) {
        return res.status(404).json({
          status: "not found",
          message: "blog not found",
        });
      }

      const likeArray = await blogSchema.findById(id).select("likes");
      const likeArray2 = likeArray.likes;
      console.log(likeArray2);

      likeArray2.forEach((item, index) => {
        if (item.email == email) {
          return res.status(400).json({
            status: "Fail",
            message: "Blog can only be liked one time",
          });
        }
      });

      const addLike = await blogSchema.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $push: { likes: likeData },
        }
      );

      if (!addLike) {
        return res.status(500).json({
          status: "Something went wrong",
          message: "can't like",
        });
      }

      res.status(200).json({
        status: "Ok",
        data: await blogSchema.findById(id).select("likes"),
      });
    } catch (e) {
      console.error(e);
      // return res.status(404).json({
      //   status: "not found",
      //   message: "Operation Failed",
      // });
    }
  }

  static async getCountofAllBlogs(req, res) {
    try {
      const count = await blogSchema.countDocuments();
      return res.status(200).json({
        status: "Ok",
        data: count,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
