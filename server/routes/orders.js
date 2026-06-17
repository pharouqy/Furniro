import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db.js";
import { verifyToken, adminOnly } from "../middleware/auth.js";

const router = Router();

// Public: create an order
router.post("/", (req, res) => {
  const {
    items, firstName, lastName, email, phone,
    address, city, state, zip, country, message,
  } = req.body;

  if (!items?.length) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const orderId = uuidv4();
  const customerName = `${firstName} ${lastName}`;

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, customer_name, customer_email, customer_phone, address, city, state, zip, country, total_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `);

  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, title, price, quantity, size, color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction(() => {
    insertOrder.run(
      orderId, customerName, email, phone,
      address, city, state, zip, country,
      totalAmount
    );

    for (const item of items) {
      insertItem.run(
        orderId,
        String(item.productId || item.id),
        item.title,
        Number(item.price),
        Number(item.quantity),
        item.size || "",
        item.color || ""
      );
    }
  });

  transaction();

  res.status(201).json({ orderId, totalAmount, message: "Order created successfully" });
});

// Public: get a single order
router.get("/:id", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id);
  res.json({ order, items });
});

// --- Admin routes ---

// Admin: list all orders
router.get("/", verifyToken, adminOnly, (req, res) => {
  const { status: filterStatus, page = 1, limit = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let where = "";
  const params = [];
  if (filterStatus) {
    where = "WHERE status = ?";
    params.push(filterStatus);
  }

  const total = db.prepare(`SELECT COUNT(*) as count FROM orders ${where}`).get(...params).count;
  const orders = db.prepare(
    `SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`
  ).all(...params, Number(limit), offset);

  res.json({ orders, total, page: Number(page), limit: Number(limit) });
});

// Admin: update order status
router.patch("/:id/status", verifyToken, adminOnly, (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
  }

  const order = db.prepare("SELECT id FROM orders WHERE id = ?").get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  db.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .run(status, req.params.id);

  res.json({ message: `Order status updated to ${status}` });
});

// Admin: delete an order
router.delete("/:id", verifyToken, adminOnly, (req, res) => {
  const order = db.prepare("SELECT id FROM orders WHERE id = ?").get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const transaction = db.transaction(() => {
    db.prepare("DELETE FROM order_items WHERE order_id = ?").run(req.params.id);
    db.prepare("DELETE FROM orders WHERE id = ?").run(req.params.id);
  });

  transaction();
  res.json({ message: "Order deleted" });
});

export default router;
