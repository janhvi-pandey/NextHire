"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function ViewProfile() {
  const { user } = useAuth();

  if (!user) return <p className="text-center text-gray-400 mt-10">Loading profile...</p>;

  return (
    <div className="mt-18 max-w-2xl mx-auto relative bg-black rounded-xl p-5 shadow-md border border-gray-700 hover:shadow-gray-600 transition-shadow flex flex-col justify-between">
      <div className="space-y-6 text-white">
        <p><strong className="mr-2">Name:</strong> {user.name}</p>
        <p><strong className="mr-2">Location:</strong> {user.location || "N/A"}</p>
        <p><strong className="mr-2">Years of Experience:</strong> {user.experience || "N/A"}</p>
        <p><strong className="mr-2">Skills:</strong> {user.skills?.length ? user.skills.join(", ") : "N/A"}</p>
        <p><strong className="mr-2">Preferred Job Type:</strong> {user.preferredJobType || "N/A"}</p>
      </div>
    </div>
  );
}
