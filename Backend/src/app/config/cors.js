import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const allowedOrigins = [
  "https://edugrand-ai.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsConfig = cors({
  origin: allowedOrigins,
  credentials: true,
});

export default corsConfig;