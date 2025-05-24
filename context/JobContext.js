'use client';

import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const getJobsOnScore = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); 

      const res = await fetch('/api/jobs/getjobs', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // if (!res.ok) {
      //   console.error('Server error:', data.message || data.error);
      //   return;
      // }

      // console.log('Fetched scored jobs:', data.jobs);
      setJobs(data.jobs);
      setHeadline('Recommended Jobs For You ');
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, headline, loading, getJobsOnScore }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
