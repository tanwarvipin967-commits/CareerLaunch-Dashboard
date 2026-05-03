import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Briefcase, Search } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50';

  return (
    <nav className="bg-white border-r border-gray-100 h-screen w-64 fixed left-0 top-0 p-6 flex flex-col z-50">
      <div className="flex items-center gap-2 mb-10 px-2">
        <Briefcase className="text-indigo-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">CareerLaunch</h1>
      </div>
      
      <div className="flex flex-col gap-2">
        <Link to="/" className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all ${isActive('/')}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link to="/search" className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all ${isActive('/search')}`}>
          <Search size={20} />
          <span>Explore Jobs</span>
        </Link>

        <Link to="/add-job" className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all ${isActive('/add-job')}`}>
          <PlusCircle size={20} />
          <span>Add New Job</span>
        </Link>
      </div>

      <div className="mt-auto p-4 bg-indigo-600 rounded-2xl text-white text-center">
        <p className="text-xs opacity-80 mb-1 font-medium uppercase tracking-wider">Ready to work?</p>
        <p className="text-sm font-bold">Track your future.</p>
      </div>
    </nav>
  );
};

export default Navbar;