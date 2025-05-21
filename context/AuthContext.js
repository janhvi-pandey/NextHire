'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Sign Up Function
  const signUp = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      setToken(data.token);
      console.log('Signup successful!');
    } catch (err) {
      alert(err.message);
    }
  };

  // Sign In Function
  const signIn = async (email, password) => {
    try {
      const res = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signin failed');

      setToken(data.token);
      console.log('Signin successful!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ token, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
