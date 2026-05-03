import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar'; // Naya Sidebar import
import Loader from './components/Layout/Loader';
import { JobProvider, useJobs } from './context/JobContext';
import { Menu } from 'lucide-react'; // Hamburger icon ke liye

// Lazy Components
const GlobalSearch = lazy(() => import('./components/Jobs/GlobalSearch'));
const StatsChart = lazy(() => import('./components/Analytics/StatsChart'));
const JobForm = lazy(() => import('./components/Jobs/JobForm'));
const JobCard = lazy(() => import('./components/Jobs/JobCard'));

const Dashboard = () => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Search Debouncing Logic
  useState(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredJobs = jobs.filter(j =>
    j.company?.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
    j.title?.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <StatsChart jobs={jobs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Mobile par Form niche aayega, Laptop par side mein */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <JobForm />
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="relative group mb-8">
            <input
              type="text"
              placeholder="Search your applications..."
              className="w-full p-4 md:p-6 rounded-3xl shadow-sm border-none bg-white text-lg font-medium outline-none focus:ring-4 focus:ring-indigo-100 transition-all pl-14"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
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
              <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                No matching jobs found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-[#F8FAFC] flex overflow-x-hidden">
          
          {/* Mobile Menu Button - Sirf tab dikhega jab sidebar band ho */}
          {!isSidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed top-5 left-5 z-30 p-3 bg-white border border-gray-200 text-indigo-600 rounded-2xl shadow-md"
            >
              <Menu size={24} />
            </button>
          )}

          {/* New Sidebar Component (Isme puraana Navbar ka saara code handle ho chuka hai) */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

          {/* Main Layout Engine */}
          <main className="flex-1 lg:ml-72 min-h-screen transition-all duration-300">
            {/* Padding-top is crucial for mobile because of the floating menu button */}
            <div className="p-4 md:p-10 pt-20 lg:pt-10">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/search" element={<GlobalSearch />} />
                  <Route path="/add-job" element={
                    <div className="max-w-2xl mx-auto">
                      <JobForm />
                    </div>
                  } />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;