import { Router } from "express";
import { ChargilyClient } from "@chargily/chargily-pay";
import db from "../db.js";
import { config } from "../config.js";

const router = Router();

const chargily = new ChargilyClient({
  api_key: config.chargily.apiKey,
  mode: config.chargily.mode,
});

const serverOrigin = `http://localhost:${config.port}`;

router.post("/create-checkout", async (req, res, next) => {
  try {
    const { orderId, items } = req.body;

    if (!orderId || !items?.length) {
      return res.status(400).json({ error: "Missing orderId or items" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + Math.round(Number(item.price) * Number(item.quantity)),
      0
    );

    if (totalAmount < 1) {
      return res.status(400).json({ error: "Minimum amount is 1 DZD" });
    }

    const checkout = await chargily.createCheckout({
      amount: totalAmount,
      currency: "dzd",
      success_url: `${config.frontendUrl}/checkout/success?order_id=${orderId}`,
      failure_url: `${config.frontendUrl}/checkout/failure?order_id=${orderId}`,
      webhook_endpoint: `${serverOrigin}/api/webhooks/chargily`,
      metadata: { order_id: orderId },
    });

    db.prepare("UPDATE orders SET chargily_checkout_id = ? WHERE id = ?")
      .run(checkout.id, orderId);

    res.json({
      checkoutUrl: checkout.checkout_url,
      checkoutId: checkout.id,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/check-status/:orderId", (req, res) => {
  const order = db.prepare("SELECT id, status FROM orders WHERE id = ?")
    .get(req.params.orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json({ status: order.status });
});

export default router;
