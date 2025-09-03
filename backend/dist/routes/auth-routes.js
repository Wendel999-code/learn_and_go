"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth-controller");
const protectRoutes_1 = require("../middleware/protectRoutes");
const body = require("express-validator").body;
const authRoutes = express_1.default.Router();
const validatedEmail = () => body("email").isEmail();
const validatedPassword = () => body("password").isLength({ min: 6 });
authRoutes.post("/signup", validatedEmail(), validatedPassword(), auth_controller_1.signup);
authRoutes.post("/login", validatedEmail(), validatedPassword(), auth_controller_1.login);
authRoutes.post("/logout", protectRoutes_1.protectRoutes, auth_controller_1.logout);
authRoutes.get("/me", protectRoutes_1.protectRoutes, auth_controller_1.currentUser);
exports.default = authRoutes;
