import React, { useState } from 'react';

function SellerListProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', stock: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const addProduct = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price.trim()) return;
    setProducts([...products, { ...form, id: Date.now() }]);
    setForm({ title: '', price: '', stock: '', description: '' });
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
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full mb-4 rounded-lg border border-gray-300 p-3"/>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">Add Product</button>
        </form>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No products listed yet.</div>
          )}
          {products.map(p => (
            <div key={p.id} className="backdrop-blur-sm bg-white/90 rounded-2xl p-5 border border-white/30 shadow">
              <h3 className="text-lg font-semibold">{p.title} {p.price && <span className="text-blue-600">₹{p.price}</span>}</h3>
              {p.stock && <p className="text-sm text-gray-500">Stock: {p.stock}</p>}
              {p.description && <p className="text-gray-700 mt-2">{p.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerListProducts;
