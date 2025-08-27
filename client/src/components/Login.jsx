import React, { useState } from 'react';

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

// Main Login Component
function PetConnectLogin() {
    // State to manage which login form is active: 'buyer', 'seller', or 'veterinarian'
    const [activeRole, setActiveRole] = useState('buyer');

    // Common button styles for the role selector
    const roleButtonClasses = (role) => 
        `flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            activeRole === role
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:bg-gray-200 hover:text-blue-600'
        }`;
    
    // Generic Login Form
    const LoginForm = () => (
        <form className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={`Enter your ${activeRole} email`}
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                />
            </div>
             <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                </a>
            </div>
        </form>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                    <p className="text-purple-100">Sign in to your PetConnect account</p>
                </div>

                {/* Role Selector Tabs */}
                <div className="flex bg-gray-100 p-1 space-x-1">
                    <button onClick={() => setActiveRole('buyer')} className={roleButtonClasses('buyer')}>
                        Buyer
                    </button>
                    <button onClick={() => setActiveRole('seller')} className={roleButtonClasses('seller')}>
                        Seller
                    </button>
                    <button onClick={() => setActiveRole('veterinarian')} className={roleButtonClasses('veterinarian')}>
                        Veterinarian
                    </button>
                </div>

                {/* Form Area */}
                <div className="p-6 sm:p-8">
                    <LoginForm />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
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
                    
                    {/* Link to Register Page */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            Create one now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PetConnectLogin;
