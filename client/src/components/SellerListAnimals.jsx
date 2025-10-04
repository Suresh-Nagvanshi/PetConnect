import React, { useState, useEffect } from "react";

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
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold">List Animals</h1>
          <p className="text-blue-100 mt-1">
            Add animals you want to offer for adoption.
          </p>
        </div>

        <form
          className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col space-y-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label className="font-medium block mb-1">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={form.petName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Animal Type</label>
            <input
              type="text"
              name="animalType"
              value={form.animalType}
              onChange={handleChange}
              placeholder="e.g. Dog, Cat"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Pet Age</label>
            <input
              type="number"
              min="0"
              name="petAge"
              value={form.petAge}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Long Description</label>
            <textarea
              name="longDescription"
              rows="3"
              value={form.longDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="w-full"
            />
            {imagePreviewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviewUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Preview"
                    style={{ width: 72, height: 72, objectFit: "cover" }}
                    className="rounded border"
                  />
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded font-semibold mt-4 hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Listing..." : "List Animal"}
          </button>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                      {a.status === "sold" ? (
                        <p className="mt-2 font-semibold text-red-600">Adopted</p>
                      ) : booking ? (
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
