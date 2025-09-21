import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const SellerRegister = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // added password
    phone: "",
    houseNo: "",
    city: "",
    pincode: "",
    district: "",
    state: "",
    animalType: "",
    breed: "",
    petName: "",
    petAge: "",
  });

  const steps = [
    { name: "Personal Info" },
    { name: "Address" },
    { name: "Pet Details" },
    { name: "Confirm" }
  ];

  const validateStep = () => {
    let errors = {};
    if (currentStep === 0) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
      if (!formData.password.trim()) errors.password = "Password is required";
      else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
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
      if (
        ["dog", "cat"].includes(formData.animalType.toLowerCase()) &&
        !formData.breed.trim()
      ) {
        errors.breed = "Breed is required for dogs and cats";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const next = () => {
    if (validateStep()) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    fetch("/api/sellers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to register");
        return res.json();
      })
      .then(data => alert(data.message || "Seller registered successfully!"))
      .catch(err => alert(err.message));
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
              <section className="animate-fade-in space-y-4">
                <h3 className="text-xl mb-4" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                  Step 1: Personal Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Suresh"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Nagvanshi"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <p className="text-red-600 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="+91-9876543210"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {currentStep === 1 && (
              <section className="animate-fade-in space-y-4">
                <h3 className="text-xl mb-4" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                  Step 2: Address
                </h3>
                <div>
                  <label htmlFor="houseNo" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                    House No.
                  </label>
                  <input
                    type="text"
                    id="houseNo"
                    value={formData.houseNo}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="123 Street"
                  />
                  {errors.houseNo && (
                    <p className="text-red-600 text-sm">{errors.houseNo}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Pincode"
                    />
                    {errors.pincode && (
                      <p className="text-red-600 text-sm">{errors.pincode}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="district" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      District
                    </label>
                    <input
                      type="text"
                      id="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="District"
                    />
                    {errors.district && (
                      <p className="text-red-600 text-sm">{errors.district}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="text-red-600 text-sm">{errors.state}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="animate-fade-in space-y-4">
                <h3 className="text-xl mb-4" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                  Step 3: Pet Details
                </h3>
                <div>
                  <label htmlFor="petName" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                    Pet Name
                  </label>
                  <input
                    type="text"
                    id="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Buddy"
                  />
                  {errors.petName && (
                    <p className="text-red-600 text-sm">{errors.petName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="petAge" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                    Pet Age
                  </label>
                  <input
                    type="text"
                    id="petAge"
                    value={formData.petAge}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="2 years"
                  />
                  {errors.petAge && (
                    <p className="text-red-600 text-sm">{errors.petAge}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="animalType" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                    Animal Type
                  </label>
                  <input
                    type="text"
                    id="animalType"
                    value={formData.animalType}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Dog, Cat, Rabbit"
                  />
                  {errors.animalType && (
                    <p className="text-red-600 text-sm">{errors.animalType}</p>
                  )}
                </div>
                {["dog", "cat"].includes(formData.animalType.toLowerCase()) && (
                  <div>
                    <label htmlFor="breed" className="block text-sm text-gray-700 mb-1" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                      Breed
                    </label>
                    <input
                      type="text"
                      id="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Golden Retriever"
                    />
                    {errors.breed && (
                      <p className="text-red-600 text-sm">{errors.breed}</p>
                    )}
                  </div>
                )}
              </section>
            )}

            {currentStep === 3 && (
              <section className="animate-fade-in space-y-4">
                <h3 className="text-xl mb-4" style={{ fontWeight: 'normal', textAlign: 'left' }}>
                  Step 4: Please Confirm All Details
                </h3>
                <div className="bg-gray-100 p-4 rounded space-y-2">
                  <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Address:</strong> {formData.houseNo}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
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
                onClick={prev}
                disabled={currentStep === 0}
                className={`bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold ${currentStep === 0 ? "invisible" : "visible"}`}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
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
        .input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
          transition: border-color 0.2s ease;
        }
        .input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SellerRegister;
