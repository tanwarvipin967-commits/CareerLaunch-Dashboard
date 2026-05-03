import React, { useState, useEffect, useRef } from 'react';
import { useJobs } from '../../context/JobContext';
import { Search, MapPin, Building2, ExternalLink, Plus, Rocket, X } from 'lucide-react';

const GlobalSearch = () => {
  const { addJob } = useJobs();
  const [query, setQuery] = useState('');
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Ref for AbortController to cancel previous requests
  const abortControllerRef = useRef(null);

const fetchJobs = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setAvailableJobs([]);
      return;
    }

    // 1. Sabse pehle purana data clear karo taaki purani jobs na dikhen
    setAvailableJobs([]); 
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      // 2. API endpoint ko thoda clean rakhte hain
      const response = await fetch(
        `https://www.arbeitnow.com/api/job-board-api?search=${encodeURIComponent(searchQuery)}`,
        { signal: abortControllerRef.current.signal }
      );
      const data = await response.json();

      // 3. Check karo agar data hai tabhi set karo
      if (data && data.data) {
        setAvailableJobs(data.data.slice(0, 10));
      } else {
        setAvailableJobs([]);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Cancelled');
      } else {
        console.error("Error:", error);
        setAvailableJobs([]); // Error aane par bhi screen clear rakho
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatic search with faster debounce (500ms)
    const timer = setTimeout(() => {
      if (query.length > 2) { // 3 char ke baad hi search shuru karega performance ke liye
        fetchJobs(query);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [query]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    fetchJobs(query);
  };

  const handleAddToMyJobs = (job) => {
    const newJob = {
      title: job.title,
      company: job.company_name,
      status: 'Pending',
      link: job.url,
      date: new Date().toLocaleDateString()
    };
    addJob(newJob);
    alert(`${job.title} added!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Explore Opportunities</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base px-4">Search for your dream role instantly.</p>
      </div>

      {/* Search Bar with Form Support */}
      <form 
        onSubmit={handleManualSearch}
        className="bg-white p-2 md:p-3 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-indigo-50 mb-10 flex gap-2 items-center max-w-2xl mx-auto"
      >
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
          <input 
            type="text" 
            placeholder="Search roles..."
            className="w-full p-3 pl-14 bg-transparent border-none rounded-2xl outline-none text-base md:text-lg font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              type="button"
              onClick={() => {setQuery(''); setAvailableJobs([]);}}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button 
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-[1.5rem] font-bold text-sm md:text-base hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          Go
        </button>
      </form>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Hunting jobs...</p>
          </div>
        ) : query.trim() === '' ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <Rocket className="text-indigo-400 mx-auto mb-4 opacity-50" size={40} />
            <h2 className="text-xl font-bold text-gray-700">Ready to launch?</h2>
            <p className="text-gray-400 text-sm max-w-[200px] mx-auto">Start typing to discover jobs.</p>
          </div>
        ) : availableJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {availableJobs.map((job, index) => (
              <div key={index} className="bg-white p-5 md:p-6 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                    <Building2 size={20} />
                  </div>
                  <button 
                    onClick={() => handleAddToMyJobs(job)}
                    className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md hover:scale-110 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{job.title}</h3>
                <p className="text-indigo-500 font-bold text-sm mb-4">{job.company_name}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <MapPin size={14} /> {job.location || 'Remote'}
                  </span>
                  <a 
                    href={job.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold"
                  >
                    Apply <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;