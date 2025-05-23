import React, { useState } from "react";
import { supabase } from "./supabase"; // make sure this is correctly set up

export default function LoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setMessage(""); // clear previous messages
    let result;

    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(
        isLogin
          ? "Logged in successfully!"
          : "Signup successful! Please check your email to confirm."
      );
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <button
        onClick={handleAuth}
        style={{
          display: "block",
          width: "100%",
          padding: 10,
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 5,
        }}
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p style={{ marginTop: 15 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>

      {message && (
        <p style={{ marginTop: 10, color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
