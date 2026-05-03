import React from 'react';

const JobCard = ({ job, onUpdate, onDelete }) => {
  return (
    <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-all">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
        <p className="text-gray-500 font-medium">{job.company}</p>
        <span className="text-xs text-gray-400">{job.date}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <select 
          value={job.status} 
          onChange={(e) => onUpdate(job.id, e.target.value)}
          className="bg-gray-50 border-none rounded-xl p-2 text-sm font-semibold outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
        
        <button 
          onClick={() => onDelete(job.id)}
          className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default JobCard;