import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function AboutUs() {
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
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/33242934/pexels-photo-33242934.jpeg" 
          alt="Background pattern" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative text-white py-80 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/33242934/pexels-photo-33242934.jpeg" 
              alt="Pets background" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-black/35"></div>
          </div>
          
          {/* Glassmorphism Content Container */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pb-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
                <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">About PetConnect</h1>
                <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  We're passionate about connecting pets with loving homes and building a community 
                  where every animal finds the care and companionship they deserve.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-white/30 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Mission & Vision</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/90 to-purple-600/90 rounded-2xl p-6 text-white border border-white/30 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-base leading-relaxed mb-4">
                  To create a world where every pet has a loving home and every family can experience 
                  the joy of pet companionship. We believe that pets enrich our lives in countless ways, 
                  and we're committed to making pet adoption and care accessible to everyone.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/90 to-purple-600/90 rounded-2xl p-6 text-white border border-white/30 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-base leading-relaxed">
                  To become the leading platform for pet adoption, care, and community building, 
                  fostering a world where no animal goes without love and care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white/90 backdrop-blur-sm py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-100/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/50">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-heart text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Compassion</h3>
                <p className="text-gray-600">
                  We treat every animal with kindness, respect, and the love they deserve.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-100/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/50">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibility</h3>
                <p className="text-gray-600">
                  We ensure every adoption is responsible and every pet receives proper care.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50/80 to-violet-100/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/50">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
                <p className="text-gray-600">
                  We build strong connections between pet lovers, creating a supportive network.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50/80 to-amber-100/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/50">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our platform to better serve pets and their families.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50/80 to-pink-100/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/50">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Trust</h3>
                <p className="text-gray-600">
                  We build lasting relationships based on transparency and reliability.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50/80 to-cyan-100/80 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/50">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-leaf text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We promote responsible pet ownership and environmental consciousness.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="bg-white/90 backdrop-blur-sm py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center backdrop-blur-sm bg-blue-50/80 rounded-2xl p-6 border border-blue-200/50">
                <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
                <p className="text-gray-600">Happy Pets Adopted</p>
              </div>
              <div className="text-center backdrop-blur-sm bg-green-50/80 rounded-2xl p-6 border border-green-200/50">
                <div className="text-5xl font-bold text-green-600 mb-2">5,000+</div>
                <p className="text-gray-600">Families Connected</p>
              </div>
              <div className="text-center backdrop-blur-sm bg-purple-50/80 rounded-2xl p-6 border border-purple-200/50">
                <div className="text-5xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-600">Partner Shelters</p>
              </div>
              <div className="text-center backdrop-blur-sm bg-orange-50/80 rounded-2xl p-6 border border-orange-200/50">
                <div className="text-5xl font-bold text-orange-600 mb-2">99%</div>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-3 w-48 mx-auto border border-white/20">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/ceo.jpg" 
                    alt="Nagvanshi" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Suresh Nagvanshi</h3>
                <p className="text-blue-200">Founder & CEO</p>
                <p className="text-gray-300 text-sm mt-2">
                  Passionate animal lover and the brains behind our project.
                </p>
              </div>
              
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-3 w-48 mx-auto border border-white/20">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/nihal.jpg" 
                    alt="Nihal Panwar" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nihal Panwar</h3>
                <p className="text-blue-200">Head of Technology</p>
                <p className="text-gray-300 text-sm mt-2">
                  Tech enthusiast
                </p>
              </div>
              
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-3 w-48 mx-auto border border-white/20">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/ankita.png" 
                    alt="Ankita Joseph" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ankita Joseph</h3>
                <p className="text-blue-200">Backend Developer</p>
                <p className="text-gray-300 text-sm mt-2">
                  Tech enthusiast dedicated to building robust backend systems.
                </p>
              </div>
              
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-3 w-48 mx-auto border border-white/20">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/shraddha.png" 
                    alt="Shradha" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Shradha</h3>
                <p className="text-blue-200">Community Manager</p>
                <p className="text-gray-300 text-sm mt-2">
                  Dedicated to fostering meaningful connections within our pet-loving community.
                </p>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-3 w-48 mx-auto border border-white/20">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/abhinav.jpg" 
                    alt="Abhinav G" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Abhinav G</h3>
                <p className="text-blue-200">Frontend Developer</p>
                <p className="text-gray-300 text-sm mt-2">
                 Dedicated to building a user-friendly and responsive frontend.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Together, we can create a world where every pet finds love and every family experiences 
              the joy of pet companionship. Start your journey with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => smoothNavigate('/register')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default AboutUs;
