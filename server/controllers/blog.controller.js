import Blog from "../models/blog.schema.js"
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";


// Add Blog
export const addBlog = asyncHandler(async (req, res) => {
    const { title, imageUrl, shortDescription, fullBlogDetail } = req.body;

    if (!title || !imageUrl || !shortDescription || !fullBlogDetail) {
        throw new CustomError("Please fill all details", 400);
    }

    const newBlog = await Blog.create({
        title,
        imageUrl,
        shortDescription,
        fullBlogDetail,
    });

    res.status(201).json({
        success: true,
        blog: newBlog,
    });
});

// Get All Blogs
export const getAllBlogs = asyncHandler(async (_req, res) => {
    const allBlogs = await Blog.find();

    res.status(200).json({
        success: true,
        blogs: allBlogs,
    });
});

// Update Blog
export const updateBlog = asyncHandler(async (req, res) => {
    const { title, imageUrl, shortDescription, fullBlogDetail } = req.body;
    const blogId = req.params.id;

    if (!title || !imageUrl || !shortDescription || !fullBlogDetail) {
        throw new CustomError("Please fill all details", 400);
    }

    // Check if the blog exists in the database
    const existingBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
            title,
            imageUrl,
            shortDescription,
            fullBlogDetail,
        },
        { new: true }
    );

    if (!existingBlog) {
        throw new CustomError("Blog not found", 404);
    }

    res.status(200).json({
        success: true,
        blog: existingBlog,
    });
});

// Delete Blog
export const deleteBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;

    // Check if the blog exists in the database
    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
        throw new CustomError("Blog not found", 404);
    }

    // Delete the blog
    await existingBlog.remove();

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
});

// Get Specific Blog by ID
export const getBlogById = asyncHandler(async (req, res) => {
    const blogId = req.params.id;

    // Find the blog in the database by its ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new CustomError("Blog not found", 404);
    }

    res.status(200).json({
        success: true,
        blog,
    });
});