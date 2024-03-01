import { Router } from "express";
import blogController from "../controller/blogcontroller.js";

const blog = Router();
blog.post("/blog", blogController.addBlog);
blog.get("/blog", blogController.viewBlogs);
blog.get("/blog/:id", blogController.viewBlogById);

export default blog;
