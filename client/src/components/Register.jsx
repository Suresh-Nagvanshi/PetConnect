import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/register/${role}`);
  };

  const RoleCard = ({ title, description, imageUrl, role }) => (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer hover:shadow-2xl animate-float"
      onClick={() => handleRoleSelect(role)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found'; }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600 h-24">{description}</p>
        <button
          onClick={(e) => { e.stopPropagation(); handleRoleSelect(role); }}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:bg-purple-600"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 pt-20">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float:nth-child(2) {
            animation-delay: 2s;
        }
        .animate-float:nth-child(3) {
            animation-delay: 4s;
        }
      `}</style>
      <div className="max-w-5xl w-full text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Welcome to <span className="text-blue-600">PetConnect</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your role to begin your journey with us. We're excited to have you on board!
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoleCard
            title="I'm a Buyer"
            description="Find your new best friend. Browse pets for adoption or sale."
            imageUrl="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
            role="buyer"
          />
          <RoleCard
            title="I'm a Seller"
            description="List your pets for sale or adoption and connect with loving homes."
            imageUrl="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
            role="seller"
          />
          <RoleCard
            title="I'm a Veterinarian"
            description="Provide trusted care and connect with clients in our community."
            imageUrl="https://images.pexels.com/photos/6235116/pexels-photo-6235116.jpeg?auto=compress&cs=tinysrgb&w=600"
            role="veterinarian"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;