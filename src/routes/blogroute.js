import { Router } from "express";
import blogController from "../controller/blogcontroller.js";

const blog = Router();
blog.post("/blog", blogController.addBlog);
blog.get("/blog", blogController.viewBlogs);

export default blog;
