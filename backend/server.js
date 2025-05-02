import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import productRoutes from "./routes/api/products.js";
import cors from "cors";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cors());

//Routes
app.use("/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB...`);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
