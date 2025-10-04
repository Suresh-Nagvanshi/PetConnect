import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "./AuthContext"; 

function AppointmentBooking() {
  // Get user information from localStorage
  const buyer = JSON.parse(localStorage.getItem('buyer'));
  const seller = JSON.parse(localStorage.getItem('seller'));
  const userId = buyer?._id || seller?._id;
  const userType = buyer ? 'buyer' : seller ? 'seller' : null;

  // React states
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  // Fetch services and bookings on component mount
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => setError('Failed to load services'));

    if (userId && userType) {
      fetchMyBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userType]);

  const fetchMyBookings = async () => {
    try {
      const endpoint = userType === 'buyer'
        ? `/api/servicebookings/buyer-appointments/${userId}`
        : `/api/servicebookings/seller-appointments/${userId}`;

      const res = await fetch(endpoint);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch your bookings');
      setMyBookings(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedService || !appointmentDate || !appointmentTime) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);
      const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);
      const body = {
        vetId: selectedService.vetId?._id || selectedService.vetId,
        serviceId: selectedService._id,
        appointmentTime: appointmentDateTime.toISOString(),
        ...(userType === 'buyer' && { buyerId: userId }),
        ...(userType === 'seller' && { sellerId: userId }),
      };

      const res = await fetch('/api/servicebookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create booking');

      setSuccess('Appointment booked successfully!');
      setSelectedService(null);
      setAppointmentDate('');
      setAppointmentTime('');
      fetchMyBookings(); // Refresh bookings list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/servicebookings/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete booking');
      }
      setMyBookings(myBookings.filter(b => b._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDateTime = (dateStr) => {
    const dateObj = new Date(dateStr);
    return {
      date: dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
      time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
            <p className="text-gray-600">You must be logged in as a buyer or seller to book appointments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- BOOKING FORM CARD --- */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
                        <h2 className="text-2xl font-bold">Book a Vet Appointment</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                            <select
                                value={selectedService ? selectedService._id : ''}
                                onChange={e => setSelectedService(services.find(s => s._id === e.target.value))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                disabled={loading}
                            >
                                <option value="" disabled>Select a service...</option>
                                {services.map(service => (
                                    <option key={service._id} value={service._id}>
                                        {service.name} - ₹{service.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={appointmentDate}
                                onChange={e => setAppointmentDate(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="time"
                                value={appointmentTime}
                                onChange={e => setAppointmentTime(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </form>
                </div>
            </div>

            {/* --- MY BOOKINGS CARD --- */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Appointments</h3>
                    {myBookings.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">You have no upcoming appointments.</p>
                    ) : (
                        <ul className="space-y-4">
                            {myBookings.map(booking => {
                                const { date, time } = formatDateTime(booking.appointmentTime);
                                return (
                                    <li key={booking._id} className="relative border border-gray-200 p-4 rounded-lg bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-lg text-gray-800">{booking.serviceId?.name || 'N/A'}</p>
                                                <p className="text-sm text-gray-500">with Dr. {booking.vetId?.firstName || 'N/A'}</p>
                                                <p className="text-sm text-gray-700 mt-2">{date} at {time}</p>
                                                {booking.status === 'declined' && booking.declineReason && (
                                                    <p className="text-sm text-red-600 mt-1"><strong>Reason:</strong> {booking.declineReason}</p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`font-semibold text-xs px-2.5 py-1 rounded-full ${
                                                    booking.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                                {booking.status === 'declined' && (
                                                    <button
                                                        onClick={() => handleDelete(booking._id)}
                                                        title="Delete this booking"
                                                        className="text-red-500 hover:text-red-700 text-xl font-bold mt-2"
                                                        style={{ marginLeft: "8px" }}
                                                    >
                                                        &times;
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default AppointmentBooking;
