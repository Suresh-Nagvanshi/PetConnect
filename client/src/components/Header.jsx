import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Smooth navigation function for React Router links
  const smoothNavigate = (path) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  const handleNavigate = (path) => {
    setMobileOpen(false);
    smoothNavigate(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <nav className="flex items-center justify-between w-full px-4 sm:px-6 py-3">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full" src="fav_icon.png" alt="Logo" />
          <Link className="ml-3 text-white italic text-2xl font-bold" to="/">PetConnect</Link>
        </div>
        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-3 text-sm text-white italic">
          <li>
            <button
              onClick={() => handleNavigate('/')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/about')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/login')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/register')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Register
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/petstore')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Pet Store
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/contact')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Contact Us
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate('/feedback')}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Feedback
            </button>
          </li>
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
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden px-4 pb-4">
          <div className="space-y-2 text-sm text-white italic">
            <button onClick={() => handleNavigate('/')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Home</button>
            <button onClick={() => handleNavigate('/about')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">About Us</button>
            <button onClick={() => handleNavigate('/login')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Login</button>
            <button onClick={() => handleNavigate('/register')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Register</button>
            <button onClick={() => handleNavigate('/petstore')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Pet Store</button>
            <button onClick={() => handleNavigate('/contact')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Contact Us</button>
            <button onClick={() => handleNavigate('/feedback')} className="w-full text-left font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Feedback</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
