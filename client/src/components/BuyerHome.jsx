import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function BuyerHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [buyerName, setBuyerName] = useState('Buyer');
  const [buyerLinks, setBuyerLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const buyerData = JSON.parse(localStorage.getItem('buyer'));
      setBuyerName(buyerData?.firstName || 'Buyer');
    } catch {
      setBuyerName('Buyer');
    }
  }, []);

  useEffect(() => {
    // Default buyer routes with added appointments
    const defaultLinks = [
      { to: '/buyer_home/petadoption', label: 'Pet Adoption' },
      { to: '/buyer_home/editprofile', label: 'Edit Profile' },
      { to: '/buyer_home/feedback', label: 'Feedback' },
      { to: '/buyer_home/appointments', label: 'Appointments' }, // New route
    ];
    setBuyerLinks(defaultLinks);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    localStorage.removeItem('buyer');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white rounded-xl p-2 shadow-lg hover:bg-blue-700 focus:outline-none"
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} buyerName={buyerName} onLogout={handleLogout} links={buyerLinks} />

      <div className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'} p-6 md:p-10`}>
        <Outlet />
      </div>
    </div>
  );
}

export default BuyerHome;
