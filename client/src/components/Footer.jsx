import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  // Smooth scroll function for anchor links
  const smoothScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      // First scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Then scroll to target after a delay
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 800);
    }
  };

  // Smooth navigation function for React Router links
  const smoothNavigate = (path) => {
    // First scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Then navigate after scrolling
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 py-12 w-full relative">
      {/* Remove the width limiter here */}
      <div className="px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 max-w-full">
          
          {/* Brand Section */}
          <div className="space-y-4 md:border-r md:border-gray-600 md:pr-8">
            <h2 className="text-3xl font-bold text-white">
              PetConnect
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Connecting pet lovers everywhere! Find, adopt, and care for your furry friends with ease.
            </p>
          </div>



          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><button onClick={() => smoothNavigate('/')} className="hover:text-blue-400 transition-colors duration-300 flex items-center group w-full text-left">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                Home
              </button></li>
              <li><button onClick={() => smoothNavigate('/about')} className="hover:text-blue-400 transition-colors duration-300 flex items-center group w-full text-left">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                About
              </button></li>
              <li><button onClick={() => smoothScrollTo('services')} className="hover:text-blue-400 transition-colors duration-300 flex items-center group w-full text-left">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                Services
              </button></li>
              <li><button onClick={() => smoothNavigate('/feedback')} className="hover:text-blue-400 transition-colors duration-300 flex items-center group w-full text-left">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                Feedback
              </button></li>
              <li><button onClick={() => smoothNavigate('/contact')} className="hover:text-blue-400 transition-colors duration-300 flex items-center group w-full text-left">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                Contact
              </button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-blue-400 w-5"></i>
                <span>support@petconnect.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-blue-400 w-5"></i>
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-blue-400 w-5"></i>
                <span>Ghaziabad, India</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white border-b border-blue-500 pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white hover:from-gray-800 hover:to-gray-900 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fab fa-x-twitter text-lg"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-white hover:from-gray-900 hover:to-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fab fa-github text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 w-full">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} PetConnect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;