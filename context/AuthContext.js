"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  // Sign Up function
  const signUp = async (name, email, password) => {
    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      await fetchUser(data.token);

      return data.message || "Signup successful";
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Sign In function
  const signIn = async (email, password) => {
    try {
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signin failed");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      await fetchUser(data.token);

      return data.message || "Signin successful";
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    }
  };

  // Sign Out function
  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Fetch user function
  const fetchUser = async (authToken) => {
    try {
      const res = await fetch("/api/auth/fetchUser", {
        method: "GET",
        headers: {
          token: authToken,
        },
      });
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      if (!res.ok) throw new Error(data.error || "Failed to fetch user");

      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Fetch user error:", error);
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, signUp, signIn, signOut, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
