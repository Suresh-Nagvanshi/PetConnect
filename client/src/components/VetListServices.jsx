import React, { useState } from 'react';

function VetListServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', duration: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addService = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) return;
    setServices([...services, { ...form, id: Date.now() }]);
    setForm({ name: '', price: '', duration: '', description: '' });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold">List Services</h1>
        <p className="text-blue-100 mt-1">Add vet care services you provide.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={addService} className="lg:col-span-1 backdrop-blur-md bg-white/90 rounded-2xl p-6 border border-white/30 shadow">
          <h2 className="text-xl font-semibold mb-4">New Service</h2>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          <label className="block text-sm mb-1">Price</label>
          <input name="price" value={form.price} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          <label className="block text-sm mb-1">Duration</label>
          <input name="duration" value={form.duration} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full mb-4 rounded-lg border border-gray-300 p-3"/>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">Add Service</button>
        </form>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No services listed yet.</div>
          )}
          {services.map(s => (
            <div key={s.id} className="backdrop-blur-sm bg-white/90 rounded-2xl p-5 border border-white/30 shadow">
              <h3 className="text-lg font-semibold">{s.name} {s.price && <span className="text-blue-600">₹{s.price}</span>}</h3>
              {s.duration && <p className="text-sm text-gray-500">Duration: {s.duration}</p>}
              {s.description && <p className="text-gray-700 mt-2">{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VetListServices;
