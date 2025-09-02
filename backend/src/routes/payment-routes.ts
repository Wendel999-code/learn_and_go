import express from "express";
import { paymentWithGcash } from "../controller/payment-controller";

const body = require("express-validator").body;
const paymentRoutes = express.Router();

const validatedAmount = () => body("amount").isEmpty();
const validatedCourse = () => body("password").isEmpty();

paymentRoutes.post("/", paymentWithGcash);

export default paymentRoutes;
