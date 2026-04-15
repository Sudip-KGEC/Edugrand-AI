import * as service from "../services/ai.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../utils/ai.response.js";

export const chatWithAI = asyncHandler(async (req, res) => {
  const data = await service.chat(req.body, req.user._id);

  sendSuccess(res, {
    data,
    message: "AI response generated",
  });
});