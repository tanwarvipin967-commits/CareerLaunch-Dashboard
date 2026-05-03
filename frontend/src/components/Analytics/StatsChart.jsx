import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StatsChart = ({ jobs = [] }) => {
  const stats = [
    { name: 'Pending', count: jobs.filter(j => j.status === 'Pending').length, color: '#6366f1' },
    { name: 'Applied', count: jobs.filter(j => j.status === 'Applied').length, color: '#f59e0b' },
    { name: 'Interview', count: jobs.filter(j => j.status === 'Interview').length, color: '#10b981' },
    { name: 'Rejected', count: jobs.filter(j => j.status === 'Rejected').length, color: '#ef4444' },
  ];

  return (
    <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 mb-6 md:mb-10 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">Application Analytics</h2>
          <p className="text-sm md:text-gray-500 font-medium mt-1">Real-time tracking of progress</p>
        </div>
        <div className="bg-indigo-50 px-4 md:px-6 py-2 md:py-3 rounded-2xl inline-flex flex-col">
          <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-wider">Total Jobs</span>
          <span className="text-xl md:text-2xl font-black text-indigo-700">{jobs.length}</span>
        </div>
      </div>

      <div className="h-[250px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats} margin={{ top: 10, right: 10, left: -35, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 600 }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" radius={[6, 6, 6, 6]} barSize={window.innerWidth < 768 ? 30 : 50}>
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsChart;