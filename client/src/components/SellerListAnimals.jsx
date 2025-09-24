import React, { useState, useEffect } from 'react';

function SellerListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({ 
    name: '', 
    species: '', 
    age: '', 
    shortDescription: '', 
    longDescription: '' 
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const revokeAllPreviews = (urls) => {
    urls.forEach(u => {
      try { URL.revokeObjectURL(u); } catch {}
    });
  };

  const handleImageChange = (e) => {
    const filesList = e.target.files ? Array.from(e.target.files) : [];
    if (filesList.length === 0) return;
    if (imagePreviewUrls.length > 0) revokeAllPreviews(imagePreviewUrls);
    const previews = filesList.map(f => URL.createObjectURL(f));
    setImageFiles(filesList);
    setImagePreviewUrls(previews);
  };

  useEffect(() => {
    return () => {
      if (imagePreviewUrls.length > 0) revokeAllPreviews(imagePreviewUrls);
    };
  }, [imagePreviewUrls]);

  const addAnimal = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.species.trim()) return;

    const imageUrls = imagePreviewUrls;

    setAnimals([...animals, { ...form, id: Date.now(), imageUrls }]);
    
    // Reset the form and the image file state
    setForm({ name: '', species: '', age: '', shortDescription: '', longDescription: '' });
    if (imagePreviewUrls.length > 0) revokeAllPreviews(imagePreviewUrls);
    setImageFiles([]);
    setImagePreviewUrls([]);
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
          
          <label className="block text-sm mb-1">Images</label>
          <input id="animalImage" type="file" name="image" accept="image/*" multiple onChange={handleImageChange} className="w-full mb-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>

          {imagePreviewUrls.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {imagePreviewUrls.map((url, idx) => (
                <img key={idx} src={url} alt={`Preview ${idx+1}`} className="w-full h-24 object-cover rounded-lg border"/>
              ))}
            </div>
          )}
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">Add Animal</button>
        </form>
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {animals.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No animals listed yet.</div>
          )}
          {animals.map(a => (
            <div key={a.id} className="backdrop-blur-sm bg-white/90 rounded-2xl overflow-hidden border border-white/30 shadow">
              {a.imageUrls && a.imageUrls.length > 0 && (
                <img src={a.imageUrls[0]} alt={a.name} className="w-full h-48 object-cover"/>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold">{a.name} <span className="text-gray-400">({a.species})</span></h3>
                {a.age && <p className="text-sm text-gray-500">Age: {a.age}</p>}
                {a.shortDescription && <p className="text-gray-700 mt-2">{a.shortDescription}</p>}
                {a.imageUrls && a.imageUrls.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {a.imageUrls.slice(1, 5).map((url, idx) => (
                      <img key={idx} src={url} alt={`Thumb ${idx+2}`} className="w-full h-16 object-cover rounded border"/>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerListAnimals;