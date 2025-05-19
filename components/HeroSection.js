"use client";

import React from "react";
// Remove Link import since you won’t need it for buttons here
import AuthModals from "@/components/AuthModal";  

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 text-transparent bg-clip-text">
        Finding the Right Job is Hard?
      </h1>

      <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl">
        Endless listings, zero clarity — but no worries, we’re here to simplify it.
      </p>

      <p className="mt-4 text-lg sm:text-xl font-semibold text-amber-400 max-w-xl">
        Jobify uses AI to match you with the best jobs tailored to your skills and preferences.
      </p>

      {/* Replace Links with modal triggers */}
      <AuthModals />
      
    </section>
  );
};

export default HeroSection;
