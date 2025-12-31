// "use client";

// import { useState } from "react";

// export default function ChatPage() {
//   const [message, setMessage] = useState<string>("");
//   const [reply, setReply] = useState<string>("");

//   const sendMessage = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     if (!message.trim()) return;

//     const payload = {
//       conversation_id: null, // new session
//       message: {
//         content: message,
//       },
//     };

//     try {
//       const res = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       const assistantMessage =
//         data.messages?.find((m: { role: string }) => m.role === "assistant")
//           ?.content ?? "";

//       setReply(assistantMessage);
//       setMessage("");
//     } catch (error) {
//       console.error("Chat error:", error);
//     }
//   };

//   return (
//     <div className="chat-page">

//       {/* Center text when no reply */}
//       {reply === "" && (
//         <div className="chat-empty">
//           <h2>What can I help you with?</h2>
//         </div>
//       )}

//       {/* Messages area */}
//       <div className="chat-messages">
//         {reply && (
//           <div className="message-row bot">
//             <p>{reply}</p>
//           </div>
//         )}
//       </div>

//       {/* Bottom input */}
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Ask anything..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") sendMessage();
//           }}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // ✅ Protect chat page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1️⃣ Show user message immediately
    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        credentials: "include", // ✅ IMPORTANT (JWT cookie)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId, // null on first message
          message: {
            content: userMessage.content,
          },
        }),
      });

      const data = await res.json();

      // ✅ Save session_id first time
      if (!conversationId && data.session_id) {
        setConversationId(data.session_id);
      }

      // Backend response handling
      const botText =
        data.response ||
        data.reply ||
        data.answer ||
        "No response";

      const botMessage: ChatMessage = {
        role: "assistant",
        content: botText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <div className="chat-page">
      {/* Empty state */}
      {messages.length === 0 && (
        <div className="chat-empty">
          <h2>What can I help you with?</h2>
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.role === "user" ? "user" : "bot"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
