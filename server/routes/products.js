import { Router } from "express";
import Product from "../models/Product.js";
import { verifyToken, adminOnly } from "../middleware/auth.js";

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

router.post("/", verifyToken, adminOnly, async (req, res, next) => {
  try {
    const { title, description, price, discount, image, category } = req.body;
    if (!title || price === undefined) {
      return res.status(400).json({ error: "Title and price are required" });
    }
    const product = await Product.create({ title, description, price, discount, image, category });
    res.status(201).json({ product, message: "Product created successfully" });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", verifyToken, adminOnly, async (req, res, next) => {
  try {
    const { title, description, price, discount, image, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, discount, image, category },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ product, message: "Product updated successfully" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyToken, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
