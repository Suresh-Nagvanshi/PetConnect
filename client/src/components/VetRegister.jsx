import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Correcting the import path to be more explicit for the build tool.
import ProgressBar from './ProgressBar.jsx';

const VetRegister = () => {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Clinic Address Info
    clinicName: '',
    houseNo: '',
    city: '',
    pincode: '',
    district: '',
    state: '',
    // Credentials
    qualifications: '', // e.g., BVSc & AH, MVSc
    licenseNumber: '',
    yearsExperience: '',
    // Agreement
    agreedToTerms: false,
  });

  // --- FORM LOGIC ---
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      // This simple logic handles both text inputs and checkboxes.
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // --- NAVIGATION LOGIC ---
  // These steps are tailored for a professional veterinarian.
  const steps = [
    { name: 'Personal Info' },
    { name: 'Clinic Details' },
    { name: 'Credentials' },
    { name: 'Agreement' },
    { name: 'Confirm' },
  ];

  const nextStep = () => setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* A more professional, blue-themed header for veterinarians. */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Veterinarian Registration</h2>
          <p className="text-indigo-100">Join our trusted network of pet care professionals.</p>
        </div>

        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <form className="space-y-4">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Your Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-left">First Name</label>
                    <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Dr. Suresh"/>
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

            {/* Step 2: Clinic Address Details */}
            {currentStep === 1 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Your Clinic / Hospital Address</h3>
                 <div>
                    <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 text-left">Clinic / Hospital Name</label>
                    <input type="text" id="clinicName" value={formData.clinicName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., The Pet Clinic"/>
                </div>
                <div>
                    <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 text-left">Street Address</label>
                    <input type="text" id="houseNo" value={formData.houseNo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 123 Health Avenue"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">City</label>
                        <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ghaziabad"/>
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 text-left">Pincode</label>
                        <input type="text" id="pincode" value={formData.pincode} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 201001"/>
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

            {/* Step 3: Professional Credentials */}
            {currentStep === 2 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Professional Credentials</h3>
                 <div>
                    <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 text-left">Qualifications</label>
                    <input type="text" id="qualifications" value={formData.qualifications} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., BVSc & AH, MVSc"/>
                </div>
                 <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 text-left">Veterinary Council License Number</label>
                    <input type="text" id="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., VCI/12345"/>
                </div>
                 <div>
                    <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 text-left">Years of Experience</label>
                    <input type="number" id="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., 5"/>
                </div>
              </section>
            )}

            {/* Step 4: Terms and Conditions */}
            {currentStep === 3 && (
                <section className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Terms of Service</h3>
                    <div className="p-4 border rounded-lg bg-gray-50 max-h-48 overflow-y-auto text-sm text-gray-600">
                        <p className="mb-2">Welcome to the PetConnect veterinarian network. By joining, you agree to uphold the highest standards of animal care and professional conduct.</p>
                        <p className="mb-2">1. You confirm that all professional credentials provided are accurate and up-to-date.</p>
                        <p className="mb-2">2. You agree to maintain the confidentiality of pet owners' information.</p>
                        <p>3. You will provide services in accordance with all local and national veterinary regulations.</p>
                    </div>
                    <div className="mt-4 flex items-center">
                        <input type="checkbox" id="agreedToTerms" checked={formData.agreedToTerms} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded"/>
                        <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-900">I have read and agree to the terms of service.</label>
                    </div>
                </section>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 4 && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 5: Please Confirm Your Details</h3>
                 <div className="text-left bg-gray-100 p-6 rounded-lg space-y-3">
                    <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Contact:</strong> {formData.email}, {formData.phone}</div>
                    <hr className="my-2"/>
                    <div><strong>Clinic:</strong> {formData.clinicName}</div>
                    <div><strong>Address:</strong> {formData.houseNo}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
                    <hr className="my-2"/>
                    <div><strong>Qualifications:</strong> {formData.qualifications}</div>
                    <div><strong>License No:</strong> {formData.licenseNumber}</div>
                    <div><strong>Experience:</strong> {formData.yearsExperience} years</div>
                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button type="button" onClick={prevStep} className={`bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold ${currentStep === 0 ? 'invisible' : 'visible'}`}>
                Previous
              </button>
              {/* Only show the "Next" button if the user is not on the last step */}
              {currentStep < steps.length - 1 && (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  // A neat little feature: disable the button on the agreement step until the box is checked.
                  disabled={currentStep === 3 && !formData.agreedToTerms}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
              {/* Only show the "Create Account" button on the very last step. */}
              {currentStep === steps.length - 1 && (
                <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold">
                  Submit Application
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

export default VetRegister;

