import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function SellerHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sellerName, setSellerName] = useState('Seller');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const seller = JSON.parse(localStorage.getItem('seller'));
      setSellerName(seller?.firstName || 'Seller');
    } catch {
      setSellerName('Seller');
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    localStorage.removeItem('seller');
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

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        buyerName={sellerName}
        onLogout={handleLogout}
        links={[
          { to: '/seller_home/listanimals', label: 'List Animals' },
          { to: '/seller_home/listproducts', label: 'List Products' },
          { to: '/seller_home/feedback', label: 'Feedback' },
          { to: '/seller_home/appointments', label: 'Book Appointment' }
        ]}
      />

      <div className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'} p-6 md:p-10`}>
        <Outlet />
      </div>
    </div>
  );
}

export default SellerHome;
