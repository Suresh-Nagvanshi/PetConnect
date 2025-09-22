import React, { useState } from 'react';

// --- Helper Components ---
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
          className="w-7 h-7 cursor-pointer text-gray-300 hover:text-amber-400 transition-colors"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.234 3.793a1 1 0 00.95.69h3.993c.969 0 1.371 1.24.588 1.81l-3.232 2.345a1 1 0 00-.364 1.118l1.234 3.793c.3.922-.755 1.688-1.54 1.118l-3.232-2.345a1 1 0 00-1.175 0l-3.232 2.345c-.784.57-1.838-.196-1.539-1.118l1.233-3.793a1 1 0 00-.364-1.118L2.275 9.22c-.783-.57-.38-1.81.588-1.81h3.993a1 1 0 00.95-.69l1.234-3.793z" />
        </svg>
      ))}
    </div>
  );
};

const SuccessModal = ({ setShowModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all animate-fade-in-up">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
        <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Feedback Submitted!</h2>
      <p className="text-gray-600 mb-6">Thank you for helping us improve PetConnect. We value your input!</p>
      <button
        onClick={() => setShowModal(false)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105"
      >
        Done
      </button>
    </div>
  </div>
);

function Feedback() {
  const [formData, setFormData] = useState({ name: '', email: '', rating: 0, feedback: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({...prev, [name]: null}));
  };
  
  const handleRatingChange = (newRating) => {
    setFormData(prev => ({...prev, rating: newRating}));
    if (errors.rating) setErrors(prev => ({...prev, rating: null}));
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.rating) newErrors.rating = 'Please select a star rating';
    if (!formData.feedback.trim()) newErrors.feedback = 'A feedback message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(true);
        setFormData({ name: '', email: '', rating: 0, feedback: '' });
        setErrors({});
      } else {
        const data = await response.json();
        setApiError(data.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      setApiError('Could not connect to the server. Please check your connection.');
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-blue-50">
      <div className={showModal ? 'filter blur-sm' : ''}>
        {/* Full-bleed hero that cancels layout padding */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10 md:py-12 overflow-hidden -mx-6 md:-mx-10 -mt-6 md:-mt-10 rounded-none">
          <div className="absolute inset-0 z-0">
            <img src="https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Feedback background" className="w-full h-full object-cover opacity-50"/>
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Feedback</h1>
              <p className="text-base md:text-lg text-blue-100">Tell us what you think. Your voice helps us improve.</p>
            </div>
          </div>
        </div>
        {/* Tightened section padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4 md:space-y-6">
            <div className="backdrop-blur-sm bg-white/90 rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/30 shadow">
              <p className="text-gray-700 italic">“Adopting through PetConnect was so smooth. Our family is complete!”</p>
              <div className="mt-3 text-sm text-gray-500">— Priya S.</div>
            </div>
            <div className="backdrop-blur-sm bg-white/90 rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/30 shadow">
              <p className="text-gray-700 italic">“Great support and amazing shelters partnered on the platform.”</p>
              <div className="mt-3 text-sm text-gray-500">— Aarav K.</div>
            </div>
             <div className="backdrop-blur-sm bg-white/90 rounded-xl md:rounded-2xl p-5 md:p-6 border border-white/30 shadow">
              <p className="text-gray-700 italic">“Found my best friend here. Interface is clean and easy.”</p>
              <div className="mt-3 text-sm text-gray-500">— Meera R.</div>
            </div>
          </div>
          <div className="lg:col-span-2 backdrop-blur-sm bg-white/90 rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/30 shadow">
            {apiError && <p className="text-red-600 mb-4 text-center">{apiError}</p>}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Your name"/>
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="you@example.com"/>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <StarRating rating={formData.rating} setRating={handleRatingChange} error={errors.rating}/>
                {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea id="feedback" name="feedback" rows="6" value={formData.feedback} onChange={handleChange} className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.feedback ? 'border-red-500' : 'border-gray-300'}`} placeholder="Share your experience..."/>
                {errors.feedback && <p className="text-red-600 text-sm mt-1">{errors.feedback}</p>}
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal setShowModal={setShowModal} />}
       <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Feedback;

