import React, { useState, useEffect } from 'react';

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

  // Fetch services and bookings whenever userId or userType changes
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
      if (!res.ok) throw new Error(data.error || 'Failed to fetch bookings');
      setMyBookings(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedService) {
      setError('Please select a service.');
      return;
    }
    if (!appointmentDate) {
      setError('Please select an appointment date.');
      return;
    }
    if (!appointmentTime) {
      setError('Please select an appointment time.');
      return;
    }

    try {
      setLoading(true);
      const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);

      const body = {
        vetId: selectedService.vetId?._id || selectedService.vetId || null,
        serviceId: selectedService._id,
        appointmentTime: appointmentDateTime.toISOString(),
      };

      if (userType === 'buyer') body.buyerId = userId;
      else if (userType === 'seller') body.sellerId = userId;
      else throw new Error('User must be buyer or seller');

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

      fetchMyBookings();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/servicebookings/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete booking');
      }
      setMyBookings(myBookings.filter(b => b._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateStr) => {
    const dateObj = new Date(dateStr);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  };

  // Render component content or no user message
  return (
    <div>
      {!userType ? (
        <div className="text-red-600 p-8 text-center">
          No buyer or seller user logged in.
        </div>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>

          {error && <p className="mb-4 text-red-600">{error}</p>}
          {success && <p className="mb-4 text-green-600">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Select Service</label>
              <select
                value={selectedService ? selectedService._id : ''}
                onChange={e => setSelectedService(services.find(s => s._id === e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={loading}
              >
                <option value="" disabled>Select a service</option>
                {services.map(service => (
                  <option key={service._id} value={service._id}>
                    {service.name} - ₹{service.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Appointment Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={e => setAppointmentDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Appointment Time</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={e => setAppointmentTime(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Your Bookings</h3>
            {myBookings.length === 0 && <p>No bookings made yet.</p>}

            <ul className="space-y-4">
              {myBookings.map(booking => {
                const { date, time } = formatDateTime(booking.appointmentTime);
                return (
                  <li key={booking._id} className="relative border p-4 rounded-lg">
                    <p><strong>Service:</strong> {booking.serviceId?.name || 'N/A'}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`ml-2 font-semibold ${
                          booking.status === 'accepted' ? 'text-green-600' :
                          booking.status === 'declined' ? 'text-red-600' : 'text-yellow-600'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </p>
                    {booking.status === 'declined' && booking.declineReason && (
                      <p className="text-red-600"><strong>Reason:</strong> {booking.declineReason}</p>
                    )}

                    {booking.status === 'declined' && (
                      <button
                        onClick={() => handleDelete(booking._id)}
                        title="Delete booking"
                        disabled={loading}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-2xl font-bold"
                      >
                        &times;
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentBooking;
