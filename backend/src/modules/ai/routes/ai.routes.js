import { Router } from "express";
import * as controller from "../controllers/ai.controller.js";
import { protect } from "../../../middlewares/auth.middleware.js";
import { chatRateLimiter } from "../middleware/rateLimiter.middleware.js";
import { validateBody } from "../middleware/validateBody.middleware.js";
import { chatSchema } from "../utils/ai.validator.js";

const router = Router();

router.use(protect);

router.post("/", chatRateLimiter, validateBody(chatSchema), controller.chatWithAI);

export default router;