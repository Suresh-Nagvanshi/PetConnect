import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/5732933/pexels-photo-5732933.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Contact background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-blue-100">We'd love to hear from you. Reach out with any questions or feedback.</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Cards */}
        <div className="space-y-6">
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-white/30 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">support@petconnect.com</p>
          </div>
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-white/30 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+91 9876543210</p>
          </div>
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-white/30 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600">Ghaziabad, India</p>
          </div>
        </div>

        {/* Form */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help?" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows="6" className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your message..." />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
