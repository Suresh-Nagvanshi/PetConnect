import React, { useState, useEffect } from "react";

const Modal = ({ message, onClose }) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.25)", // subtle dark overlay
      backdropFilter: "blur(8px)", // background blur
      WebkitBackdropFilter: "blur(8px)", // Safari support
    }}
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        aria-label="Close modal"
      >
        &times;
      </button>
      <p className="text-center text-lg font-semibold">{message}</p>
    </div>
  </div>
);

function SellerListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    species: "",
    age: "",
    shortDescription: "",
    longDescription: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch animals and bookings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seller = JSON.parse(localStorage.getItem("seller"));
        if (!seller?._id) throw new Error("Seller not logged in");

        const [animalsRes, bookingsRes] = await Promise.all([
          fetch(`/api/pets?seller=${seller._id}`),
          fetch(`/api/bookings/seller/${seller._id}`),
        ]);

        if (!animalsRes.ok || !bookingsRes.ok)
          throw new Error("Failed to fetch data");

        const animalsData = await animalsRes.json();
        const bookingsData = await bookingsRes.json();

        setAnimals(animalsData);
        setBookings(bookingsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Map pet _id to booking info
  const bookingByPetId = bookings.reduce((acc, booking) => {
    acc[booking.pet._id] = booking;
    return acc;
  }, {});

  // Handler to update booking & pet status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      setModalMessage(`Booking ${newStatus}`);
      setModalVisible(true);

      // Reload animals and bookings after update
      const seller = JSON.parse(localStorage.getItem("seller"));
      const [animalsRes, bookingsRes] = await Promise.all([
        fetch(`/api/pets?seller=${seller._id}`),
        fetch(`/api/bookings/seller/${seller._id}`),
      ]);
      setAnimals(await animalsRes.json());
      setBookings(await bookingsRes.json());
    } catch (error) {
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold">List Animals</h1>
          <p className="text-blue-100 mt-1">
            Add animals you want to offer for adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your existing form code can go here if needed */}

          {/* Animals list */}
          <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[80vh]">
            {animals.length === 0 ? (
              <div className="text-gray-500 text-center">No animals listed yet.</div>
            ) : (
              animals.map((a) => {
                const booking = bookingByPetId[a._id];
                return (
                  <div
                    key={a._id || a.id}
                    className="bg-white rounded-2xl shadow border overflow-hidden flex w-full max-w-xl mx-auto"
                  >
                    {a.imageUrls && a.imageUrls.length > 0 && (
                      <img
                        src={`http://localhost:5000/uploads/${a.imageUrls[0]}`}
                        alt={a.petName}
                        className="w-40 h-40 object-cover rounded-l-2xl"
                        style={{ objectFit: "contain", width: "160px", height: "160px" }}
                      />
                    )}

                    <div className="p-4 flex flex-col justify-center flex-1">
                      <h3 className="font-semibold text-xl">
                        {a.petName} <span className="text-gray-400">({a.animalType})</span>
                      </h3>
                      {a.petAge && (
                        <p className="text-sm text-gray-500 mt-1">Age: {a.petAge}</p>
                      )}
                      {a.shortDescription && (
                        <p className="text-gray-700 mt-2 max-w-md">{a.shortDescription}</p>
                      )}

                      {booking ? (
                        <>
                          <p className="mt-2 py-2 border-t border-gray-200 font-semibold">
                            Adoption Request Status:{" "}
                            <span
                              className={
                                booking.status === "accepted"
                                  ? "text-green-600"
                                  : booking.status === "declined"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              }
                            >
                              {booking.status}
                            </span>
                          </p>
                          <p>
                            Requested by: {booking.buyer.firstName} {booking.buyer.lastName}
                          </p>
                          <p>Contact: {booking.buyer.phoneNumber || booking.buyer.email}</p>
                          {booking.status === "pending" && (
                            <div className="space-x-3 mt-3">
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking._id, "accepted")
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking._id, "declined")
                                }
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="mt-2 font-semibold text-green-700">
                          Available for adoption
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {modalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </>
  );
}

export default SellerListAnimals;
