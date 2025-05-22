"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { motion } from "framer-motion";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email validation
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setAlertMessage("Invalid email address!");
      return;
    }
    if (email === "user@example.com" && password === "password123") {
      setAlertMessage("Login successful!");
      setTimeout(() => {
        router.push("/cart"); // Redirect to cart page
      }, 1000);
    } else {
      setAlertMessage("Incorrect email or password!");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setAlertMessage("Invalid email address!");
      return;
    }
    setAlertMessage("Account created successfully!");
    setActiveForm("login");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setAlertMessage("Invalid email address!");
      return;
    }
    setAlertMessage("Password reset link sent to your email!");
    setActiveForm("login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          {activeForm === "login"
            ? "Sign In"
            : activeForm === "signup"
            ? "Create an Account"
            : "Reset Password"}
        </h2>

        {/* Alert Message */}
        {alertMessage && (
          <div className="mb-4 p-2 text-sm text-white bg-red-500 rounded-md text-center">
            {alertMessage}
          </div>
        )}

        {activeForm === "login" && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full">Sign In</Button>
            <p className="text-sm text-blue-600 cursor-pointer text-center" onClick={() => setActiveForm("forgot")}>
              Forgot password?
            </p>
            <p className="text-sm text-gray-600 text-center cursor-pointer" onClick={() => setActiveForm("signup")}>
              Don't have an account? <span className="text-blue-600">Sign Up</span>
            </p>
          </form>
        )}

        {activeForm === "signup" && (
          <form className="space-y-4" onSubmit={handleSignup}>
            <Input type="text" placeholder="Full Name" required />
            <Input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full">Create Account</Button>
            <p className="text-sm text-gray-600 text-center cursor-pointer" onClick={() => setActiveForm("login")}>
              Already have an account? <span className="text-blue-600">Sign In</span>
            </p>
          </form>
        )}

        {activeForm === "forgot" && (
          <form className="space-y-4" onSubmit={handleForgotPassword}>
            <Input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" className="w-full">Send Reset Link</Button>
            <p className="text-sm text-gray-600 text-center cursor-pointer" onClick={() => setActiveForm("login")}>
              Back to <span className="text-blue-600">Sign In</span>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
