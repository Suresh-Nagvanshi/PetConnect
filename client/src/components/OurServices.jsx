import React from 'react';


function OurServices() {
  return (
    <section className="py-16 bg-gray-200 w-full mt-10">
      {/* Section Title */}
      <div className=" text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-12">
          We provide top-notch services for your beloved pets. From adoption to
          healthcare, everything you need is right here.
        </p>
      </div>

      {/* Grid Section - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center">
            <img
              src="public/petadoption.png"
              alt="Adoption"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Pet Adoption</h3>
            <p className="text-gray-600">
              Find your perfect furry companion from a wide variety of adorable pets.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center">
            <img
              src="public/vet.png"
              alt="Healthcare"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Veterinary services</h3>
            <p className="text-gray-600">
              Professional veterinary care to keep your pets healthy and happy.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center">
            <img
              src="public/petstore.png"
              alt="Pet Store"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Pet Store</h3>
            <p className="text-gray-600">
              All the essentials and toys your pets love — under one roof.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 p-8 text-center">
            <img
              src="public/ai.png"
              alt="SmartCare AI"
              className="w-20 mx-auto mb-4"
            />
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
