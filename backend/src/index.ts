import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes";
import paymentRoutes from "./routes/payment-routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
