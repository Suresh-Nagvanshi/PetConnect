import React, { useState, useEffect } from 'react';

// Small field component for consistency
const Field = ({ id, label, type = 'text', value, onChange, disabled }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100 text-gray-500' : 'border-gray-300'}`}
    />
  </div>
);

function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    houseNo: '',
    city: '',
    pincode: '',
    district: '',
    state: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    try {
      const buyerData = JSON.parse(localStorage.getItem('buyer'));
      if (buyerData) {
        setFormData({
          firstName: buyerData.firstName || '',
          lastName: buyerData.lastName || '',
          email: buyerData.email || '',
          phone: buyerData.phone || '',
          houseNo: buyerData.houseNo || '',
          city: buyerData.city || '',
          pincode: buyerData.pincode || '',
          district: buyerData.district || '',
          state: buyerData.state || ''
        });
      }
    } catch (error) {
      console.error('Failed to parse buyer data from localStorage', error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated data to send to server:', formData);
    setStatusMessage('Profile updated successfully!');
    const buyerData = JSON.parse(localStorage.getItem('buyer'));
    localStorage.setItem('buyer', JSON.stringify({ ...buyerData, ...formData }));
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Edit Your Profile</h1>
          <p className="text-gray-500 mt-2">Keep your information up to date.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Details */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
              <Field id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
              <Field id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} disabled />
              <Field id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
          </section>

          {/* Address */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Field id="houseNo" label="House No. / Street" value={formData.houseNo} onChange={handleChange} />
              </div>
              <Field id="city" label="City" value={formData.city} onChange={handleChange} />
              <Field id="pincode" label="Pincode" value={formData.pincode} onChange={handleChange} />
              <Field id="district" label="District" value={formData.district} onChange={handleChange} />
              <Field id="state" label="State" value={formData.state} onChange={handleChange} />
            </div>
          </section>

          <div className="flex justify-end items-center gap-4">
            {statusMessage && <p className="text-green-700 font-semibold">{statusMessage}</p>}
            <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
