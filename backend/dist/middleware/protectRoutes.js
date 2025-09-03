"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.status(401).json({ message: "Unauthenticated" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: { role: true, id: true },
        });
        if (!user)
            return res.status(401).json({ message: "Invalid session" });
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized " });
    }
};
exports.protectRoutes = protectRoutes;
