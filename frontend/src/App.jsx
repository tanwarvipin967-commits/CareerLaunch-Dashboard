import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Layout/Navbar';
import Loader from './components/Layout/Loader';


import { JobProvider, useJobs } from './context/JobContext';

import GlobalSearch from './components/Jobs/GlobalSearch';
import StatsChart from './components/Analytics/StatsChart';
import JobForm from './components/Jobs/JobForm';
import JobCard from './components/Jobs/JobCard';


const Dashboard = () => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  
  const filteredJobs = jobs.filter(j =>
    j.company?.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
    j.title?.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Suspense fallback={<Loader />}>
        <StatsChart jobs={jobs} />

        <div className="grid lg:grid-cols-3 gap-12 mt-10">
          <div className="lg:col-span-1">
            <JobForm />
          </div>

          <div className="lg:col-span-2">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search your applications..."
                className="w-full p-6 mb-8 rounded-[2rem] shadow-sm border-none bg-white text-xl font-medium outline-none focus:ring-4 focus:ring-indigo-100 transition-all pl-14"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-6 top-7 text-gray-400 text-xl">🔍</span>
            </div>

            <div className="space-y-6">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onUpdate={(id, status) => updateJob(id, { ...job, status })}
                  onDelete={(id) => {
                    if (window.confirm("Delete this application?")) deleteJob(id);
                  }}
                />
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-10 text-gray-400 font-bold uppercase tracking-widest bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                  No matching jobs found
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-[#FDFEFE]">
          <Navbar />

          <main className="ml-64 p-8 min-h-screen">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/search" element={<GlobalSearch />} />
                <Route path="/add-job" element={
                  <div className="max-w-xl mx-auto py-10">
                    <JobForm />
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;