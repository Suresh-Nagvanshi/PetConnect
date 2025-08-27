import React, { useState } from 'react';

// --- SVG ICONS ---
// SVG Icon for Google
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

// SVG Icon for Facebook
const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

// SVG Icon for Back Arrow
const BackArrowIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
);


// --- REUSABLE FORM COMPONENTS ---
// Generic Input component for forms
const FormInput = ({ id, label, type = 'text', placeholder, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

// --- ROLE-SPECIFIC REGISTRATION FORMS ---
// Form for Buyers
const BuyerForm = () => (
    <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput id="firstName" label="First Name" placeholder="Enter your first name" />
            <FormInput id="lastName" label="Last Name" placeholder="Enter your last name" />
        </div>
        <FormInput id="email" label="Email Address" type="email" placeholder="you@example.com" />
        <FormInput id="password" label="Password" type="password" placeholder="Create a strong password" />
        <FormInput id="confirmPassword" label="Confirm Password" type="password" placeholder="Confirm your password" />
    </form>
);

// Form for Sellers (can be individual pet owners or businesses)
const SellerForm = () => (
    <form className="space-y-4">
        <FormInput id="sellerName" label="Full Name / Business Name" placeholder="Your name or business name" />
        <FormInput id="businessType" label="Business Type (Optional)" placeholder="e.g., Breeder, Shelter, Pet Shop" required={false} />
        <FormInput id="registrationNumber" label="Business Registration No. (Optional)" placeholder="Official registration number" required={false} />
        <FormInput id="sellerEmail" label="Email" type="email" placeholder="contact@example.com" />
        <FormInput id="sellerPassword" label="Password" type="password" placeholder="Create a secure password" />
        <FormInput id="confirmSellerPassword" label="Confirm Password" type="password" placeholder="Confirm your password" />
    </form>
);

// Form for Veterinarians
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


// --- MAIN APP COMPONENT ---
function App() {
    // 'selection' displays the role choice page, 'register' displays the form
    const [view, setView] = useState('selection'); 
    // State to manage which registration form is active: 'buyer', 'seller', or 'veterinarian'
    const [activeRole, setActiveRole] = useState('buyer');

    // Function to handle role selection and switch to the registration view
    const handleRoleSelect = (role) => {
        setActiveRole(role);
        setView('register');
    };

    // --- REGISTRATION VIEW COMPONENT ---
    const RegistrationView = () => {
        const roleInfo = {
            buyer: { title: "Buyer", form: <BuyerForm /> },
            seller: { title: "Seller", form: <SellerForm /> },
            veterinarian: { title: "Veterinarian", form: <VeterinarianForm /> }
        };

        const currentRole = roleInfo[activeRole];

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
                    <h2 className="text-3xl font-bold">Register as a {currentRole.title}</h2>
                    <p className="text-blue-100 mt-1">Create your PetConnect account</p>
                </div>

                {/* Form Area */}
                <div className="p-6 sm:p-8">
                    {currentRole.form}

                    {/* Terms and Conditions */}
                    <div className="mt-6 flex items-start">
                        <input type="checkbox" id="terms" className="h-5 w-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
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

    // --- ROLE SELECTION VIEW COMPONENT ---
    const RoleSelectionView = () => {
        const RoleCard = ({ role, title, description, imageUrl, onSelect }) => (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300 group">
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found'; }} />
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    <p className="mt-2 text-gray-600">{description}</p>
                    <button 
                        onClick={() => onSelect(role)}
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
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <RoleCard 
                        role="buyer"
                        title="I'm a Buyer"
                        description="Find your new best friend. Browse listings from trusted sellers and shelters."
                        imageUrl="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
                        onSelect={handleRoleSelect}
                    />
                    <RoleCard 
                        role="seller"
                        title="I'm a Seller"
                        description="Connect with loving homes. List pets for sale or adoption with our easy tools."
                        imageUrl="https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg?auto=compress&cs=tinysrgb&w=600"
                        onSelect={handleRoleSelect}
                    />
                    <RoleCard 
                        role="veterinarian"
                        title="I'm a Veterinarian"
                        description="Provide trusted care. Verify pet health records and connect with clients."
                        imageUrl="https://images.pexels.com/photos/6235116/pexels-photo-6235116.jpeg?auto=compress&cs=tinysrgb&w=600"
                        onSelect={handleRoleSelect}
                    />
                </div>
            </div>
        );
    };

    // Main return statement to switch between views
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            {/* Some simple CSS for the fade-in animation */}
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
