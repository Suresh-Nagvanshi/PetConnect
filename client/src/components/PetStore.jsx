import React, { useEffect, useState } from 'react';

const ProductCard = ({ product, onOpenDetails, onAddToCart, onBuyNow }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(Number(product.price) || 0);

  const coverImage =
    (product.imageUrls && product.imageUrls[0]) ||
    product.imageUrl ||
    'https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image';

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer"
      onClick={() => onOpenDetails(product)}
    >
      <div className="relative">
        <img
          src={coverImage}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full border border-gray-200 bg-white/80 backdrop-blur text-gray-700 text-xs font-medium shadow-sm">
          {product.category || 'general'}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {product.name || 'Unnamed Product'}
          </h3>
          <p className="text-xl font-extrabold text-blue-600 whitespace-nowrap">
            {formattedPrice}
          </p>
        </div>
        {product.description && (
          <p className="text-sm text-gray-600 mt-1 mb-4 flex-grow">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-end mt-auto pt-2">
          <div className="flex items-center gap-2">
            <button
              title="Add to Cart"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="h-10 w-10 grid place-items-center rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <span role="img" aria-label="cart">
                🛒
              </span>
            </button>
            <button
              title="Buy Now"
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(product);
              }}
              className="h-10 w-10 grid place-items-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <span role="img" aria-label="buy">
                ⚡
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PetStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError("Sorry, we couldn't load the products right now.");
        setLoading(false);
      });
  }, []);

  const openDetails = (product) => {
    setSelected(product);
    setActiveImageIdx(0);
  };

  const closeDetails = () => {
    setSelected(null);
    setActiveImageIdx(0);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.product._id === product._id || item.product.id === product.id
      );
      if (index !== -1) {
        const newCart = [...prev];
        newCart[index].quantity += 1;
        return newCart;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter(
        (item) => (item.product._id || item.product.id) !== productId
      )
    );
  };

  const buyNow = (product) => {
    console.log('Buy now:', product._id || product.id);
  };

  const totalPrice = () => {
    return cart.reduce(
      (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
      0
    );
  };

  const buyAll = () => {
    alert(
      `Bought ${cart.length} item(s), total ₹${totalPrice().toLocaleString(
        'en-IN'
      )}`
    );
    setCart([]);
    setCartModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading products...
        </div>
      </div>
    );
  }

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
        {/* Cart button */}
        <div className="flex justify-end mb-4">
          <button
            className="relative bg-white rounded-xl shadow-lg px-4 py-2 flex items-center hover:bg-blue-50 transition-colors"
            title="View cart"
            onClick={() => setCartModalOpen(true)}
          >
            <span role="img" aria-label="cart" className="text-2xl mr-2">
              🛒
            </span>
            <span className="text-sm font-semibold text-gray-700">Cart</span>
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </div>

        {/* Cart modal */}
        {cartModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-6">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Your Cart
              </h2>

              {cart.length === 0 ? (
                <div className="text-center text-gray-600 py-6">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4">Product</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Quantity</th>
                        <th className="py-2 px-4">Total</th>
                        <th className="py-2 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(({ product, quantity }) => (
                        <tr
                          key={product._id || product.id}
                          className="border-b last:border-none"
                        >
                          <td className="py-2 px-4">{product.name}</td>
                          <td className="py-2 px-4">
                            ₹{(Number(product.price) || 0).toLocaleString(
                              'en-IN'
                            )}
                          </td>
                          <td className="py-2 px-4">{quantity}</td>
                          <td className="py-2 px-4">
                            ₹{(
                              (Number(product.price) || 0) * quantity
                            ).toLocaleString('en-IN')}
                          </td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() =>
                                removeFromCart(product._id || product.id)
                              }
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                    <div>Total</div>
                    <div>₹{totalPrice().toLocaleString('en-IN')}</div>
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setCartModalOpen(false)}
                  className="flex-1 py-3 bg-gray-300 rounded-xl hover:bg-gray-400"
                >
                  Cancel
                </button>
                {cart.length > 0 && (
                  <button
                    onClick={buyAll}
                    className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            Explore Our Pet Store
          </h1>
          <p className="text-lg text-gray-600">
            Everything your furry, feathery, or scaly friend could ever want!
          </p>
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onOpenDetails={openDetails}
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              No products found in the store yet!
            </p>
          </div>
        )}

        {/* Details Modal */}
        {selected && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={closeDetails}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-5xl h-[80vh] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="relative bg-gray-50 h-full">
                    {(() => {
                      const images =
                        selected.imageUrls && selected.imageUrls.length > 0
                          ? selected.imageUrls
                          : [
                              selected.imageUrl ||
                                'https://placehold.co/800x600/e2e8f0/4a5568?text=No+Image',
                            ];
                      const current =
                        images[Math.min(activeImageIdx, images.length - 1)];
                      return (
                        <>
                          <img
                            src={current}
                            alt={selected.name}
                            className="w-full h-full object-contain"
                          />
                          {images.length > 1 && (
                            <div className="absolute bottom-3 left-0 right-0 px-4">
                              <div className="bg-white/80 backdrop-blur rounded-xl p-2 grid grid-cols-5 gap-2">
                                {images.slice(0, 5).map((url, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setActiveImageIdx(idx)}
                                    className={`rounded overflow-hidden border ${
                                      idx === activeImageIdx
                                        ? 'ring-2 ring-blue-500'
                                        : ''
                                    }`}
                                  >
                                    <img
                                      src={url}
                                      alt={`thumb-${idx}`}
                                      className="w-full h-16 object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="p-6 flex flex-col h-full overflow-y-auto">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {selected.name}
                        </h3>
                        {selected.category && (
                          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 text-xs font-medium">
                            {selected.category}
                          </div>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-blue-600">
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          minimumFractionDigits: 0,
                        }).format(Number(selected.price) || 0)}
                      </div>
                    </div>
                    {selected.longDescription || selected.description ? (
                      <div className="mt-4 text-gray-700 leading-relaxed">
                        {selected.longDescription || selected.description}
                      </div>
                    ) : null}
                    <div className="h-6"></div>
                    <div className="sticky bottom-0 bg-white pt-4 pb-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => addToCart(selected)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                          <span role="img" aria-label="cart">
                            🛒
                          </span>
                          Add to Cart
                        </button>
                        <button
                          onClick={() => buyNow(selected)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                          <span role="img" aria-label="buy">
                            ⚡
                          </span>
                          Buy Now
                        </button>
                      </div>
                      <button
                        onClick={closeDetails}
                        className="mt-3 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetStore;