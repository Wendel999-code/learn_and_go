import { Response } from "express";
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId: string, res: Response): void => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in ms
    httpOnly: true, // prevent XSS
    sameSite: "lax", // CSRF protection
    secure: process.env.NODE_ENV !== "development", // use HTTPS in prod
  });
};

export default generateTokenAndSetCookie;
