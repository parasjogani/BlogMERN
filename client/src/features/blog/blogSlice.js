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
            .addCase(resetState, () => initialState)

    }
})

export default blogSlice.reducer