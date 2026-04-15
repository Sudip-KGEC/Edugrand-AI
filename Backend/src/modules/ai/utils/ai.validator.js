export const chatSchema = (body) => {
  const { message, history } = body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return { error: "Message is required" };
  }

  if (message.trim().length > 1000) {
    return { error: "Message too long" };
  }

  if (history !== undefined) {
    if (!Array.isArray(history)) {
      return { error: "History must be array" };
    }

    if (history.length > 50) {
      return { error: "History too long" };
    }

    for (const item of history) {
      if (
        !item ||
        typeof item !== "object" ||
        typeof item.role !== "string" ||
        typeof item.text !== "string"
      ) {
        return { error: "Invalid history format" };
      }
    }
  }

  return null;
};