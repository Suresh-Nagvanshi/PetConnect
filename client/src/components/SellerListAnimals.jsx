import React, { useState } from 'react';

function SellerListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({ 
    name: '', 
    species: '', 
    age: '', 
    shortDescription: '', 
    longDescription: '' 
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    // Check if the user has selected a file
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const addAnimal = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.species.trim()) return;

    // Create a local URL for the image so we can preview it instantly
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;

    setAnimals([...animals, { ...form, id: Date.now(), imageUrl }]);
    
    // Reset the form and the image file state
    setForm({ name: '', species: '', age: '', shortDescription: '', longDescription: '' });
    setImageFile(null);
    // Also reset the file input field visually
    document.getElementById('animalImage').value = ''; 
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
          
          <label className="block text-sm mb-1">Short Description</label>
          <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows="2" placeholder="A brief, catchy summary" className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          
          <label className="block text-sm mb-1">Long Description</label>
          <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="4" placeholder="Full details about personality, habits, etc." className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>
          
          <label className="block text-sm mb-1">Image</label>
          <input id="animalImage" type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full mb-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">Add Animal</button>
        </form>
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {animals.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No animals listed yet.</div>
          )}
          {animals.map(a => (
            <div key={a.id} className="backdrop-blur-sm bg-white/90 rounded-2xl overflow-hidden border border-white/30 shadow">
              {a.imageUrl && (
                <img src={a.imageUrl} alt={a.name} className="w-full h-48 object-cover"/>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold">{a.name} <span className="text-gray-400">({a.species})</span></h3>
                {a.age && <p className="text-sm text-gray-500">Age: {a.age}</p>}
                {a.shortDescription && <p className="text-gray-700 mt-2">{a.shortDescription}</p>}
                {/* You could optionally add a button to show the long description */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerListAnimals;