"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controller/payment-controller");
const body = require("express-validator").body;
const paymentRoutes = express_1.default.Router();
const validatedAmount = () => body("amount").isEmpty();
const validatedCourse = () => body("password").isEmpty();
paymentRoutes.post("/", payment_controller_1.paymentWithGcash);
exports.default = paymentRoutes;
