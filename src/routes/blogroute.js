import { Router } from "express";
import blogController from "../controller/blogcontroller.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const blog = Router();

// create blog | Private endpoint (Level 2)
blog.post(
  "/blog",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level2Role,
  blogController.addBlog
);

// View all blogs | public endpoint (any one)
blog.get("/blogs", blogController.viewBlogs);

// view one blog | public endpoint (any one)
blog.get("/blogs/:id", blogController.viewBlogById);

// Delete one blog | private endpoint (level2)
blog.delete(
  "/blogs/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level2Role,
  blogController.deleteBlogById
);

// Edit one blog | Private endpoint (level2)
blog.put(
  "/blogs/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level2Role,
  blogController.updateBlogById
);

// add Comment on one Blog | Private endpoint (everyone)
blog.put(
  "/comments/:id",
  authMiddleWare.isAuthenticated,
  blogController.addCommentOnBlog
);

export default blog;
