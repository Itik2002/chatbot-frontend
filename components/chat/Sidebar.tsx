// "use client";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2>ChatGPT</h2>
//       </div>

//       <button className="new-chat-btn">+ New chat</button>

      


//       <div className="sidebar-footer">
//         <p>User name</p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useRouter } from "next/navigation";

// export default function Sidebar() {
//   const router = useRouter();

//   const handleNewChat = () => {
//     router.push("/chat?new=true");
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2>ChatGPT</h2>
//       </div>

//       <button className="new-chat-btn" onClick={handleNewChat}>
//         + New chat
//       </button>

//       <div className="sidebar-footer">
//         <p>User name</p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useRouter } from "next/navigation";

// export default function Sidebar() {
//   const router = useRouter();

//   const handleNewChat = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/chat/sessions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error("Session creation failed");
//       }

//       const data = await res.json();

//       console.log("🆕 NEW SESSION CREATED:", data.session_id);

//       // 🔥 THIS IS THE PROOF
//       router.push(`/chat/${data.session_id}`);

//     } catch (err) {
//       console.error("❌ New chat error:", err);
//     }
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2>ChatGPT</h2>
//       </div>

//       <button className="new-chat-btn" onClick={handleNewChat}>
//         + New chat
//       </button>

//       <div className="sidebar-footer">
//         <p>User name</p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleNewChat = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Please login again");
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:8000/chat/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Session creation failed");
      }

      const data = await res.json();

      console.log("🆕 NEW SESSION CREATED:", data.session_id);

      // ✅ go to new session
      router.push(`/chat/${data.session_id}`);
    } catch (err) {
      console.error(err);
      alert("Unable to create new chat");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ChatGPT</h2>
      </div>

      <button className="new-chat-btn" onClick={handleNewChat}>
        + New chat
      </button>

      <div className="sidebar-footer">
        <p>User name</p>
      </div>
    </div>
  );
}
