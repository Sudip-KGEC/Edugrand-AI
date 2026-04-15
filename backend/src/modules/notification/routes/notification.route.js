import { Router } from "express";
import * as controller from "../controllers/notification.controller.js";
import { protect } from "../../../middlewares/auth.middleware.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const router = Router();

router.use(protect);

router.get("/", controller.getNotifications);

router.put("/mark-as-read", controller.markAsRead);

router.delete("/clear-all", controller.clearAllNotifications);

router.delete("/:id", validateObjectId("id"), controller.deleteNotification);

export default router;