import React from 'react';
import { Link } from 'react-router-dom';

function OurServices() {
  return (
    <section className="py-16 bg-gray-100 w-full mt-10">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We provide top-notch services for your beloved pets. From adoption to
          healthcare, everything you need is right here.
        </p>
      </div>

      {/* Grid Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1: Pet Adoption */}
          <Link to="/petadoption" className="block">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center h-full flex flex-col">
              {/* Circular container with overflow-hidden */}
              <div className="flex items-center justify-center h-40 w-40 rounded-full bg-blue-100 mx-auto mb-6 overflow-hidden">
                <img
                  src="/petadoption.png"
                  alt="Adoption"
                  className="transform scale-150"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pet Adoption</h3>
              <p className="text-gray-600">
                Find your perfect furry companion from a wide variety of adorable pets.
              </p>
            </div>
          </Link>

          {/* Card 2: Veterinary Services */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center h-full flex flex-col">
            {/* Circular container with overflow-hidden */}
            <div className="flex items-center justify-center h-40 w-40 rounded-full bg-green-100 mx-auto mb-6 overflow-hidden">
              <img
                src="/vet.png"
                alt="Healthcare"
                className="transform scale-150"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Veterinary Services</h3>
            <p className="text-gray-600">
              Professional veterinary care to keep your pets healthy and happy.
            </p>
          </div>

          {/* Card 3: Pet Store */}
          <Link to="/petstore" className="block">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center h-full flex flex-col">
              {/* Circular container with overflow-hidden */}
              <div className="flex items-center justify-center h-40 w-40 rounded-full bg-orange-100 mx-auto mb-6 overflow-hidden">
                <img
                  src="/petstore.png"
                  alt="Pet Store"
                  className="transform scale-150"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pet Store</h3>
              <p className="text-gray-600">
                All the essentials and toys your pets love — under one roof.
              </p>
            </div>
          </Link>

          {/* Card 4: SmartCare AI */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center h-full flex flex-col">
             {/* Circular container with overflow-hidden */}
            <div className="flex items-center justify-center h-40 w-40 rounded-full bg-purple-100 mx-auto mb-6 overflow-hidden">
              <img
                src="/ai.png"
                alt="SmartCare AI"
                className="transform scale-150"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">SmartCare AI</h3>
            <p className="text-gray-600">
              AI-powered monitoring to track and manage your pet’s health and behavior.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OurServices;

