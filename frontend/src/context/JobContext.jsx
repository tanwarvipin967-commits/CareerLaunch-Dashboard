import React, { createContext, useState, useEffect, useContext } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedJobs = localStorage.getItem('careerlaunch_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('careerlaunch_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const newJob = { ...job, id: Date.now(), date: new Date().toLocaleDateString() };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => (job.id === id ? updatedJob : job)));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob, loading }}>
      {children}
    </JobContext.Provider>
  );
};


export const useJobs = () => useContext(JobContext);