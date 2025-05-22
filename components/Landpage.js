"use client";

import React from "react";
import ConstellationBackground from "@/components/reusable/ConstellationBackground";
import HeroSection from "@/components/HeroSection";

export default function LandingPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ConstellationBackground />
      </div>

      {/* Foreground Layer */}
      <div className="relative z-10">
        <HeroSection />
      </div>
    </main>
  );
}
