import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import hpp from "hpp";
import { sanitizeMiddleware } from "./middlewares/sanitize.middleware.js";
import corsConfig from "./config/cors.config.js";
import routes from "./routes/index.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(corsConfig);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(sanitizeMiddleware);


app.use(
  hpp({
    whitelist: ["role"],
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/api/v1", routes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorMiddleware);

export default app;