import { useState, useEffect, useRef, useCallback, memo } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useChatbot from "../hooks/useChatbot";
import "./chatbot.scss";

const MessageBubble = memo(({ msg }) => {
  const isUser = msg.role === "user";

  return (
    <div className={`chat__row ${isUser ? "user" : "bot"}`}>
      {!isUser && (
        <div className="chat__avatar bot">
          <Bot size={14} />
        </div>
      )}

      <div className={`chat__bubble ${isUser ? "user" : "bot"}`}>
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      </div>

      {isUser && (
        <div className="chat__avatar user">
          <User size={14} />
        </div>
      )}
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, loading, error, sendMessage } = useChatbot();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = useCallback(() => {
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  }, [input, loading, sendMessage]);

  return (
    <div className="chat">
      {isOpen && (
        <div className="chat__panel">
          <div className="chat__header">
            <div className="chat__title">
              <Bot size={18} />
              <span>Edugrant AI</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat__messages">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {loading && (
              <div className="chat__typing">
                <Bot size={14} />
                <span>Typing...</span>
              </div>
            )}

            {error && <p className="chat__error">{error}</p>}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat__input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className={loading || !input.trim() ? "disabled" : ""}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((p) => !p)}
        className="chat__toggle"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}