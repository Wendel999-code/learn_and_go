"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookie = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in ms
        httpOnly: true, // prevent XSS
        sameSite: "lax", // CSRF protection
        secure: process.env.NODE_ENV !== "development", // use HTTPS in prod
    });
};
exports.default = generateTokenAndSetCookie;
