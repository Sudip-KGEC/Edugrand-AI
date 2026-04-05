import { Router } from "express";

import authRoutes from "../../modules/auth/auth.route.js";
import scholarshipRoutes from "../../modules/scholarship/scholarship.route.js";
import chatRoutes from "../../modules/ai/ai.route.js";
import notificationRoutes from "../../modules/notification/notification.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/scholarships", scholarshipRoutes);
router.use("/chat", chatRoutes);
router.use("/notifications", notificationRoutes);

export default router;