import api from "@/app/api/axios";

export const sendMessageToAI = async (message, history = []) => {
  try {
    const res = await api.post("/chat", {
      message,
      history,
    });

    const text = res?.data?.data?.text;

    if (!text || !text.trim()) {
      throw new Error("Empty AI response");
    }

    return text;
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "AI service unavailable";

    throw new Error(errorMessage);
  }
};