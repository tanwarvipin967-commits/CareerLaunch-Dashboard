import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';
import GlobalSearch from '../components/Jobs/GlobalSearch';

const Dashboard = () => {
  const { jobs, loading } = useContext(JobContext);
  const [filteredJobs, setFilteredJobs] = useState(null);

  const displayJobs = filteredJobs || jobs;

  if (loading) return <div className="text-center p-10 text-xl">Loading Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">My Job Applications</h1>
      
      <GlobalSearch setFilteredJobs={setFilteredJobs} />

      <div className="grid gap-4 mt-6">
        {displayJobs.length > 0 ? (
          displayJobs.map(job => (
            <div key={job.id} className="p-4 bg-white shadow rounded-lg border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${job.status === 'Applied' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                {job.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;