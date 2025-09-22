import React, { useState, useEffect } from 'react';

// --- Reusable Pet Card Component ---
// This makes our code clean and modular. Its only job is to display one pet.
const PetCard = ({ pet }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
    <img
      src={pet.imageUrl || 'https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image'}
      alt={pet.name}
      className="w-full h-56 object-cover"
    />
    <div className="p-5">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 truncate">{pet.name}</h3>
        <p className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-xs">{pet.age}</p>
      </div>
      <p className="text-sm text-gray-600 mb-4">{pet.breed}</p>
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 group-hover:bg-purple-600">
        Learn More
      </button>
    </div>
  </div>
);

// --- Main PetAdoption Component ---
function PetAdoption() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // The simple logic to fetch pet data from your server when the page loads.
  useEffect(() => {
    fetch('/api/pets') // Assuming you have an endpoint for pets
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch pets');
        return res.json();
      })
      .then(data => {
        setPets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pets:", err);
        setError("Could not load pets at this time.");
        setLoading(false);
      });
  }, []);

  // This simple logic filters the pets based on what the user types in the search bar.
  // It checks the name, breed, and type of the animal.
  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-10 font-semibold">Loading pets...</div>;
  if (error) return <div className="text-center p-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Find Your New Best Friend</h1>
        <p className="text-gray-600">Browse our available pets ready for a loving home.</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name, breed, or type (e.g., Dog)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Grid of Pets */}
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPets.map(pet => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No pets match your search. Try another term!</p>
        </div>
      )}
    </div>
  );
}

export default PetAdoption;
