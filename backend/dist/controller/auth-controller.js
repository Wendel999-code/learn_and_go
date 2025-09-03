"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.logout = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const generateTokenAndSetCookie_1 = __importDefault(require("../utils/generateTokenAndSetCookie"));
const validationResult = require("express-validator").validationResult;
const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { email, password, name } = req.body;
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: { email, password: hashedPassword },
        });
        (0, generateTokenAndSetCookie_1.default)(user.id, res);
        res.status(201).json({ message: "User created", userId: user.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body;
        // Check if user exists
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        // Compare passwords
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        // Generate JWT and set cookie
        (0, generateTokenAndSetCookie_1.default)(user.id, res);
        res.status(200).json({
            success: true,
            message: "Login successful",
            userId: user.id,
            role: user.role,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.login = login;
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};
exports.logout = logout;
const currentUser = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, role: true },
        });
        if (!user)
            return res.status(401).json({ message: "Invalid session" });
        res.status(200).json({
            id: user.id,
            role: user.role,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.currentUser = currentUser;
