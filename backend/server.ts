import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình CORS để cho phép frontend gọi API
app.use(
  cors({
    origin: ["http://localhost:3000"], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
