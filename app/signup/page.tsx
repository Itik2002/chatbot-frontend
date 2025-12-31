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

import AuthTabs from "../../components/auth/AuthTabs";
import Input from "../../components/auth/Input";
import GoogleButton from "../../components/auth/GoogleButton";

export default function SignupPage() {
  return (
    <div className="auth-container">
      <AuthTabs />

      <h2>Create Your Account</h2>

      <GoogleButton />

      <div className="divider">OR</div>

      <Input label="Username" placeholder="Username" />
      <Input label="Email" placeholder="Email" />
      <Input label="Password" type="password" placeholder="Password" />

      <label className="checkbox">
        <input type="checkbox" /> I agree to the Terms and Privacy Policy
      </label>

      <button className="primary-btn">REGISTER</button>
    </div>
  );
}

