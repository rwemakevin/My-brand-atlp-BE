import { Router } from "express";
import blogController from "../controller/blogcontroller.js";

const blog = Router();
blog.post("/blog", blogController.addBlog);
blog.get("/blogs", blogController.viewBlogs);
blog.get("/blogs/:id", blogController.viewBlogById);
blog.delete("/blogs/:id", blogController.deleteBlogById);
blog.put("/blog/:id", blogController.updateBlogById);

export default blog;
