import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";




import corsConfig from "./config/cors.js";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.set("trust proxy", 1);
app.use(corsConfig);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)

// Health Check
app.get("/", (req, res) => {
  res.send("Scholarship Portal API is running...");
});

// Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorMiddleware);

export default app;