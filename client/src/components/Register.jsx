import React, { useState } from 'react';

// ... (SVG icons and FormInput remain unchanged)

// Combined Buyer/Seller Form
const BuyerSellerForm = () => (
  <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput id="firstName" label="First Name" placeholder="Enter your first name" />
      <FormInput id="lastName" label="Last Name" placeholder="Enter your last name" />
    </div>
    <FormInput id="email" label="Email Address" type="email" placeholder="you@example.com" />
    <FormInput id="password" label="Password" type="password" placeholder="Create a strong password" />
    <FormInput id="confirmPassword" label="Confirm Password" type="password" placeholder="Confirm your password" />
    <FormInput id="businessType" label="Business Type (Optional)" placeholder="e.g., Breeder, Shelter, Pet Shop" required={false} />
    <FormInput id="registrationNumber" label="Business Registration No. (Optional)" placeholder="Official registration number" required={false} />
  </form>
);

// Veterinarian Form
const VeterinarianForm = () => (
  <form className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput id="vetFirstName" label="First Name" placeholder="Enter your first name" />
      <FormInput id="vetLastName" label="Last Name" placeholder="Enter your last name" />
    </div>
    <FormInput id="clinicName" label="Clinic/Hospital Name" placeholder="e.g., The Pet Clinic" />
    <FormInput id="licenseNumber" label="Veterinary License Number" placeholder="Enter your license number" />
    <FormInput id="vetEmail" label="Email Address" type="email" placeholder="you@example.com" />
    <FormInput id="vetPassword" label="Password" type="password" placeholder="Create a password" />
    <FormInput id="confirmVetPassword" label="Confirm Password" type="password" placeholder="Confirm your password" />
  </form>
);

function App() {
  const [view, setView] = useState('selection'); // role selection or registration
  const [activeRole, setActiveRole] = useState(''); // 'buyerSeller' or 'veterinarian'

  const handleRoleSelect = (role) => {
    setActiveRole(role);
    setView('register');
  };

  const RegistrationView = () => {
    return (
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center relative">
          <button
            onClick={() => setView('selection')}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Go back to role selection"
          >
            <BackArrowIcon />
          </button>
          <h2 className="text-3xl font-bold mb-1">
            Register as a {activeRole === 'buyerSeller' ? 'Buyer/Seller' : 'Veterinarian'}
          </h2>
          <p className="text-blue-100">Create your PetConnect account</p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          {activeRole === 'buyerSeller' ? <BuyerSellerForm /> : <VeterinarianForm />}

          {/* Terms and Conditions */}
          <div className="mt-6 flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="h-5 w-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Privacy Policy
              </a>.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>

          {/* Social Login Section */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <GoogleIcon />
                <span className="ml-2">Google</span>
              </button>
              <button className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FacebookIcon />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RoleSelectionView = () => {
    const RoleCard = ({ title, description, imageUrl, onSelect }) => (
      <div
        className="bg-white rounded-2xl shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
        onClick={onSelect}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found';
          }}
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 group-hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Started
          </button>
        </div>
      </div>
    );

    return (
      <div className="max-w-4xl w-full text-center animate-fade-in py-15 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Join PetConnect</h1>
        <p className="mt-4 text-lg text-gray-600">Choose your role to create an account and connect with the pet community.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard
            title="I'm a Buyer / Seller"
            description="Find your new best friend or list pets for sale or adoption with our easy tools."
            imageUrl="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
            onSelect={() => handleRoleSelect('buyerSeller')}
          />
          <RoleCard
            title="I'm a Veterinarian"
            description="Provide trusted care. Verify pet health records and connect with clients."
            imageUrl="https://images.pexels.com/photos/6235116/pexels-photo-6235116.jpeg?auto=compress&cs=tinysrgb&w=600"
            onSelect={() => handleRoleSelect('veterinarian')}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      {view === 'selection' ? <RoleSelectionView /> : <RegistrationView />}
    </div>
  );
}

export default App;