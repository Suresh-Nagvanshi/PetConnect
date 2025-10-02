import React, { useState, useEffect, useMemo } from 'react';

function VetAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Memoize vet object from localStorage to prevent useEffect infinite loop
  const vet = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('vet'));
    } catch {
      return null;
    }
  }, []);

  // Fetch appointments for this vet
  useEffect(() => {
    if (!vet?._id) return;

    async function fetchAppointments() {
      setLoading(true);
      try {
        const res = await fetch(`/api/servicebookings/vet-appointments/${vet._id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch appointments');
        }
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [vet]);

  async function updateStatus(id, status) {
    setLoading(true);
    try {
      const body = { status };
      if (status === 'declined') {
        body.declineReason = 'Vet declined the appointment';
      }
      const res = await fetch(`/api/servicebookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      setAppointments(appointments.map(a => (a._id === id ? data : a)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading && <div className="mb-4 text-blue-600">Loading...</div>}

      {appointments.length === 0 && !loading && <div>No appointments found.</div>}

      <ul className="space-y-4">
        {appointments.map((appointment) => {
          const booker = appointment.booker || {};
          const dateTime = new Date(appointment.appointmentTime);
          const formattedDate = dateTime.toLocaleDateString();
          const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <li key={appointment._id} className="border p-4 rounded-lg">
              <p><strong>Booked By:</strong> {booker.firstName} {booker.lastName}</p>
              <p><strong>Service:</strong> {appointment.serviceInfo?.name || 'Unknown'}</p>
              <p><strong>Date:</strong> {formattedDate}</p>
              <p><strong>Time:</strong> {formattedTime}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              {appointment.status === 'pending' && (
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => updateStatus(appointment._id, 'accepted')}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(appointment._id, 'declined')}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Decline
                  </button>
                </div>
              )}
              {appointment.declineReason && appointment.status === 'declined' && (
                <p className="mt-2 text-red-600"><strong>Decline Reason:</strong> {appointment.declineReason}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VetAppointments;
