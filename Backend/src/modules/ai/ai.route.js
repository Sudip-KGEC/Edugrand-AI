import { Router } from "express";
import * as controller from "./ai.controller.js";

const router = Router();

router.post("/", controller.chatWithAI);

export default router;