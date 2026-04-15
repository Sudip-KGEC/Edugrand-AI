import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const allowedOrigins = [
  "http://localhost:5173",
  "https://edugrand-ai.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsConfig = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed for this origin"), false);
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"],

  exposedHeaders: ["Authorization"],

  optionsSuccessStatus: 200,
});

export default corsConfig;