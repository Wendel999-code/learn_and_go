import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import prisma from "../utils/prisma";

interface JwtPayload {
  userId: string;
  role: "ENROLLEE" | "ADMIN";
}

export const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true, id: true },
    });

    if (!user) return res.status(401).json({ message: "Invalid session" });

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized " });
  }
};
