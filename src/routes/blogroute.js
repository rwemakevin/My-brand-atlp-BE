import { Router } from "express";
import blogController from "../controller/blogcontroller.js";

const blog = Router();
blog.post("/blog", blogController.addBlog);
blog.get("/blogs", blogController.viewBlogs);
blog.get("/blogs/:id", blogController.viewBlogById);
blog.delete("/blogs/:id", blogController.deleteBlogById);
blog.put("/blogs/:id", blogController.updateBlogById);
blog.put("/comments/:id", blogController.addCommentOnBlog);

export default blog;
