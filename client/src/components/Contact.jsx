import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  // Validation function
  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email) errors.email = 'Email is required';
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email))
      errors.email = 'Invalid email format';
    if (!form.subject.trim()) errors.subject = 'Subject is required';
    if (!form.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  // Handle changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear specific error on input change
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErrs = validate();
    if (Object.keys(valErrs).length > 0) {
      setErrors(valErrs);
      return;
    }
    setSubmitStatus('Sending...');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('Message sent!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('Send failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('Error connecting to server.');
    }
  };

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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                name="subject"
                type="text"
                placeholder="How can we help?"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="6"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </div>
            {submitStatus && <div className="md:col-span-2 text-center mt-3 text-blue-600">{submitStatus}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
