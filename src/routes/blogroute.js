import { Router } from "express";
import blogController from "../controller/blogcontroller.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const blog = Router();
blog.post("/blog", authMiddleWare.isAuthenticated, blogController.addBlog);
blog.get("/blogs", blogController.viewBlogs);
blog.get("/blogs/:id", blogController.viewBlogById);
blog.delete(
  "/blogs/:id",
  authMiddleWare.isAuthenticated,
  blogController.deleteBlogById
);
blog.put(
  "/blogs/:id",
  authMiddleWare.isAuthenticated,
  blogController.updateBlogById
);
blog.put(
  "/comments/:id",
  authMiddleWare.isAuthenticated,
  blogController.addCommentOnBlog
);

export default blog;
