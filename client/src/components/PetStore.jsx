import React, { useEffect, useState } from 'react';

// --- Sub-Component: ProductCard ---
// This is a modular card. Its only job is to display one product.
// This keeps our main component clean and is a great practice in React.
const ProductCard = ({ product }) => {
  
  // This is a simple but powerful JavaScript feature for formatting numbers.
  // It automatically adds the Rupee symbol and commas for us.
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(product.price || 0); // We add '|| 0' as a fallback in case a price is missing.

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="relative">
        <img 
          src={product.imageUrl || 'https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image'} 
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
        {/* We can add a little category tag for extra style */}
        <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-xs">
          {product.category || 'General'}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 truncate">{product.name || 'Unnamed Product'}</h3>
        {/* This simple logic checks if a description exists before trying to show it. */}
        {product.description && (
          <p className="text-sm text-gray-600 mt-1 mb-4 flex-grow">{product.description}</p>
        )}
        <div className="flex justify-between items-center mt-auto pt-4">
          <p className="text-xl font-extrabold text-blue-600">{formattedPrice}</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 group-hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main PetStore Component ---
function PetStore() {
  // Your existing logic for fetching data is perfect, so we keep it!
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setError("Sorry, we couldn't load the products right now.");
        setLoading(false);
      });
  }, []);

  // A simple loading state for a better user experience.
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl font-semibold text-gray-600">Loading products...</div>
        </div>
    );
  }

  // A simple error state.
  if (error) {
     return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl font-semibold text-red-600">{error}</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        {/* A more vibrant header section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            Explore Our Pet Store
          </h1>
          <p className="text-lg text-gray-600">Everything your furry, feathery, or scaly friend could ever want!</p>
        </div>

        {/* The products grid, now powered by your MongoDB data! */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-lg text-gray-500">No products found in the store yet!</p>
            </div>
        )}
        
      </div>
    </div>
  );
}

export default PetStore;

