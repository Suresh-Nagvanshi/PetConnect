import React, { useState, useEffect } from 'react';

function SellerListProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ 
    title: '', 
    price: '', 
    stock: '', 
    shortDescription: '',
    longDescription: '',
    imageFiles: [],
    imagePreviewUrls: []
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const revokeAllPreviews = (urls) => {
    urls.forEach(u => {
      try { URL.revokeObjectURL(u); } catch {}
    });
  };

  const handleImageChange = (e) => {
    const filesList = e.target.files ? Array.from(e.target.files) : [];
    if (filesList.length === 0) return;
    // Revoke old previews before setting new ones
    if (form.imagePreviewUrls.length > 0) revokeAllPreviews(form.imagePreviewUrls);
    const previews = filesList.map(f => URL.createObjectURL(f));
    setForm(prev => ({ ...prev, imageFiles: filesList, imagePreviewUrls: previews }));
  };

  useEffect(() => {
    return () => {
      if (form.imagePreviewUrls.length > 0) revokeAllPreviews(form.imagePreviewUrls);
    };
  }, [form.imagePreviewUrls]);

  const addProduct = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price.trim()) return;

    const productToAdd = {
      id: Date.now(),
      title: form.title,
      price: form.price,
      stock: form.stock,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      imageUrls: form.imagePreviewUrls
    };

    setProducts(prev => [...prev, productToAdd]);

    // Reset form
    revokeAllPreviews(form.imagePreviewUrls);
    setForm({ 
      title: '', price: '', stock: '', shortDescription: '', longDescription: '', imageFiles: [], imagePreviewUrls: []
    });
    const inputEl = document.getElementById('productImage');
    if (inputEl) inputEl.value = '';
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold">List Products</h1>
        <p className="text-blue-100 mt-1">Add pet care products for sale.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={addProduct} className="lg:col-span-1 backdrop-blur-md bg-white/90 rounded-2xl p-6 border border-white/30 shadow">
          <h2 className="text-xl font-semibold mb-4">New Product</h2>

          <label className="block text-sm mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>

          <label className="block text-sm mb-1">Price</label>
          <input name="price" value={form.price} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>

          <label className="block text-sm mb-1">Stock</label>
          <input name="stock" value={form.stock} onChange={handleChange} className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>

          <label className="block text-sm mb-1">Short Description</label>
          <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows="2" placeholder="A brief product summary" className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>

          <label className="block text-sm mb-1">Long Description</label>
          <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="4" placeholder="Full product details, usage, etc." className="w-full mb-3 rounded-lg border border-gray-300 p-3"/>

          <label className="block text-sm mb-1">Images</label>
          <input id="productImage" type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full mb-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          {form.imagePreviewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {form.imagePreviewUrls.map((url, idx) => (
                <img key={idx} src={url} alt={`Preview ${idx+1}`} className="w-full h-24 object-cover rounded-lg border"/>
              ))}
            </div>
          )}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">Add Product</button>
        </form>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No products listed yet.</div>
          )}
          {products.map(p => (
            <div key={p.id} className="backdrop-blur-sm bg-white/90 rounded-2xl overflow-hidden border border-white/30 shadow flex flex-col">
              {p.imageUrls && p.imageUrls.length > 0 && (
                <img src={p.imageUrls[0]} alt={p.title} className="w-full h-48 object-cover"/>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold truncate">{p.title}</h3>
                  {p.price && <span className="text-blue-600 font-bold">₹{p.price}</span>}
                </div>
                {p.stock && <p className="text-sm text-gray-500 mt-1">Stock: {p.stock}</p>}
                {p.shortDescription && <p className="text-gray-700 mt-2">{p.shortDescription}</p>}
                {p.longDescription && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{p.longDescription}</p>}
                {p.imageUrls && p.imageUrls.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {p.imageUrls.slice(1, 5).map((url, idx) => (
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

export default SellerListProducts;
