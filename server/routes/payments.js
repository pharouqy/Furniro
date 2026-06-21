import { Router } from "express";
import { ChargilyClient } from "@chargily/chargily-pay";
import Order from "../models/Order.js";
import { config } from "../config.js";

const router = Router();

const chargily = new ChargilyClient({
  api_key: config.chargily.apiKey,
  mode: config.chargily.mode,
});

const serverOrigin = `${config.backendUrl}:${config.port}`;

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

    await Order.findByIdAndUpdate(orderId, { chargily_checkout_id: checkout.id });

    res.json({
      checkoutUrl: checkout.checkout_url,
      checkoutId: checkout.id,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/check-status/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, "status");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ status: order.status });
  } catch (err) {
    next(err);
  }
});

export default router;
