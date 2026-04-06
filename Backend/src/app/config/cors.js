import cors from "cors";

const allowedOrigins = [
  "https://edugrand-ai.vercel.app",
  process.env.FRONTEND_URL,
];

const corsConfig = cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, "");
    const normalizedAllowed = allowedOrigins.map((o) =>
      o?.replace(/\/$/, "")
    );

    if (normalizedAllowed.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});

export default corsConfig;