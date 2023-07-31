import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name must required"],
            maxLength: [50, "Name must be less than 50 character"]
        },
        email: {
            type: String,
            required: [true, "Email must required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password must required"],
            minLength: [8, "password must be at least 8 characters"],
            select: false
        }
    },
    {
        timestamps: true
    }
);

// encrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// more features to schema
userSchema.methods = {
    // compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // generate JWT token
    getJwtToken: function () {
        return JWT.sign(
            {
                _id: this._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    // generate forgot password token
    generateForgotPasswordToken: function () {
        const forgotToken = crypto.randomBytes(22).toString('hex')

        // save to DB
        this.forgotPasswordToken = crypto
            .createHash("sha256")
            .update(forgotToken)
            .digest("hex")

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

        // return to user
        return forgotToken
    }
}

export default mongoose.model("User", userSchema)