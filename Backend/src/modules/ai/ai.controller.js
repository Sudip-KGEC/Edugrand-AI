import * as service from "./ai.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const chatWithAI = asyncHandler(async (req, res) => {
  const data = await service.chat(req.body);
  res.json({ success: true, data });
});