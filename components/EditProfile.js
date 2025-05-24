"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/UserProfileContext";

export default function EditProfile() {
  const { user, loading } = useAuth();
  const { updateProfile } = useUserProfile();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    yearsOfExperience: "",
    skills: "",
    jobType: "",
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!loading && user && !initialized) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        yearsOfExperience: user.yearsOfExperience?.toString() || "",
        skills: Array.isArray(user.skills)
          ? user.skills.join(", ")
          : typeof user.skills === "string"
          ? user.skills
          : "",
        jobType: user.jobType || "",
      });
      setInitialized(true);
    }
  }, [user, loading, initialized]);

  if (loading || !user) {
    return (
      <p className="text-center text-gray-400 mt-10">Loading profile...</p>
    );
  }

  const handleSubmit = async () => {
    const { name, location, yearsOfExperience, skills, jobType } = formData;

    if (
      !name.trim() ||
      !location.trim() ||
      !yearsOfExperience ||
      !skills.trim() ||
      !jobType
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const locationRegex = /^[a-zA-Z\s]+$/;
    if (!locationRegex.test(location.trim())) {
      toast.error("Location can only contain letters and spaces.");
      return;
    }

    const experienceNum = Number(yearsOfExperience);
    if (isNaN(experienceNum) || experienceNum < 0) {
      toast.error("Years of experience must be a valid non-negative number.");
      return;
    }

    const skillArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skillArray.length === 0) {
      toast.error("Please enter at least one skill.");
      return;
    }

    try {
      const response = await updateProfile(
        name.trim(),
        location.trim(),
        experienceNum,
        skillArray,
        jobType
      );
      

      if (response === "Profile updated successfully") {
        toast.success("Your profile has been updated");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error(response || "Something went wrong while updating profile.");
      }
    } catch (error) {
      // console.error("Update profile error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section
        className="container mx-auto flex flex-col items-center
     justify-center max-w-[90%] md:w-1/2 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c] to-[#1a1a1a] text-white rounded-2xl p-8 md:px-16 shadow-lg space-y-8"
      >
        <div className="w-full space-y-3">
          <FormField
            label="Display Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FormField label="Email" value={formData.email} disabled />
          <FormField
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <FormField
            label="Experience (years)"
            type="number"
            value={formData.yearsOfExperience}
            onChange={(e) =>
              setFormData({ ...formData, yearsOfExperience: e.target.value })
            }
          />
          <FormField
            label="Skills (comma separated)"
            placeholder="React, Python, C, Node.js"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
          <div className="space-y-1">
            <Label className="text-sm font-medium text-white/90">
              Job Type
            </Label>
            <div className="flex gap-4 text-white">
              {["Remote", "Hybrid", "Onsite"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 text-sm ${
                    formData.jobType === type
                      ? "font-semibold text-white"
                      : "text-white/80"
                  }`}
                >
                  <Input
                    className="accent-white"
                    type="radio"
                    name="jobType"
                    value={type}
                    checked={formData.jobType === type}
                    onChange={(e) =>
                      setFormData({ ...formData, jobType: e.target.value })
                    }
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <Button
            className="w-full mt-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:brightness-110 text-black font-bold transition"
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
  placeholder,
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-white/90">
        {label}{" "}
        {disabled && (
          <span className="text-xs text-gray-500">(Cannot be changed)</span>
        )}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder || label}
        className="text-pink border-[#212f3D] focus:ring-white/50"
        min={type === "number" ? 0 : undefined}
      />
    </div>
  );
}
