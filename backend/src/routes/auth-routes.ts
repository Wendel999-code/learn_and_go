import express from "express";
import { signup, login, currentUser,logout } from "../controller/auth-controller";
import { protectRoutes } from "../middleware/protectRoutes";

const body = require("express-validator").body;
const authRoutes = express.Router();

const validatedEmail = () => body("email").isEmail();
const validatedPassword = () => body("password").isLength({ min: 6 });

authRoutes.post("/signup", validatedEmail(), validatedPassword(), signup);
authRoutes.post("/login", validatedEmail(), validatedPassword(), login);

authRoutes.post("/logout", protectRoutes, logout);

authRoutes.get("/me", protectRoutes, currentUser);

export default authRoutes;
