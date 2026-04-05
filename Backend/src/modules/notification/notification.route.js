import { Router } from "express";
import * as controller from "./notification.controller.js";
import { protect } from "../../app/middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/", controller.getNotifications);
router.put("/mark-as-read", controller.markAsRead);
router.delete("/clear-all", controller.clearAllNotifications);
router.delete("/:id", controller.deleteNotification);

export default router;