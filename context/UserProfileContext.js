"use client";

import { useContext, createContext } from "react";
import { useAuth } from "@/context/AuthContext";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { token, fetchUser } = useAuth();
  const url = "http://localhost:3000";

  const updateProfile = async (
    name,
    location,
    yearsOfExperience,
    skills,
    jobType
  ) => {
    try {
      const response = await fetch(`${url}/api/userprofile/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          name,
          location,
          yearsOfExperience,
          skills,
          jobType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchUser(token); 
      }

      return data.message;
    } catch (error) {
      console.error("Error updating profile:", error);
      return error.message;
    }
  };

  return (
    <UserProfileContext.Provider value={{ updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
