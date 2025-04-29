import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../../controllers/productController.js";

const router = express.Router();

router.route("/").post(createNewProduct).get(getAllProducts);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
