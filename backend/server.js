import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import productRoutes from "./routes/api/products.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/products", productRoutes);

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB...`);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

export default app;
