import React from 'react';

function Feedback() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-blue-50">
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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>5 - Excellent</option>
                <option>4 - Good</option>
                <option>3 - Average</option>
                <option>2 - Poor</option>
                <option>1 - Very Poor</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
              <textarea rows="6" className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Share your experience..." />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
