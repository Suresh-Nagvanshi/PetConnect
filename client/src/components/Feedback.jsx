import React, { useState } from 'react';

const StarRating = ({ rating, setRating, error }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex space-x-1 ${error ? 'border-red-500 border rounded-lg p-2' : ''}`}>
      {stars.map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? '#FFD700' : 'none'}
          stroke={star <= rating ? '#FFD700' : 'currentColor'}
          strokeWidth="1.5"
          className="w-8 h-8 cursor-pointer hover:text-amber-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.234 3.793a1 1 0 00.95.69h3.993c.969 0 1.371 1.24.588 1.81l-3.232 2.345a1 1 0 00-.364 1.118l1.234 3.793c.3.922-.755 1.688-1.54 1.118l-3.232-2.345a1 1 0 00-1.175 0l-3.232 2.345c-.784.57-1.838-.196-1.539-1.118l1.233-3.793a1 1 0 00-.364-1.118L2.275 9.22c-.783-.57-.38-1.81.588-1.81h3.993a1 1 0 00.95-.69l1.234-3.793z" />
        </svg>
      ))}
    </div>
  );
};

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    feedback: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Rating is required';
    if (!formData.feedback.trim()) newErrors.feedback = 'Feedback is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setShowModal(true);
          setFormData({ name: '', email: '', rating: 5, feedback: '' });
          setErrors({});
        } else {
          const data = await response.json();
          setApiError(data.error || 'Failed to submit feedback');
        }
      } catch (error) {
        setApiError('Error: ' + error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Blur this container, the page content, when modal shows */}
      <div className={showModal ? 'filter blur-sm' : ''}>
        {/* Hero */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Feedback background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h1 className="text-5xl font-bold mb-4">Feedback</h1>
              <p className="text-lg text-blue-100">Tell us what you think. Your voice helps us improve.</p>
              {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Testimonials */}
          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/30 shadow">
              <p className="text-gray-700 italic">“Adopting through PetConnect was so smooth. Our family is complete!”</p>
              <div className="mt-3 text-sm text-gray-500">— Priya S.</div>
            </div>
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/30 shadow">
              <p className="text-gray-700 italic">“Great support and amazing shelters partnered on the platform.”</p>
              <div className="mt-3 text-sm text-gray-500">— Aarav K.</div>
            </div>
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/30 shadow">
              <p className="text-gray-700 italic">“Found my best friend here. Interface is clean and easy.”</p>
              <div className="mt-3 text-sm text-gray-500">— Meera R.</div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-2 backdrop-blur-sm bg-white/90 rounded-2xl p-8 border border-white/30 shadow">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <StarRating
                  rating={formData.rating}
                  setRating={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                  error={errors.rating}
                />
                {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="6"
                  value={formData.feedback}
                  onChange={handleChange}
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.feedback ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Share your experience..."
                />
                {errors.feedback && <p className="text-red-600 text-sm mt-1">{errors.feedback}</p>}
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal outside blurred container, stays clear */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Thank you for your feedback!</h2>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
