// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   const handleLogin = async () => {
//     const res = await fetch("http://localhost:8000/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     // 🔐 JWT store
//     localStorage.setItem("token", data.access_token);

//     // ➡️ redirect to chat
//     router.push("/chat");
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import AuthTabs from "../../components/auth/AuthTabs";
// import Input from "../../components/auth/Input";
// import GoogleButton from "../../components/auth/GoogleButton";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const data = await res.json();

//       // ✅ SAVE TOKEN (CRITICAL)
//       localStorage.setItem("token", data.access_token);

//       // ✅ REDIRECT AFTER TOKEN SAVE
//       router.replace("/chat");
//     } catch (err) {
//       alert("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <AuthTabs />

//       <h2>Already have an account?</h2>

//       <GoogleButton />

//       <div className="divider">OR</div>

//       <Input
//         label="Email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <Input
//         label="Password"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <Link href="/forgot-password" className="forgot">
//         Forgot Password?
//       </Link>

//       <button
//         className="primary-btn"
//         onClick={handleLogin}
//         disabled={loading}
//       >
//         {loading ? "Logging in..." : "LOGIN"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthTabs from "../../components/auth/AuthTabs";
import Input from "../../components/auth/Input";
import GoogleButton from "../../components/auth/GoogleButton";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // ✅ 🔥 MOST IMPORTANT LINE
      localStorage.setItem("access_token", data.access_token);

      // ✅ redirect after token save
      router.replace("/chat");
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <AuthTabs />

      <h2>Already have an account?</h2>

      <GoogleButton />

      <div className="divider">OR</div>

      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link href="/forgot-password" className="forgot">
        Forgot Password?
      </Link>

      <button
        className="primary-btn"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "LOGIN"}
      </button>
    </div>
  );
}
