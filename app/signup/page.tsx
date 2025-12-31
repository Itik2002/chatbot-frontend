// "use client";

// import { useState } from "react";
// import { signup } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     await signup(email, password);
//     router.push("/login");
//   };

//   return (
//     <div className="container">
//       <h2>Signup</h2>

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

//       <button onClick={handleSignup}>Create Account</button>
//     </div>
//   );
// }

// import AuthTabs from "../../components/auth/AuthTabs";
// import Input from "../../components/auth/Input";
// import GoogleButton from "../../components/auth/GoogleButton";

// export default function SignupPage() {
//   return (
//     <div className="auth-container">
//       <AuthTabs />

//       <h2>Create Your Account</h2>

//       <GoogleButton />

//       <div className="divider">OR</div>

//       <Input label="Username" placeholder="Username" />
//       <Input label="Email" placeholder="Email" />
//       <Input label="Password" type="password" placeholder="Password" />

//       <label className="checkbox">
//         <input type="checkbox" /> I agree to the Terms and Privacy Policy
//       </label>

//       <button className="primary-btn">REGISTER</button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthTabs from "../../components/auth/AuthTabs";
import Input from "../../components/auth/Input";
import GoogleButton from "../../components/auth/GoogleButton";

export default function SignupPage() {
  const router = useRouter();

  // ✅ STATES (MISSING THE)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    console.log("REGISTER clicked", { username, email, password });

    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password, // ⚠️ backend sirf email + password expect karta hai
      }),
    });

    const data = await res.json();
    console.log("Signup response:", data);

    if (res.ok) {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert(data.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <AuthTabs />

      <h2>Create Your Account</h2>

      <GoogleButton />

      <div className="divider">OR</div>

      {/* USERNAME (UI only for now) */}
      <Input
        label="Username"
        placeholder="Username"
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
      />

      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />

      <label className="checkbox">
        <input type="checkbox" /> I agree to the Terms and Privacy Policy
      </label>

      {/* ✅ BUTTON CONNECTED */}
      <button className="primary-btn" onClick={handleSignup}>
        REGISTER
      </button>
    </div>
  );
}
