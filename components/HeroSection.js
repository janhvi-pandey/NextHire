"use client";

import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    // Section container with centered layout
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
      
      {/* Heading: Responsive text size for different screen sizes */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 text-transparent bg-clip-text">
        Finding the Right Job is Hard?
      </h1>

      {/* Subtext: Highlights the problem briefly */}
      <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl">
        Endless listings, zero clarity — but no worries, we’re here to simplify it.
      </p>

      {/* Highlighting AI-powered feature */}
      <p className="mt-4 text-lg sm:text-xl font-semibold text-amber-400 max-w-xl">
        Jobify uses AI to match you with the best jobs tailored to your skills and preferences.
      </p>

      {/* Call-to-action buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
        <Link
          href="/signup"
          className="rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-sm font-semibold shadow-md hover:from-amber-500 hover:to-yellow-400 transition-transform transform hover:scale-105 border border-transparent hover:border-black"
        >
          Sign Up
        </Link>

        <Link
          href="/signin"
          className="rounded-md border px-6 py-3 text-sm font-semibold transition-all transform hover:scale-105 border-gray-800 hover:text-amber-600 hover:border-amber-600 dark:border-gray-200 dark:hover:text-amber-400 dark:hover:border-amber-400"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
