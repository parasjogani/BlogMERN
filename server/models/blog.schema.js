import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [5, 'Title must be at least 5 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
            trim: true,
        },
        shortDescription: {
            type: String,
            required: [true, 'Short description is required'],
            trim: true,
            maxlength: [250, 'Short description cannot exceed 250 characters'],
        },
        fullBlogDetail: {
            type: String,
            required: [true, 'Full blog detail is required'],
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Blog", blogSchema);