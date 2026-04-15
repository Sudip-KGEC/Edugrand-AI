import express from "express";

import authRoutes from "../modules/auth/routes/auth.routes.js";
import scholarshipRoutes from "../modules/scholarship/routes/scholarship.routes.js";
import aiRoutes from "../modules/ai/routes/ai.routes.js";
import notificationRoutes from "../modules/notification/routes/notification.route.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

router.use("/auth", authRoutes);
router.use("/scholarships", scholarshipRoutes);
router.use("/ai", aiRoutes);
router.use("/notifications", notificationRoutes);

export default router;