import React, { useEffect, useState } from "react";


const ProductCard = ({ product, onOpenDetails, onAddToCart, onBuyNow }) => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(Number(product.price) || 0);

  const coverImage =
    (product.imageUrls && product.imageUrls[0]) ||
    product.imageUrl ||
    "https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image";

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer"
      onClick={() => onOpenDetails(product)}
    >
      <div className="relative">
        <img src={coverImage} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full border border-gray-200 bg-white/80 backdrop-blur text-gray-700 text-xs font-medium shadow-sm">
          {product.category || "general"}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {product.name || "Unnamed Product"}
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
        <div className="flex items-center justify-end mt-auto pt-2 gap-2">
          {/* Modified "Buy Now" button */}
          <button
            title="Buy Now"
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(product, e.currentTarget);
            }}
            className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            Buy Now
          </button>
          
          <button
            title="Add to Cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e.currentTarget);
            }}
            className="h-9 w-9 grid place-items-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <span role="img" aria-label="cart" className="text-lg">
              🛒
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};


function PetStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", top: 0, left: 0 });
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showBillingSummary, setShowBillingSummary] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Sorry, we couldn't load the products right now.");
        setLoading(false);
      });
  }, []);

  const showToast = (message, targetElement) => {
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 8;
    const left = rect.left + window.scrollX + rect.width / 2;
    setToast({ show: true, message, top, left });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
  };

  const addToCart = (product, targetElement) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => (item.product._id || item.product.id) === (product._id || product.id)
      );
      if (index !== -1) {
        return prev.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast("Added!", targetElement);
  };
  
  // New "Buy Now" logic
  const buyNow = (product, targetElement) => {
    setCart([{ product, quantity: 1 }]);
    setShowCustomerForm(true);
    showToast("Buying now!", targetElement);
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => (item.product._id || item.product.id) !== productId)
    );
  };

  const handleCustomerFormChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleCustomerFormSubmit = (e) => {
    e.preventDefault();
    setShowCustomerForm(false);
    setShowBillingSummary(true);
  };

  const totalPrice = () =>
    cart.reduce(
      (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
      0
    );

  // Cashfree Payment Flow (Working)
  const confirmAndPay = async () => {
    try {
      const orderId = `order_${Date.now()}`;
      const orderAmount = totalPrice();

      const payload = {
        orderId,
        orderAmount,
        customerName: customerDetails.name,
        customerPhone: customerDetails.phone,
        customerEmail: customerDetails.email,
        address: customerDetails.address,
      };

      const res = await fetch("/api/generateOrderToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Payment Link Response:", data);

      if (data && data.paymentLink) {
        // redirect to Cashfree
        window.location.href = data.paymentLink;
      } else {
        alert("Failed to generate payment link. Please try again.");
      }

      setShowBillingSummary(false);
      setCart([]);
      setCartModalOpen(false);
      setCustomerDetails({ name: "", phone: "", email: "", address: "" });
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment. Try again.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading products...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 relative">
      {/* Toast Popup */}
      {toast.show && (
        <div
          className="absolute bg-slate-800 text-white py-2 px-4 rounded-lg shadow-lg z-50"
          style={{ top: `${toast.top}px`, left: `${toast.left}px` }}
        >
          {toast.message}
        </div>
      )}

      {/* Floating Cart Button */}
      <div className="fixed top-28 right-8 z-40">
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

      {/* Cart Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center text-gray-600 py-6">Your cart is empty.</div>
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
                      <tr key={product._id || product.id} className="border-b last:border-none">
                        <td className="py-2 px-4">{product.name}</td>
                        <td className="py-2 px-4">
                          ₹{(Number(product.price) || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="py-2 px-4">{quantity}</td>
                        <td className="py-2 px-4">
                          ₹
                          {((Number(product.price) || 0) * quantity).toLocaleString(
                            "en-IN"
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => removeFromCart(product._id || product.id)}
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
                  <div>₹{totalPrice().toLocaleString("en-IN")}</div>
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
                  onClick={() => {
                    setCartModalOpen(false);
                    setShowCustomerForm(true);
                  }}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Customer Form */}
      {showCustomerForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-transform duration-300 scale-100">
            <button
              onClick={() => setShowCustomerForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              Provide Your Details
            </h2>
            <form onSubmit={handleCustomerFormSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={customerDetails.name}
                  onChange={handleCustomerFormChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={customerDetails.phone}
                  onChange={handleCustomerFormChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={customerDetails.email}
                  onChange={handleCustomerFormChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows="3"
                  value={customerDetails.address}
                  onChange={handleCustomerFormChange}
                  placeholder="Your full address..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomerForm(false)}
                  className="flex-1 py-3 font-semibold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Continue to Billing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Billing Summary */}
      {showBillingSummary && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
            <h2 className="text-xl font-bold mb-4">Billing Summary</h2>
            <div className="mb-2"><strong>Total Products:</strong> {cart.length}</div>
            <div className="mb-2"><strong>Amount:</strong> ₹{totalPrice().toLocaleString("en-IN")}</div>
            <div className="mb-2"><strong>Name:</strong> {customerDetails.name}</div>
            <div className="mb-2"><strong>Phone:</strong> {customerDetails.phone}</div>
            <div className="mb-2"><strong>Email:</strong> {customerDetails.email}</div>
            <div className="mb-4"><strong>Address:</strong> {customerDetails.address}</div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowBillingSummary(false);
                  setShowCustomerForm(true);
                }}
                className="flex-1 py-2 bg-gray-300 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={confirmAndPay}
                className="flex-1 py-2 bg-blue-600 text-white rounded"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Explore Our Pet Store</h1>
          <p className="text-lg text-gray-600">
            Everything your furry, feathery, or scaly friend could ever want!
          </p>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full sm:w-1/4 px-4 py-2 border rounded-lg"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="toy">Toys</option>
            <option value="accessory">Accessories</option>
          </select>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onOpenDetails={() => {}}
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">No products found for your search!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetStore;