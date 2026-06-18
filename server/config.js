import "dotenv/config";

function parseOrigins(raw) {
  if (!raw) return ["https://furniro-iota-ten.vercel.app"];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT) || 3001,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/furino",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  allowedOrigins: parseOrigins(process.env.FRONTEND_URL),
  jwtSecret: process.env.JWT_SECRET || "furniro-dev-secret",
  chargily: {
    apiKey: process.env.CHARGILY_API_KEY || "",
    mode: process.env.CHARGILY_MODE || "test",
  },
};
