'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (skills = 'N/A') => {
    try {
      const res = await fetch(`/api/jobs?skills=${skills}`);
      const data = await res.json();
      console.log(data);
      setJobs(data.jobs);
      setHeadline(data.headline);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(); 
  }, []);

  return (
    <JobContext.Provider value={{ jobs, headline, loading, fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
