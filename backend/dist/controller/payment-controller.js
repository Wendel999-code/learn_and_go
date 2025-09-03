"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentWithGcash = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const paymentWithGcash = async (req, res) => {
    const { amount, description } = req.body;
    const reference_id = (0, uuid_1.v4)(); // unique per payment
    const payload = {
        "external_id": reference_id,
        "amount": amount,
        "description": description,
        "invoice_duration": 43200,
        "customer": {
            "given_names": "John",
            "surname": "Doe",
            "email": "johndoe@example.com",
            "mobile_number": "+6287774441111"
        },
        "success_redirect_url": "https://lhtv5r5m-5173.asse.devtunnels.ms/orders/success",
        "currency": "PHP",
        "items": [
            {
                "name": "PDC Course",
                "quantity": 1,
                "price": amount,
                "category": "Electronic",
                "url": "https://yourcompany.com/example_item"
            }
        ],
        "metadata": {
            "store_branch": "Jakarta"
        }
    };
    try {
        const response = await axios_1.default.post("https://api.xendit.co/v2/invoices", payload, {
            auth: {
                username: process.env.XENDIT_SECRET_KEY || "",
                password: "",
            },
            headers: {
                "Content-Type": "application/json",
                "X-Version": "2023-05-01", // required for v3
                "X-IDEMPOTENCY-KEY": reference_id, // prevent duplicates
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error("GCash payment error:", error.response?.data || error.message, error.response?.data?.errors || null);
        res.status(500).json({
            message: "Failed to create payment",
            error: error.response?.data || error.message,
            details: error.response?.data?.errors || null,
        });
    }
};
exports.paymentWithGcash = paymentWithGcash;
