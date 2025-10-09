import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock scroll when sidebar open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  // Smooth navigation function for React Router links
  const smoothNavigate = (path) => {
    // First scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
    // Then navigate after scrolling
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  const handleNavigate = (path) => {
    setMobileOpen(false);
    smoothNavigate(path);
  };

  const navItems = [
    { label: 'SmartCareAI', path: '/smartcare-ai' },
    { label: 'About Us', path: '/about' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Pet Store', path: '/petstore' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Feedback', path: '/feedback' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <nav className="flex items-center justify-between w-full px-4 sm:px-6 py-3">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full" src="/fav_icon.png" alt="Logo" />
          <Link
            to="/"
            className="ml-3 text-white italic text-2xl font-bold"
            onClick={() => handleNavigate('/')}
          >
            PetConnect
          </Link>
        </div>
        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-3 text-sm text-white italic">
          {navItems.map(({ label, path }) => (
            <li key={label}>
              <button
                onClick={() => handleNavigate(path)}
                className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:ring-offset-black"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          {mobileOpen ? (
            // Close icon
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>
      {/* Sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white hover:text-yellow-400 focus:outline-none"
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6">
          {navItems.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => handleNavigate(path)}
              className="text-left font-bold text-lg hover:text-yellow-400 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </header>
  );
}

export default Header;