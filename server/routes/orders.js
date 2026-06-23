import { Router } from "express";
import Order from "../models/Order.js";
import { verifyToken, adminOnly } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const {
      items, firstName, lastName, email, phone,
      address, city, state, zip, country, message,
      payment_method,
    } = req.body;

    if (!items?.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    const customerName = `${firstName} ${lastName}`;

    const orderItems = items.map((item) => ({
      product_id: String(item.productId || item.id),
      title: item.title,
      price: Number(item.price),
      quantity: Number(item.quantity),
      size: item.size || "",
      color: item.color || "",
    }));

    const order = await Order.create({
      customer_name: customerName,
      customer_email: email,
      customer_phone: phone,
      address,
      city,
      state,
      zip,
      country,
      total_amount: totalAmount,
      status: "pending",
      payment_method: payment_method || "",
      items: orderItems,
    });

    res.status(201).json({
      orderId: order._id.toString(),
      totalAmount,
      message: "Order created successfully",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ order, items: order.items });
  } catch (err) {
    next(err);
  }
});

router.get("/", verifyToken, adminOnly, async (req, res, next) => {
  try {
    const { status: filterStatus, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = {};
    if (filterStatus) {
      filter.status = filterStatus;
    }

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ orders, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/status", verifyToken, adminOnly, async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: `Order status updated to ${status}` });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyToken, adminOnly, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
