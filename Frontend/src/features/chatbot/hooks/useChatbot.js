import { useState, useCallback } from "react";
import { sendMessageToAI } from "../services/chatbot.api";

const INITIAL_MESSAGE = {
  id: "0",
  role: "model",
  text: "Hi! I am your Edugrant Assistant 👋",
};

export default function useChatbot() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = useCallback(
    async (input) => {
      if (!input.trim()) return;

      const userMsg = {
        id: Date.now().toString(),
        role: "user",
        text: input,
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);

      setLoading(true);
      setError("");

      try {
        const reply = await sendMessageToAI(input, updatedMessages);

        const botMsg = {
          id: Date.now().toString() + "-bot",
          role: "model",
          text: reply,
        };

        setMessages((prev) => [...prev, botMsg].slice(-30));
      } catch (err) {
        setError(err.message || "Something went wrong");

        setMessages((prev) => [
          ...prev,
          {
            id: "err-" + Date.now(),
            role: "model",
            text: "Failed to respond. Try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setError("");
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
}