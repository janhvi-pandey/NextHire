"use client";

import { useContext, createContext } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  
  const url = "http://localhost:3000";
  const updateProfile = async (
    name,
    location,
    yearsOfExperience,
    skills,
    jobType
  ) => {
    try {
      const token = localStorage.getItem("token");
    //   console.log(token);
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
    //   console.log(data);
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
