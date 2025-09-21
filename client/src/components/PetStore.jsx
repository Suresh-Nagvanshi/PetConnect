import React, { useEffect, useState } from 'react';

function PetStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24"> {/* Added padding top (pt-24) to avoid navbar overlap */}
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-yellow-600 drop-shadow-lg mb-3" style={{ textShadow: "1px 1px 6px #00000033" }}>
          Pet Store
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto font-medium">
          Discover the best pet foods and accessories rated by pet lovers like you!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer bg-white">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="mt-2 font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetStore;
