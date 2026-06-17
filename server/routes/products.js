import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (req, res) => {
  const products = db.prepare("SELECT * FROM products ORDER BY id ASC").all();
  res.json({ products });
});

router.get("/:id", (req, res) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ product });
});

export default router;
