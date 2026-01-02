"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatSessionPage() {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login again");
      return;
    }

    const userMessage = input;

    // show user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Message send failed");
      }

      const data = await res.json();
      console.log("BACKEND RESPONSE:", data);

      const reply =
        data.response ||
        data.reply ||
        data.output ||
        data.message ||
        "No response";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0f0f0f",
        color: "white",
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "12px",
              maxWidth: "70%",
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#2563eb" : "#1f2937",
              padding: "10px 14px",
              borderRadius: "8px",
            }}
          >
            {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #333",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            background: "#111",
            color: "white",
            border: "1px solid #333",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "8px",
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
