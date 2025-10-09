import React, { useState, useEffect } from "react";
import { FaPlus, FaCheck, FaTimes } from 'react-icons/fa';

const Modal = ({ message, onClose }) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
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
    petName: "",
    animalType: "",
    petAge: "",
    shortDescription: "",
    longDescription: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const fileReaders = [];
    const urls = [];

    files.forEach((file, i) => {
      const reader = new FileReader();
      fileReaders.push(reader);
      reader.onload = (ev) => {
        urls[i] = ev.target.result;
        if (urls.filter(Boolean).length === files.length) {
          setImagePreviewUrls(urls);
        }
      };
      reader.readAsDataURL(file);
    });

    if (!files.length) setImagePreviewUrls([]);
  };

  useEffect(() => {
    fetchAnimalsAndBookings();
  }, []);

  const fetchAnimalsAndBookings = async () => {
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
      setModalMessage(err.message || "Error loading data");
      setModalVisible(true);
    }
  };

  const bookingByPetId = bookings.reduce((acc, booking) => {
    acc[booking.pet._id] = booking;
    return acc;
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const seller = JSON.parse(localStorage.getItem("seller"));
      if (!seller?._id) throw new Error("Seller not logged in");

      const formData = new FormData();
      formData.append("petName", form.petName);
      formData.append("animalType", form.animalType);
      formData.append("petAge", form.petAge);
      formData.append("shortDescription", form.shortDescription);
      formData.append("longDescription", form.longDescription);
      formData.append("seller", seller._id);
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/pets", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to list animal");
      }

      setModalMessage("Animal listed successfully!");
      setModalVisible(true);
      setForm({
        petName: "",
        animalType: "",
        petAge: "",
        shortDescription: "",
        longDescription: "",
      });
      setImageFiles([]);
      setImagePreviewUrls([]);
      fetchAnimalsAndBookings();
    } catch (error) {
      setModalMessage(error.message);
      setModalVisible(true);
    }
    setLoading(false);
  };

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

      await fetchAnimalsAndBookings();
    } catch (error) {
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl mb-8">
          <h1 className="text-4xl font-extrabold">Your Animal Listings</h1>
          <p className="text-purple-100 mt-2">
            Add, view, and manage the animals you have for adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <form
              className="bg-white rounded-xl shadow-lg p-6 space-y-5"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">List a New Animal</h2>
              <div>
                <label className="font-medium text-gray-700 block mb-1">Pet Name</label>
                <input
                  type="text"
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 block mb-1">Animal Type</label>
                <input
                  type="text"
                  name="animalType"
                  value={form.animalType}
                  onChange={handleChange}
                  placeholder="e.g. Dog, Cat"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 block mb-1">Pet Age</label>
                <input
                  type="number"
                  min="0"
                  name="petAge"
                  value={form.petAge}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 block mb-1">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 block mb-1">Long Description</label>
                <textarea
                  name="longDescription"
                  rows="3"
                  value={form.longDescription}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-shadow"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 block mb-1">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {imagePreviewUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {imagePreviewUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-md border-2 border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-purple-700 transition-transform transform hover:scale-105 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <FaPlus />
                {loading ? "Listing..." : "List Animal"}
              </button>
            </form>
          </div>

          {/* Right Column: Animal List */}
          <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[80vh] p-2">
            {animals.length === 0 ? (
              <div className="text-gray-500 text-center py-10">
                <p>No animals listed yet.</p>
                <p className="text-sm">Use the form on the left to add your first one!</p>
              </div>
            ) : (
              animals.map((a) => {
                const booking = bookingByPetId[a._id];
                return (
                  <div
                    key={a._id || a.id}
                    className="bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col md:flex-row w-full mx-auto transition-shadow hover:shadow-xl"
                  >
                    {a.imageUrls && a.imageUrls.length > 0 && (
                      <img
                        src={`http://localhost:5000/uploads/${a.imageUrls[0]}`}
                        alt={a.petName}
                        className="w-full md:w-48 h-48 object-cover"
                      />
                    )}

                    <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="font-bold text-2xl text-gray-800">
                                {a.petName}{" "}
                                <span className="text-gray-500 font-medium text-lg">({a.animalType})</span>
                            </h3>
                            {a.petAge && (
                                <p className="text-sm text-gray-500 mt-1">Age: {a.petAge}</p>
                            )}
                            {a.shortDescription && (
                                <p className="text-gray-700 mt-2">{a.shortDescription}</p>
                            )}
                        </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                      {a.status === "sold" ? (
                        <p className="font-semibold text-red-600">Adopted</p>
                      ) : booking ? (
                        <>
                          <div className="flex justify-between items-center">
                            <p className="font-semibold">Adoption Request:</p>
                            <span
                              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                                booking.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "declined"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Requested by: {booking.buyer.firstName} {booking.buyer.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Contact: {booking.buyer.phoneNumber || booking.buyer.email}
                          </p>
                          {booking.status === "pending" && (
                            <div className="flex gap-3 mt-3">
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking._id, "accepted")
                                }
                                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                              >
                                <FaCheck /> Accept
                              </button>
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking._id, "declined")
                                }
                                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                              >
                               <FaTimes /> Decline
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="font-semibold text-green-700">
                          Available for adoption
                        </p>
                      )}
                      </div>
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