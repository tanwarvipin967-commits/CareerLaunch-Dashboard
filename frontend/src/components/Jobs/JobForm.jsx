import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { Send, ChevronRight, ChevronLeft, Briefcase } from 'lucide-react';

const JobForm = () => {
  const { addJob } = useJobs();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    status: 'Pending',
    link: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(formData);
    setFormData({ title: '', company: '', status: 'Pending', link: '', notes: '' });
    setStep(1);
    alert("Job Added Successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-indigo-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-600 p-2 rounded-xl text-white">
          <Briefcase size={20} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Job</h2>
      </div>

    
      <div className="flex gap-2 mb-8">
        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-100'}`}></div>
        <div className={`h-1.5 flex-1 rounded-full ${step === 2 ? 'bg-indigo-600' : 'bg-gray-100'}`}></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-sm font-semibold text-gray-600 ml-1">Job Title</label>
              <input
                required
                type="text"
                placeholder="e.g. Software Engineer"
                className="w-full p-4 mt-1 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 ml-1">Company</label>
              <input
                required
                type="text"
                placeholder="e.g. Google"
                className="w-full p-4 mt-1 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Next Step <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="text-sm font-semibold text-gray-600 ml-1">Status</label>
              <select
                className="w-full p-4 mt-1 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 ml-1">Job Link (Optional)</label>
              <input
                type="url"
                placeholder="https://linkedin.com/..."
                className="w-full p-4 mt-1 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 p-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                <ChevronLeft size={18} /> Back
              </button>
              <button
                type="submit"
                className="flex-[2] flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Submit <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobForm;