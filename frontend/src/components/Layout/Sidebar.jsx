import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, PlusCircle, X, Briefcase } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/search', name: 'Explore Jobs', icon: <Search size={20} /> },
    { path: '/add-job', name: 'Add New Job', icon: <PlusCircle size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 z-50
        transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3 text-indigo-600">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <Briefcase size={24} />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">CareerLaunch</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Card (Optional) */}
          <div className="mt-auto p-5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl text-white shadow-lg shadow-indigo-200">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Ready to work?</p>
            <p className="text-sm font-bold">Track your future.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;