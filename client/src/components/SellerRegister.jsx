import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const SellerRegister = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
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
    animalType: '',
    breed: '',
    petName: '',
    petAge: '',
  });

  const steps = [
    { name: 'Personal Info' },
    { name: 'Address' },
    { name: 'Pet Details' },
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
      if (!formData.houseNo.trim()) errors.houseNo = "House No. is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.pincode.trim()) errors.pincode = "Pincode is required";
      else if (!/^\d{5,6}$/.test(formData.pincode)) errors.pincode = "Pincode is invalid";
      if (!formData.district.trim()) errors.district = "District is required";
      if (!formData.state.trim()) errors.state = "State is required";
    }
    if (currentStep === 2) {
      if (!formData.petName.trim()) errors.petName = "Pet name is required";
      if (!formData.petAge.trim()) errors.petAge = "Pet age is required";
      if (!formData.animalType.trim()) errors.animalType = "Animal type is required";
      if (['dog', 'cat'].includes(formData.animalType.toLowerCase())) {
        if (!formData.breed.trim()) errors.breed = "Breed is required for dogs and cats";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    if (!validateStep()) return;

    fetch('/api/sellers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to register');
        return res.json();
      })
      .then(data => alert(data.message || 'Seller registered successfully!'))
      .catch(err => alert('Error: ' + err.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Register as a Seller</h2>
          <p className="text-cyan-100">List a pet and find them a happy home!</p>
        </div>

        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {currentStep === 0 && (
              <section className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-left">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="Suresh"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Your Address</h3>
                <div>
                  <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 text-left">House No. / Street Name</label>
                  <input
                    type="text"
                    id="houseNo"
                    value={formData.houseNo}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="ex 123 Pet Lane"
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
                      placeholder="ex 201001"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Pet Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700 text-left">Pet's Name</label>
                    <input
                      type="text"
                      id="petName"
                      value={formData.petName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="ex Buddy"
                    />
                    {errors.petName && <p className="text-red-600 text-sm">{errors.petName}</p>}
                  </div>
                  <div>
                    <label htmlFor="petAge" className="block text-sm font-medium text-gray-700 text-left">Pet's Age</label>
                    <input
                      type="text"
                      id="petAge"
                      value={formData.petAge}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="ex 2 years"
                    />
                    {errors.petAge && <p className="text-red-600 text-sm">{errors.petAge}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="animalType" className="block text-sm font-medium text-gray-700 text-left">Type of Animal</label>
                  <input
                    type="text"
                    id="animalType"
                    value={formData.animalType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="ex Dog, Cat, Rabbit"
                  />
                  {errors.animalType && <p className="text-red-600 text-sm">{errors.animalType}</p>}
                </div>
                {['dog', 'cat'].includes(formData.animalType.toLowerCase()) && (
                  <div className="animate-fade-in">
                    <label htmlFor="breed" className="block text-sm font-medium text-gray-700 text-left">Breed of {formData.animalType}</label>
                    <input
                      type="text"
                      id="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder="ex Golden Retriever, Siamese"
                    />
                    {errors.breed && <p className="text-red-600 text-sm">{errors.breed}</p>}
                  </div>
                )}
              </section>
            )}

            {currentStep === 3 && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Please Confirm All Details</h3>
                <div className="text-left bg-gray-100 p-6 rounded-lg space-y-3">
                  <div><strong>Seller Name:</strong> {formData.firstName} {formData.lastName}</div>
                  <div><strong>Contact:</strong> {formData.email}, {formData.phone}</div>
                  <hr className="my-2" />
                  <div><strong>Address:</strong> {formData.houseNo}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
                  <hr className="my-2" />
                  <div><strong>Pet Name:</strong> {formData.petName}</div>
                  <div><strong>Pet Age:</strong> {formData.petAge}</div>
                  <div><strong>Animal Type:</strong> {formData.animalType}</div>
                  {formData.breed && <div><strong>Breed:</strong> {formData.breed}</div>}
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
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold"
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
