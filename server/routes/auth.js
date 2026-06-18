import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { config } from "../config.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: "admin" });

    const token = jwt.sign(
      { id: user._id.toString(), name, email, role: "admin" },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
