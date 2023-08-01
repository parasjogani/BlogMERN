import express from "express";
import { addBlog, getAllBlogs, updateBlog, deleteBlog, getBlogById, getAllBlogsByAuthorId } from "../controllers/blog.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = express.Router()

router.post("/add", isLoggedIn, addBlog);
router.get("/", getAllBlogs);
router.post("/:id", isLoggedIn, updateBlog);
router.delete("/:id", isLoggedIn, deleteBlog);
router.get("/:id", isLoggedIn, getBlogById);
router.get("/author/:authorId", isLoggedIn, getAllBlogsByAuthorId);

export default router