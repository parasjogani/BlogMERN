import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import blogService from "./blogService"

export const addBlogs = createAsyncThunk(
    'blog/add-blogs',
    async (blogData, thunkAPI) => {
        try {
            return await blogService.addBlog(blogData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllBlogs = createAsyncThunk(
    'blog/get-allblogs',
    async (thunkAPI) => {
        try {
            return await blogService.getAllBlog()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllBlogsByAuthor = createAsyncThunk(
    'blog/get-allblogsByAuthor',
    async (authorId, thunkAPI) => {
        try {
            return await blogService.getAllBlogByAuthor(authorId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateBlogs = createAsyncThunk(
    'blog/update-blogs',
    async (updatedBlog, thunkAPI) => {
        try {
            return await blogService.updateBlog(updatedBlog)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const deleteBlogs = createAsyncThunk(
    'blog/delete-blogs',
    async (blogId, thunkAPI) => {
        try {
            return await blogService.deleteBlog(blogId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const resetState = createAction("ResetState")

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.addedBlogs = action.payload
            })
            .addCase(addBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })

            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.allBlogs = action.payload
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })

            .addCase(getAllBlogsByAuthor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBlogsByAuthor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.allBlogsByAuthor = action.payload
            })
            .addCase(getAllBlogsByAuthor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })

            .addCase(updateBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.updatedBlogs = action.payload
            })
            .addCase(updateBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })

            .addCase(deleteBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.deletedBlogs = action.payload
            })
            .addCase(deleteBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)

    }
})

export default blogSlice.reducer