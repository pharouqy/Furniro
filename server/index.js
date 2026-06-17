import express from "express";
import cors from "cors";
import { verifySignature } from "@chargily/chargily-pay";
import { config } from "./config.js";
import { errorHandler } from "./middleware/errorHandler.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import paymentsRouter from "./routes/payments.js";
import authRouter from "./routes/auth.js";
import db from "./db.js";

const app = express();

app.use(cors({ origin: config.frontendUrl, credentials: true }));

app.post(
  "/api/webhooks/chargily",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.get("signature") || "";
    const payload = req.body;

    if (!signature) {
      return res.sendStatus(400);
    }

    try {
      const isValid = verifySignature(payload, signature, config.chargily.apiKey);
      if (!isValid) {
        console.warn("Chargily webhook: invalid signature");
        return res.sendStatus(400);
      }

      const event = JSON.parse(payload.toString());
      const checkoutId = event?.data?.id;

      if (event.type === "checkout.paid" && checkoutId) {
        db.prepare(
          "UPDATE orders SET status = 'paid', updated_at = datetime('now') WHERE chargily_checkout_id = ?"
        ).run(checkoutId);
        console.log(`Order paid for checkout ${checkoutId}`);
      }

      res.sendStatus(200);
    } catch (err) {
      console.error("Webhook error:", err);
      res.sendStatus(500);
    }
  }
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payments", paymentsRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Furniro API running on http://localhost:${config.port}`);
});
