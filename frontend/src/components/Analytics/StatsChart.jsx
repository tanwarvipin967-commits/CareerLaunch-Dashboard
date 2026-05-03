import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StatsChart = ({ jobs = [] }) => { // Default empty array taaki error na aaye
  const stats = [
    { name: 'Pending', count: jobs.filter(j => j.status === 'Pending').length, color: '#6366f1' },
    { name: 'Applied', count: jobs.filter(j => j.status === 'Applied').length, color: '#f59e0b' },
    { name: 'Interview', count: jobs.filter(j => j.status === 'Interview').length, color: '#10b981' },
    { name: 'Rejected', count: jobs.filter(j => j.status === 'Rejected').length, color: '#ef4444' },
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Application Analytics</h2>
          <p className="text-gray-500 font-medium mt-1">Real-time tracking of your career progress</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-indigo-50 px-6 py-3 rounded-2xl">
            <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">Total Jobs</span>
            <span className="text-2xl font-black text-indigo-700">{jobs.length}</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full" style={{ minWidth: 0, minHeight: 300 }}>
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={50}>
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