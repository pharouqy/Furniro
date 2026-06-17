import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 3001,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "furniro-dev-secret",
  chargily: {
    apiKey: process.env.CHARGILY_API_KEY || "",
    mode: process.env.CHARGILY_MODE || "test",
  },
};
