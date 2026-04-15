import { GoogleGenAI } from "@google/genai";
import * as repo from "../repositories/ai.repository.js";
import { ApiError } from "../../../utils/apiError.js";
import { buildSystemPrompt } from "../utils/ai.prompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const formatHistory = (history = []) => {
  return history
    .filter((m) => m?.content)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
};

const extractText = (response) => {
  try {
    return (
      response?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("") || ""
    );
  } catch {
    return "";
  }
};

export const chat = async ({ message, history = [] }, userId) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new ApiError(503, "AI service not configured");
  }

  const cleanMessage = message?.trim();
  if (!cleanMessage) {
    throw new ApiError(400, "Message is required");
  }

  const start = Date.now();

  const [scholarships, userProfile] = await Promise.all([
    repo.getScholarshipsContext(),
    repo.getUserProfile(userId),
  ]);

  const systemInstruction = buildSystemPrompt(scholarships, userProfile);
  const formattedHistory = formatHistory(history);

  let response;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: systemInstruction }],
        },
        ...formattedHistory,
        {
          role: "user",
          parts: [{ text: cleanMessage }],
        },
      ],
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (err) {
    if (err.name === "AbortError") {
      throw new ApiError(504, "AI timeout");
    }
    console.error("AI ERROR:", err);
    throw new ApiError(502, `AI error: ${err.message}`);
  }

  const text = extractText(response);

  if (!text) {
    throw new ApiError(502, "Empty AI response");
  }

  return {
    text,
    meta: {
      responseTime: `${Date.now() - start}ms`,
      model: "gemini-2.5-flash",
    },
  };
};