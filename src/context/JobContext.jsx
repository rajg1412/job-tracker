import React, { createContext, useState, useEffect, useContext } from 'react';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => job.id === id ? { ...updatedJob, id } : job));
  };

  const deleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === parseInt(id));
  };

  const getStats = () => {
    return {
      total: jobs.length,
      applied: jobs.filter(j => j.status === 'Applied').length,
      interview: jobs.filter(j => j.status === 'Interview').length,
      offer: jobs.filter(j => j.status === 'Offer').length,
      rejected: jobs.filter(j => j.status === 'Rejected').length
    };
  };

  return (
    <JobContext.Provider value={{
      jobs,
      addJob,
      updateJob,
      deleteJob,
      getJobById,
      getStats
    }}>
      {children}
    </JobContext.Provider>
  );
};