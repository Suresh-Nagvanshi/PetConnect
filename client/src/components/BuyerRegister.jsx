import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// This path assumes 'progressbar.jsx' is in the same folder.
// This is the most reliable path based on your project structure.
import ProgressBar from './ProgressBar.jsx';

const BuyerRegister = () => {
  // --- STATE MANAGEMENT ---
  // Simple state to remember which step we are on (0, 1, or 2).
  const [currentStep, setCurrentStep] = useState(0);

  // Simple state to store all the information from the form fields.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    houseNo: '',
    city: '',
    pincode: '',
    district: '',
    state: '',
  });

  // --- FORM LOGIC ---
  // This simple function updates our formData state every time you type.
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  // --- NAVIGATION LOGIC ---
  const steps = [
    { name: 'Personal Info' },
    { name: 'Address' },
    { name: 'Confirm' },
  ];

  const nextStep = () => setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Register as a Buyer</h2>
          <p className="text-blue-100">Create your account to find a new friend!</p>
        </div>

        <div className="p-8">
          {/* Progress Bar Display */}
          <div className="mb-8 flex justify-center">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <form className="space-y-4">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Personal Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-left">First Name</label>
                        <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Suresh"/>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 text-left">Last Name</label>
                        <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Nagvanshi"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com"/>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left">Phone Number</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="+91-9876543210"/>
                </div>
              </section>
            )}

            {/* Step 2: Address Details */}
            {currentStep === 1 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Address Details</h3>
                <div>
                    <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 text-left">House No. / Street Name</label>
                    <input type="text" id="houseNo" value={formData.houseNo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 123 Pet Lane"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">City</label>
                        <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Ghaziabad"/>
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 text-left">Pincode</label>
                        <input type="text" id="pincode" value={formData.pincode} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 201001"/>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 text-left">District</label>
                        <input type="text" id="district" value={formData.district} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Ghaziabad"/>
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 text-left">State</label>
                        <input type="text" id="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Uttar Pradesh"/>
                    </div>
                </div>
              </section>
            )}

            {/* Step 3: Confirmation - The logic is now fixed so this step appears correctly. */}
            {currentStep === 2 && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Please Confirm Your Details</h3>
                <div className="text-left bg-gray-100 p-6 rounded-lg space-y-3">
                    <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                    <hr className="my-2"/>
                    <div><strong>Address:</strong> {formData.houseNo}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
                </div>
              </section>
            )}

            {/* Navigation Buttons - The logic is now fixed to show the correct button at each step. */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className={`bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors ${currentStep === 0 ? 'invisible' : 'visible'}`}
              >
                Previous
              </button>

              {currentStep < steps.length - 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}

              {currentStep === steps.length - 1 && (
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
       {/* Simple fade-in animation */}
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

export default BuyerRegister;

