import React, { useState } from 'react';

function SellerListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({ name: '', species: '', age: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addAnimal = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.species.trim()) return;
    setAnimals([...animals, { ...form, id: Date.now() }]);
    setForm({ name: '', species: '', age: '', description: '' });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold">List Animals</h1>
        <p className="text-blue-100 mt-1">Add animals you want to offer for adoption.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={addAnimal} className="lg:col-span-1 backdrop-blur-md bg-white/90 rounded-2xl p-6 border border-white/30 shadow">
          <h2 className="text-xl font-semibold mb-4">New Animal</h2>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          <label className="block text-sm mb-1">Species</label>
          <input name="species" value={form.species} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          <label className="block text-sm mb-1">Age</label>
          <input name="age" value={form.age} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full mb-4 rounded-lg border border-gray-300 p-3"/>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">Add Animal</button>
        </form>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {animals.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No animals listed yet.</div>
          )}
          {animals.map(a => (
            <div key={a.id} className="backdrop-blur-sm bg-white/90 rounded-2xl p-5 border border-white/30 shadow">
              <h3 className="text-lg font-semibold">{a.name} <span className="text-gray-400">({a.species})</span></h3>
              {a.age && <p className="text-sm text-gray-500">Age: {a.age}</p>}
              {a.description && <p className="text-gray-700 mt-2">{a.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerListAnimals;
