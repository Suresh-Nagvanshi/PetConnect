import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const VetRegister = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    clinicName: "",
    houseNumber: "",
    city: "",
    pincode: "",
    district: "",
    state: "",
    qualifications: "",
    licenseNumber: "",
    yearsExperience: "",
    agreedToTerms: false,
  });

  const steps = [
    { name: "Personal Info" },
    { name: "Clinic Details" },
    { name: "Credentials" },
    { name: "Agreement" },
    { name: "Confirm" },
  ];

  const validateStep = () => {
    let errors = {};
    if (currentStep === 0) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        errors.email = "Email is invalid";
      if (!formData.password.trim()) errors.password = "Password is required";
      else if (formData.password.length < 6)
        errors.password = "Password must be at least 6 characters";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone))
        errors.phone = "Phone is invalid";
    }
    if (currentStep === 1) {
      if (!formData.clinicName.trim())
        errors.clinicName = "Clinic name is required";
      if (!formData.houseNumber.trim())
        errors.houseNumber = "House number is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.pincode.trim()) errors.pincode = "Pincode is required";
      else if (!/^\d{5,6}$/.test(formData.pincode))
        errors.pincode = "Pincode is invalid";
      if (!formData.district.trim()) errors.district = "District is required";
      if (!formData.state.trim()) errors.state = "State is required";
    }
    if (currentStep === 2) {
      if (!formData.qualifications.trim())
        errors.qualifications = "Qualifications are required";
      if (!formData.licenseNumber.trim())
        errors.licenseNumber = "License number is required";
      if (!formData.yearsExperience || formData.yearsExperience < 0)
        errors.yearsExperience = "Valid years of experience required";
    }
    if (currentStep === 3) {
      if (!formData.agreedToTerms)
        errors.agreedToTerms = "You must agree to terms";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    fetch("/api/vets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Submission failed");
        return res.json();
      })
      .then((data) => alert(data.message || "Registration successful!"))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
          <h2 className="text-3xl font-bold">Veterinarian Registration</h2>
          <p className="text-indigo-100">
            Join our trusted network of veterinary professionals
          </p>
        </div>
        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {currentStep === 0 && (
              <section className="animate-fade-in">
                <h3 className="text-xl mb-4" style={{ fontWeight: "normal", textAlign: "left" }}>
                  Step 1: Personal Info
                </h3>
                <div>
                  <label htmlFor="firstName" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    First Name
                  </label>
                  <input id="firstName" type="text" className="input" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                  {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Last Name
                  </label>
                  <input id="lastName" type="text" className="input" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                  {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Email
                  </label>
                  <input id="email" type="email" className="input" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                  {errors.email && <p className="text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Password
                  </label>
                  <input id="password" type="password" className="input" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                  {errors.password && <p className="text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Phone
                  </label>
                  <input id="phone" type="tel" className="input" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" />
                  {errors.phone && <p className="text-red-600">{errors.phone}</p>}
                </div>
              </section>
            )}

            {currentStep === 1 && (
              <section className="animate-fade-in">
                <h3 className="text-xl mb-4" style={{ fontWeight: "normal", textAlign: "left" }}>
                  Step 2: Clinic Details
                </h3>
                <div>
                  <label htmlFor="clinicName" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Clinic Name
                  </label>
                  <input id="clinicName" type="text" className="input" value={formData.clinicName} onChange={handleInputChange} placeholder="Clinic Name" />
                  {errors.clinicName && <p className="text-red-600">{errors.clinicName}</p>}
                </div>
                <div>
                  <label htmlFor="houseNumber" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    House Number
                  </label>
                  <input id="houseNumber" type="text" className="input" value={formData.houseNumber} onChange={handleInputChange} placeholder="House Number" />
                  {errors.houseNumber && <p className="text-red-600">{errors.houseNumber}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    City
                  </label>
                  <input id="city" type="text" className="input" value={formData.city} onChange={handleInputChange} placeholder="City" />
                  {errors.city && <p className="text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Pincode
                  </label>
                  <input id="pincode" type="text" className="input" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" />
                  {errors.pincode && <p className="text-red-600">{errors.pincode}</p>}
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    District
                  </label>
                  <input id="district" type="text" className="input" value={formData.district} onChange={handleInputChange} placeholder="District" />
                  {errors.district && <p className="text-red-600">{errors.district}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    State
                  </label>
                  <input id="state" type="text" className="input" value={formData.state} onChange={handleInputChange} placeholder="State" />
                  {errors.state && <p className="text-red-600">{errors.state}</p>}
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="animate-fade-in">
                <h3 className="text-xl mb-4" style={{ fontWeight: "normal", textAlign: "left" }}>
                  Step 3: Credentials
                </h3>
                <div>
                  <label htmlFor="qualifications" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Qualifications
                  </label>
                  <input id="qualifications" type="text" className="input" value={formData.qualifications} onChange={handleInputChange} placeholder="Qualifications" />
                  {errors.qualifications && <p className="text-red-600">{errors.qualifications}</p>}
                </div>
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    License Number
                  </label>
                  <input id="licenseNumber" type="text" className="input" value={formData.licenseNumber} onChange={handleInputChange} placeholder="License Number" />
                  {errors.licenseNumber && <p className="text-red-600">{errors.licenseNumber}</p>}
                </div>
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm mb-1" style={{ fontWeight: "normal", textAlign: "left" }}>
                    Years of Experience
                  </label>
                  <input id="yearsExperience" type="number" className="input" value={formData.yearsExperience} onChange={handleInputChange} placeholder="Years of Experience" />
                  {errors.yearsExperience && <p className="text-red-600">{errors.yearsExperience}</p>}
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="animate-fade-in">
                <h3 className="text-xl mb-4" style={{ fontWeight: "normal", textAlign: "left" }}>
                  Step 4: Agreement
                </h3>
                <div className="bg-gray-50 p-4 rounded max-h-48 overflow-y-auto text-sm text-gray-600">
                  <p>Welcome to the veterinarian network. Please agree to the following terms:</p>
                  <ul>
                    <li>1. Accurate and truthful information.</li>
                    <li>2. Confidentiality of client data.</li>
                    <li>3. Compliance with all veterinary regulations.</li>
                  </ul>
                </div>
                <div className="mt-4 flex items-center">
                  <input id="agreedToTerms" type="checkbox" checked={formData.agreedToTerms} onChange={handleInputChange} className="mr-2" />
                  <label htmlFor="agreedToTerms" style={{ fontWeight: "normal" }}>I agree to the terms and conditions</label>
                </div>
                {errors.agreedToTerms && <p className="text-red-600">{errors.agreedToTerms}</p>}
              </section>
            )}

            {currentStep === 4 && (
              <section className="animate-fade-in">
                <h3 className="text-xl mb-4" style={{ fontWeight: "normal", textAlign: "left" }}>
                  Step 5: Confirm
                </h3>
                <div className="bg-gray-100 p-6 rounded space-y-3">
                  <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Clinic:</strong> {formData.clinicName}</div>
                  <div><strong>Address:</strong> {formData.houseNumber}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</div>
                  <div><strong>Qualifications:</strong> {formData.qualifications}</div>
                  <div><strong>License Number:</strong> {formData.licenseNumber}</div>
                  <div><strong>Years of Experience:</strong> {formData.yearsExperience}</div>
                </div>
              </section>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={prevStep}
                className="bg-gray-300 px-6 py-2 rounded"
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={currentStep === 3 && !formData.agreedToTerms}
                  className="bg-blue-600 px-6 py-2 rounded text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-600 px-6 py-2 rounded text-white"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
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

export default VetRegister;

