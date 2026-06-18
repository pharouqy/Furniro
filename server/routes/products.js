import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
});

export default router;
