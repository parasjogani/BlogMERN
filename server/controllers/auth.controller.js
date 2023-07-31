import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";


export const cookieOption = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
    httpOnly: true
}

// User Signup
export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new CustomError("Please fill all details", 400)
    }

    //check user already exist or not
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new CustomError("User already exist", 400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token", token, cookieOption)
    res.status(200).json({
        success: true,
        token,
        user
    })
})

// User Login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError("Please fill all details", 400)
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new CustomError("Invalid credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)
    if (isPasswordMatched) {
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, cookieOption)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Invalid credentials", 400)

})

// User Logout
export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
})