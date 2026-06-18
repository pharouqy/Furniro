import express from "express";
import cors from "cors";
import { verifySignature } from "@chargily/chargily-pay";
import { config } from "./config.js";
import { connectDB } from "./db.js";
import Order from "./models/Order.js";
import { errorHandler } from "./middleware/errorHandler.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import paymentsRouter from "./routes/payments.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (config.allowedOrigins.some((o) => origin.startsWith(o))) {
      return cb(null, true);
    }
    console.warn("CORS: unknown origin", origin, "- set FRONTEND_URL env to allow it");
    cb(null, true);
  },
  credentials: true,
}));

app.post(
  "/api/webhooks/chargily",
  express.raw({ type: "application/json" }),
  async (req, res) => {
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
        await Order.findOneAndUpdate(
          { chargily_checkout_id: checkoutId },
          { status: "paid" }
        );
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

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Furniro API running on http://localhost:${config.port}`);
  });
});
