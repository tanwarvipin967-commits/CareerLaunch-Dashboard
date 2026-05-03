import React, { useState, useEffect } from 'react';
import { useJobs } from '../../context/JobContext';
import { Search, MapPin, Building2, ExternalLink, Plus, Rocket } from 'lucide-react';

const GlobalSearch = () => {
  const { addJob } = useJobs();
  // Humne initial query ko empty string ('') kar diya hai
  const [query, setQuery] = useState('');
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Agar query khali hai, toh search na karein aur results clear kar dein
    if (!query.trim()) {
      setAvailableJobs([]);
      return;
    }

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.arbeitnow.com/api/job-board-api?search=${query}`);
        const data = await response.json();
        setAvailableJobs(data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchJobs();
    }, 800); 

    return () => clearTimeout(timer);
  }, [query]);

  const handleAddToMyJobs = (job) => {
    const newJob = {
      title: job.title,
      company: job.company_name,
      status: 'Pending',
      link: job.url,
      date: new Date().toLocaleDateString()
    };
    addJob(newJob);
    alert(`${job.title} added to your tracker!`);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Explore Opportunities</h1>
        <p className="text-gray-500 font-medium">Search for your dream role and add it to your tracker instantly.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-indigo-50 mb-12 flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-4 text-indigo-400" size={22} />
          <input 
            type="text" 
            placeholder="Type a role (e.g. Frontend, Data Scientist)..."
            className="w-full p-4 pl-16 bg-transparent border-none rounded-2xl outline-none text-lg font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conditional Rendering Logic */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Hunting for live jobs...</p>
        </div>
      ) : query.trim() === '' ? (
        /* Empty Search State (Jab user ne kuch nahi likha) */
        <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <div className="bg-white w-20 h-20 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Rocket className="text-indigo-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to launch your career?</h2>
          <p className="text-gray-500 max-w-xs mx-auto">Start typing in the search bar above to discover live job openings from around the world.</p>
        </div>
      ) : availableJobs.length > 0 ? (
        /* Search Results Grid */
        <div className="grid md:grid-cols-2 gap-8">
          {availableJobs.map((job, index) => (
            <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group relative">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Building2 size={28} />
                </div>
                <button 
                  onClick={() => handleAddToMyJobs(job)}
                  className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200 hover:scale-110 active:scale-95 transition-all"
                  title="Add to My Jobs"
                >
                  <Plus size={24} />
                </button>
              </div>
              
              <h3 className="font-extrabold text-2xl text-gray-800 mb-2 leading-tight">{job.title}</h3>
              <p className="text-indigo-500 font-bold text-lg mb-6">{job.company_name}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                <span className="flex items-center gap-2 text-gray-400 font-medium italic">
                  <MapPin size={18} className="text-gray-300" /> {job.location || 'Global/Remote'}
                </span>
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
                >
                  Apply <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Results Found State */
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-medium">No jobs found for "{query}"</p>
          <p className="text-sm mt-2">Try searching for different keywords like 'React', 'Designer' or 'Python'.</p>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;