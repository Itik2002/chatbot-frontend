"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState<string>("");
  const [reply, setReply] = useState<string>("");

  const sendMessage = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!message.trim()) return;

    const payload = {
      conversation_id: null, // new session
      message: {
        content: message,
      },
    };

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      const assistantMessage =
        data.messages?.find((m: { role: string }) => m.role === "assistant")
          ?.content ?? "";

      setReply(assistantMessage);
      setMessage("");
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <div className="chat-page">

      {/* Center text when no reply */}
      {reply === "" && (
        <div className="chat-empty">
          <h2>What can I help you with?</h2>
        </div>
      )}

      {/* Messages area */}
      <div className="chat-messages">
        {reply && (
          <div className="message-row bot">
            <p>{reply}</p>
          </div>
        )}
      </div>

      {/* Bottom input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}
