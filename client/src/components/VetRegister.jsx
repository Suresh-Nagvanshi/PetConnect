import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar.jsx';

const VetRegister = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    clinicName: '',
    houseNo: '',
    city: '',
    pincode: '',
    district: '',
    state: '',
    qualifications: '',
    licenseNumber: '',
    yearsExperience: '',
    agreedToTerms: false,
  });

  const steps = [
    { name: 'Personal Info' },
    { name: 'Clinic Details' },
    { name: 'Credentials' },
    { name: 'Agreement' },
    { name: 'Confirm' },
  ];

  const validateStep = () => {
    let errors = {};
    if (currentStep === 0) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) errors.phone = "Phone is invalid";
    }
    if (currentStep === 1) {
      if (!formData.clinicName.trim()) errors.clinicName = "Clinic/Hospital name is required";
      if (!formData.houseNo.trim()) errors.houseNo = "Street address is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.pincode.trim()) errors.pincode = "Pincode is required";
      else if (!/^\d{5,6}$/.test(formData.pincode)) errors.pincode = "Pincode is invalid";
      if (!formData.district.trim()) errors.district = "District is required";
      if (!formData.state.trim()) errors.state = "State is required";
    }
    if (currentStep === 2) {
      if (!formData.qualifications.trim()) errors.qualifications = "Qualifications are required";
      if (!formData.licenseNumber.trim()) errors.licenseNumber = "License number is required";
      if (!formData.yearsExperience || formData.yearsExperience < 0) errors.yearsExperience = "Valid years of experience are required";
    }
    if (currentStep === 3) {
      if (!formData.agreedToTerms) errors.agreedToTerms = "You must agree to the terms";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // This function is now used in all inputs onChange handlers!
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    if (!validateStep()) return;
    fetch('/api/vets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Submission failed');
        return res.json();
      })
      .then(data => alert(data.message || 'Registration successful!'))
      .catch(err => alert(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Veterinarian Registration</h2>
          <p className="text-indigo-100">Join our trusted network of pet care professionals.</p>
        </div>

        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {currentStep === 0 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Your Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-left">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="Dr. Suresh"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 text-left">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="Nagvanshi"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-left">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="+91-9876543210"
                  />
                  {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                </div>
              </section>
            )}

            {currentStep === 1 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Your Clinic / Hospital Address</h3>
                <div>
                  <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 text-left">Clinic / Hospital Name</label>
                  <input
                    type="text"
                    id="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g., The Pet Clinic"
                  />
                  {errors.clinicName && <p className="text-red-600 text-sm">{errors.clinicName}</p>}
                </div>
                <div>
                  <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 text-left">Street Address</label>
                  <input
                    type="text"
                    id="houseNo"
                    value={formData.houseNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g., 123 Health Avenue"
                  />
                  {errors.houseNo && <p className="text-red-600 text-sm">{errors.houseNo}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">City</label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="Ghaziabad"
                    />
                    {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 text-left">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="e.g., 201001"
                    />
                    {errors.pincode && <p className="text-red-600 text-sm">{errors.pincode}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 text-left">District</label>
                    <input
                      type="text"
                      id="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="Ghaziabad"
                    />
                    {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 text-left">State</label>
                    <input
                      type="text"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="Uttar Pradesh"
                    />
                    {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
                  </div>
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Professional Credentials</h3>
                <div>
                  <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 text-left">Qualifications</label>
                  <input
                    type="text"
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g., BVSc & AH, MVSc"
                  />
                  {errors.qualifications && <p className="text-red-600 text-sm">{errors.qualifications}</p>}
                </div>
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 text-left">Veterinary Council License Number</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g., VCI/12345"
                  />
                  {errors.licenseNumber && <p className="text-red-600 text-sm">{errors.licenseNumber}</p>}
                </div>
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 text-left">Years of Experience</label>
                  <input
                    type="number"
                    id="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="e.g., 5"
                  />
                  {errors.yearsExperience && <p className="text-red-600 text-sm">{errors.yearsExperience}</p>}
                </div>
              </section>
            )}

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
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  {errors.agreedToTerms && <p className="text-red-600 text-sm ml-2">{errors.agreedToTerms}</p>}
                  <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-900">I have read and agree to the terms of service.</label>
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 5: Please Confirm Your Details</h3>
                <div className="text-left bg-gray-100 p-6 rounded-lg space-y-3">
                  <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                  <div><strong>Contact:</strong> {formData.email}, {formData.phone}</div>
                  <hr className="my-2" />
                  <div><strong>Clinic:</strong> {formData.clinicName}</div>
                  <div><strong>Address:</strong> {formData.houseNo}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
                  <hr className="my-2" />
                  <div><strong>Qualifications:</strong> {formData.qualifications}</div>
                  <div><strong>License No:</strong> {formData.licenseNumber}</div>
                  <div><strong>Experience:</strong> {formData.yearsExperience} years</div>
                </div>
              </section>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className={`bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold ${currentStep === 0 ? 'invisible' : 'visible'}`}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={currentStep === 3 && !formData.agreedToTerms}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
              {currentStep === steps.length - 1 && (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold"
                >
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
