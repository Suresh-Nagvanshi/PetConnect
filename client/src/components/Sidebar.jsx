import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, onToggle, buyerName = 'Buyer', onLogout, links }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md ${
      isActive
        ? 'bg-white/20 border-white/30 text-white shadow-lg'
        : 'bg-white/10 hover:bg-white/20 border-white/20 text-blue-50'
    } transition-colors`;

  const defaultLinks = [
    { to: '/buyer_home/petadoption', label: 'Pet Adoption' },
    { to: '/buyer_home/editprofile', label: 'Edit Profile' },
    { to: '/buyer_home/feedback', label: 'Feedback' },
  ];
  const navLinks = Array.isArray(links) && links.length ? links : defaultLinks;

  return (
    <div
      className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-indigo-700 via-blue-700 to-sky-600 text-white flex flex-col p-4 space-y-3 transform transition-transform duration-300 ease-in-out z-40 shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
        <div className="truncate">
          <p className="text-xs text-blue-100/90">Welcome</p>
          <h2 className="text-2xl font-bold tracking-wide truncate drop-shadow-sm">{buyerName}</h2>
        </div>
        <button
          className="text-white text-2xl font-bold leading-none h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10"
          onClick={onToggle}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col py-2 space-y-2">
        {navLinks.map((l) => (
          <NavLink key={l.to} to={l.to} className={linkClass} onClick={onToggle}>
            <span className="inline-block h-2 w-2 rounded-full bg-white/70"></span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout pinned to bottom with common destructive style */}
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold shadow-lg hover:from-rose-700 hover:to-red-700 active:scale-[.99] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
