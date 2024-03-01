import { Router } from "express";
import blogController from "../controller/blogcontroller.js";

const blog = Router();
blog.post("/blog", blogController.addBlog);
blog.get("/blog", blogController.viewBlogs);
blog.get("/blog/:id", blogController.viewBlogById);
blog.delete("/blog/:id", blogController.deleteBlogById);
blog.put("/blog/:id", blogController.updateBlogById);

export default blog;
