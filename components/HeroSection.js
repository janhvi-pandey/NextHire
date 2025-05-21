'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("signup"); // 'signup' or 'signin'
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { signUp, signIn } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      await signUp(form.name, form.email, form.password);
      setOpen(false);
    } else {
      const success = await signIn(form.email, form.password);
      if (success) {
        router.push("/dashboard");
      }
    }
  };

  const isSignUp = mode === "signup";

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 ">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-normal p-4 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 text-transparent bg-clip-text">
        Finding the Right Job is Hard?
      </h1>

      <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl">
        Endless listings, zero clarity — but no worries, we’re here to simplify it.
      </p>

      <p className="mt-4 text-lg sm:text-xl font-semibold text-amber-400 max-w-xl">
        Jobify uses AI to match you with the best jobs tailored to your skills and preferences.
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-8 px-6 py-3 text-lg rounded-xl">
            Land your new job now
          </Button>
        </DialogTrigger>

        <DialogContent
          className="fixed top-1/2 left-1/2 w-[90%] max-w-md p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 text-white"
          style={{ background: "linear-gradient(to bottom, #121212, #262626)" }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6">
              {isSignUp ? "Create Your Jobify Account" : "Welcome Back"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="block mb-2 text-gray-300 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-black text-white placeholder-gray-500 focus:ring-amber-400 focus:border-amber-400 rounded-md px-4 py-2 w-full"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="block mb-2 text-gray-300 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-black text-white placeholder-gray-500 focus:ring-amber-400 focus:border-amber-400 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block mb-2 text-gray-300 font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-black text-white placeholder-gray-500 focus:ring-amber-400 focus:border-amber-400 rounded-md px-4 py-2 w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-gray-900 font-semibold rounded-md py-3 shadow-md transition-transform hover:scale-105"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm font-semibold text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setMode(isSignUp ? "signin" : "signup")}
              className="underline text-amber-400 hover:text-yellow-400 transition"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
