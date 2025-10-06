import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // nhớ có .js nếu dùng module type

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Cấu hình CORS cho cả localhost và domain Vercel
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://asm1-nine.vercel.app", // domain frontend deploy trên Vercel
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware parse JSON
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running successfully...");
});

// ✅ Kết nối MongoDB và khởi chạy server
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
