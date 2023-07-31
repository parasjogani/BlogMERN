import express from "express";
import { signUp, login, logout } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js"
const router = express.Router()



router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", isLoggedIn, logout)