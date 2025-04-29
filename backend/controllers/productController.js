import mongoose from "mongoose";
import Product from "../models/Product.js";

export const createNewProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const newProduct = new Product(product);

  // Check if the product already exists
  const existingProduct = await Product.findOne({ name: product.name });
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists" });
  }

  // Check if the price is a valid number
  if (isNaN(product.price) || product.price <= 0) {
    return res.status(400).json({ message: "Invalid price value" });
  }

  try {
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Product not found. Invalid product id." });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Product not found. Invalid product id." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "Product not found. Invalid product id." });
  }

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
