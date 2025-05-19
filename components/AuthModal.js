"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function AuthModal() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  // Form states for Sign In
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

  // Form states for Sign Up
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  // Sign In handler
  async function handleSignIn(e) {
    e.preventDefault();
    setSignInError("");
    setSignInLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Sign in failed");

      localStorage.setItem("token", data.token);
      setSignInLoading(false);
      setOpenSignIn(false);

      // Optionally reset form
      setSignInEmail("");
      setSignInPassword("");
    } catch (err) {
      setSignInError(err.message);
      setSignInLoading(false);
    }
  }

  // Sign Up handler
  async function handleSignUp(e) {
    e.preventDefault();
    setSignUpError("");
    setSignUpLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signUpName, email: signUpEmail, password: signUpPassword }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Sign up failed");

      localStorage.setItem("token", data.token);
      setSignUpLoading(false);
      setOpenSignUp(false);

      // Optionally reset form
      setSignUpName("");
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (err) {
      setSignUpError(err.message);
      setSignUpLoading(false);
    }
  }

  return (
    <>
      {/* Trigger Buttons */}
      <div className="mt-10 flex justify-center gap-6">
        <button
          onClick={() => setOpenSignIn(true)}
          className="rounded-md border bg-black border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:text-amber-400"
        >
          Sign In
        </button>

        <button
          onClick={() => setOpenSignUp(true)}
          className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-amber-500 hover:border-b-gray-950 hover:to-yellow-400 transition-transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>

      {/* Sign In Modal */}
      <Dialog.Root open={openSignIn} onOpenChange={setOpenSignIn}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 max-w-md w-full p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 focus:outline-none text-white"
            style={{ background: "linear-gradient(to bottom, #121212, #262626)" }}
          >
            <Dialog.Title className="text-2xl font-bold mb-4">Sign In</Dialog.Title>
            <Dialog.Description className="mb-6 text-gray-300">
              Welcome back! Let’s find your next opportunity
            </Dialog.Description>

            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="px-4 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="px-4 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {signInError && <p className="text-red-500 text-sm">{signInError}</p>}
              <button
                type="submit"
                disabled={signInLoading}
                className="mt-4 bg-amber-400 text-gray-900 py-2 rounded-md font-semibold hover:bg-amber-500 transition disabled:opacity-50"
              >
                {signInLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <Dialog.Close className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-xl font-bold">
              ×
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Sign Up Modal */}
      <Dialog.Root open={openSignUp} onOpenChange={setOpenSignUp}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 max-w-md w-full p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 focus:outline-none text-white"
            style={{ background: "linear-gradient(to bottom, #121212, #262626)" }}
          >
            <Dialog.Title className="text-2xl font-bold mb-4">Sign Up</Dialog.Title>
            <Dialog.Description className="mb-6 text-gray-300">
              Start your journey to a better job
            </Dialog.Description>

            <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="px-4 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="px-4 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="px-4 py-2 bg-black border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {signUpError && <p className="text-red-500 text-sm">{signUpError}</p>}
              <button
                type="submit"
                disabled={signUpLoading}
                className="mt-4 bg-amber-400 text-gray-900 py-2 rounded-md font-semibold hover:bg-amber-500 transition disabled:opacity-50"
              >
                {signUpLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <Dialog.Close className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-xl font-bold">
              ×
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
