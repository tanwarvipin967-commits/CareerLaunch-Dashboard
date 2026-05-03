import React, { useState, useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [step, setStep] = useState(1);
  const { addJob } = useContext(JobContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'Pending',
    salary: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(formData);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="flex justify-between mb-8">
        <span className={`h-2 w-1/2 rounded-full mr-2 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
        <span className={`h-2 w-1/2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></span>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 1: Job Details</h2>
            <input 
              type="text" placeholder="Job Title" required
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <input 
              type="text" placeholder="Company Name" required
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
            <button type="button" onClick={() => setStep(2)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 2: Additional Info</h2>
            <input 
              type="text" placeholder="Salary Range"
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
            />
            <select 
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Pending">Pending</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
            </select>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="bg-gray-400 text-white px-6 py-2 rounded-lg">Back</button>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Submit Application</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddJob;