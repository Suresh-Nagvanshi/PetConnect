import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Using the correct, capitalized component name as you pointed out.
import ProgressBar from './ProgressBar'; 

const SellerRegister = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState(0); // Correctly starts at step 0
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '', // New phone number field
    // Address Info (now detailed)
    houseNo: '',
    city: '',
    pincode: '',
    district: '',
    state: '',
    // Pet Info (new step)
    animalType: '',
    breed: '', // New breed field
    petName: '',
    petAge: '',
  });

  // --- FORM LOGIC ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  // --- NAVIGATION LOGIC ---
  // The steps are now updated to include the new "Pet Details" section.
  const steps = [
    { name: 'Personal Info' },
    { name: 'Address' },
    { name: 'Pet Details' },
    { name: 'Confirm' },
  ];

  const nextStep = () => setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Register as a Seller</h2>
          <p className="text-cyan-100">List a pet and find them a happy home!</p>
        </div>

        <div className="p-8">
          {/* The centered and corrected progress bar is used here */}
          <div className="mb-8 flex justify-center">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <form className="space-y-4">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-left">First Name</label>
                    <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Suresh"/>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 text-left">Last Name</label>
                    <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Nagvanshi"/>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="you@example.com"/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left">Phone Number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="+91-9876543210"/>
                </div>
              </section>
            )}

            {/* Step 2: Address Details (Now detailed) */}
            {currentStep === 1 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Your Address</h3>
                <div>
                    <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 text-left">House No. / Street Name</label>
                    <input type="text" id="houseNo" value={formData.houseNo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="ex 123 Pet Lane"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">City</label>
                        <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ghaziabad"/>
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 text-left">Pincode</label>
                        <input type="text" id="pincode" value={formData.pincode} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="ex 201001"/>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 text-left">District</label>
                        <input type="text" id="district" value={formData.district} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ghaziabad"/>
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 text-left">State</label>
                        <input type="text" id="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Uttar Pradesh"/>
                    </div>
                </div>
              </section>
            )}

            {/* Step 3: Pet Details (The neat new feature!) */}
            {currentStep === 2 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Pet Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700 text-left">Pet's Name</label>
                    <input type="text" id="petName" value={formData.petName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="ex Buddy"/>
                  </div>
                  <div>
                    <label htmlFor="petAge" className="block text-sm font-medium text-gray-700 text-left">Pet's Age</label>
                    <input type="text" id="petAge" value={formData.petAge} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="ex 2 years"/>
                  </div>
                </div>
                <div>
                  <label htmlFor="animalType" className="block text-sm font-medium text-gray-700 text-left">Type of Animal</label>
                  <input type="text" id="animalType" value={formData.animalType} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="ex Dog, Cat, Rabbit"/>
                </div>
                
                {/* --- THE NEAT FEATURE --- */}
                {/* This is the simple logic: we only show this section if the user has typed 'dog' or 'cat'. */}
                {['dog', 'cat'].includes(formData.animalType.toLowerCase()) && (
                  <div className="animate-fade-in">
                    <label htmlFor="breed" className="block text-sm font-medium text-gray-700 text-left">
                      Breed of {formData.animalType}
                    </label>
                    <input type="text" id="breed" value={formData.breed} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="ex Golden Retriever, Siamese"/>
                  </div>
                )}
              </section>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 3 && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Please Confirm All Details</h3>
                 <div className="text-left bg-gray-100 p-6 rounded-lg space-y-3">
                    {/* Your Info */}
                    <div><strong>Seller Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Contact:</strong> {formData.email}, {formData.phone}</div>
                    <hr className="my-2"/>
                    {/* Address Info */}
                    <div><strong>Address:</strong> {formData.houseNo}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
                     <hr className="my-2"/>
                    {/* Pet Info */}
                    <div><strong>Pet Name:</strong> {formData.petName}</div>
                    <div><strong>Pet Age:</strong> {formData.petAge}</div>
                    <div><strong>Animal Type:</strong> {formData.animalType}</div>
                    {/* Only show breed if it exists */}
                    {formData.breed && <div><strong>Breed:</strong> {formData.breed}</div>}
                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button type="button" onClick={prevStep} className={`bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold ${currentStep === 0 ? 'invisible' : 'visible'}`}>
                Previous
              </button>
              {currentStep < steps.length - 1 && (
                <button type="button" onClick={nextStep} className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold">
                  Next
                </button>
              )}
              {currentStep === steps.length - 1 && (
                <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold">
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SellerRegister;

