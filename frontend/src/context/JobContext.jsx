import React, { createContext, useState, useEffect, useContext } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // Initial state ko seedha localStorage se uthao taaki 'Loading' ka jhamela kam ho
  const [jobs, setJobs] = useState(() => {
    try {
      const savedJobs = localStorage.getItem('careerlaunch_jobs');
      return savedJobs ? JSON.parse(savedJobs) : [];
    } catch (error) {
      console.error("Failed to parse jobs:", error);
      return [];
    }
  });

  const [loading, setLoading] = useState(true);

  // Effect 1: Initial load aur Tab Synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'careerlaunch_jobs') {
        setJobs(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };

    // Jab dusre tab ya window mein data change ho, toh ye current tab update kar dega
    window.addEventListener('storage', handleStorageChange);
    setLoading(false);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Effect 2: Save to LocalStorage whenever jobs state changes
  useEffect(() => {
    // Sirf tab save karo jab jobs empty na ho ya explicitly empty ki gayi ho
    // Taaki galti se initial load par data uda na de
    localStorage.setItem('careerlaunch_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const newJob = { 
      ...job, 
      id: Date.now(), 
      date: new Date().toLocaleDateString(),
      status: job.status || 'Pending' 
    };
    setJobs(prevJobs => [...prevJobs, newJob]); // Functional update is safer
  };

  const updateJob = (id, updatedData) => {
    setJobs(prevJobs => 
      prevJobs.map(job => (job.id === id ? { ...job, ...updatedData } : job))
    );
  };

  const deleteJob = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob, loading }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);