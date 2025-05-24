"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function ViewProfile() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <p className="text-center text-gray-400 mt-10">Loading profile...</p>;
  }

  return (
    <div className="bg-black min-h-screen">
 <div className=" mt-18 max-w-2xl mx-auto relative rounded-xl p-5 shadow-md border border-gray-700 hover:shadow-gray-600 transition-shadow flex flex-col justify-between">
      <div className="space-y-6 text-white">
        <p><strong className="mr-2">Name:</strong> {user.name}</p>
        <p><strong className="mr-2">Location:</strong> {user.location || "N/A"}</p>
        <p><strong className="mr-2">Years of Experience:</strong> {user.yearsOfExperience || "N/A"}</p>
        <p><strong className="mr-2">Skills:</strong> {Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "N/A"}</p>
        <p><strong className="mr-2">Job Type:</strong> {user.jobType || "N/A"}</p>
      </div>
    </div>
    </div>
   
  );
}
