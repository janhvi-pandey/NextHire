"use client";

import React, { useEffect } from "react";
import { LuBriefcase } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobContext";

export default function JobList() {
  const { user, fetchUser, token } = useAuth();
  const { jobs, headline, loading, getJobsOnScore } = useJobs();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user && token) {
        await fetchUser(token);
      }

      await getJobsOnScore();
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-gray-400">Loading jobs...</p>;

  return (
    <div className=" min-h-screen space-y-6 ">
      <h2 className="text-xl font-bold text-gray-100">
        {headline || "Jobs you might be interested in"}
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-400">No jobs found based on your profile.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(({ _id, title, company, location, skills = [] }) => (
            <div
              key={_id}
              className="relative bg-black rounded-xl p-5 shadow-md border border-gray-700 hover:shadow-gray-600 transition-shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 mb-1 font-medium">{company}</p>
                <p className="text-gray-500 mb-3">{location}</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="border text-gray-300 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <LuBriefcase
                className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 cursor-pointer"
                size={20}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
