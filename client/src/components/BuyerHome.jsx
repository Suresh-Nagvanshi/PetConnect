import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

function BuyerHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar shown by default
  const navigate = useNavigate();

  // Safely get buyer data from localStorage and handle JSON parse errors
  const [buyerName, setBuyerName] = useState('Buyer');

  useEffect(() => {
    try {
      const buyerData = JSON.parse(localStorage.getItem('buyer'));
      if (buyerData && buyerData.firstName) {
        setBuyerName(buyerData.firstName);
      } else {
        setBuyerName('Buyer');
      }
    } catch {
      setBuyerName('Buyer');
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('buyer');
    navigate('/login', { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-800 font-bold' : ''}`;

  return (
    <div className="min-h-screen flex">
      {/* Hamburger toggle button visible only when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white rounded p-2 focus:outline-none"
          aria-label="Open sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-600 text-white flex flex-col p-4 space-y-4 transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with greeting and close button always visible */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <h2 className="text-lg font-semibold truncate">Hello, {buyerName}</h2>
          <button
            className="text-white text-3xl font-bold focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <nav className="flex flex-col py-4 space-y-1">
          <NavLink to="/buyer_home/petstore" className={linkClass} onClick={() => setSidebarOpen(false)}>
            PetStore
          </NavLink>
          <NavLink to="/buyer_home/petadoption" className={linkClass} onClick={() => setSidebarOpen(false)}>
            Pet Adoption
          </NavLink>
          <NavLink to="/buyer_home/editprofile" className={linkClass} onClick={() => setSidebarOpen(false)}>
            Edit Profile
          </NavLink>
          <NavLink to="/buyer_home/feedback" className={linkClass} onClick={() => setSidebarOpen(false)}>
            Feedback
          </NavLink>
          <button
            onClick={handleLogout}
            className="mt-auto px-4 py-3 text-left rounded hover:bg-blue-700 font-semibold"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main content area */}
      <div className={`flex-grow p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default BuyerHome;
