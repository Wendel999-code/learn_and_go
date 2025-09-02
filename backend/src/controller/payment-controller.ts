import { Request, Response } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const paymentWithGcash = async (req: Request, res: Response) => {
  const { amount, description } = req.body;

  const reference_id = uuidv4(); // unique per payment

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
    const response = await axios.post(
      "https://api.xendit.co/v2/invoices",
      payload,
      {
        auth: {
          username: process.env.XENDIT_SECRET_KEY || "",
          password: "",
        },
        headers: {
          "Content-Type": "application/json",
          "X-Version": "2023-05-01", // required for v3
          "X-IDEMPOTENCY-KEY": reference_id, // prevent duplicates
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error("GCash payment error:", error.response?.data || error.message,   error.response?.data?.errors || null,);
    res.status(500).json({
      message: "Failed to create payment",
      error: error.response?.data || error.message,
        details: error.response?.data?.errors || null,
    });
  }
};
