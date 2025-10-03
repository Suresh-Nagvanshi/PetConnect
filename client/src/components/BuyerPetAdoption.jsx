import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AuthContext } from "./AuthContext";

// Modal
const Modal = ({ message, onClose }) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        aria-label="Close modal"
      >
        &times;
      </button>
      <p className="text-center text-lg font-semibold">{message}</p>
    </div>
  </div>
);

// Pet Card with status and optional delete icon
const PetCard = ({ pet, booking, onBook, onDelete }) => {
  const canBook = pet.status === "available" && !booking;
  const isBooked = booking && booking.status === "accepted";
  const isDeclined = booking && booking.status === "declined";
  const isPending = booking && booking.status === "pending";
  const locationUrl =
    pet.seller?.latitude && pet.seller?.longitude
      ? `https://www.openstreetmap.org/?mlat=${pet.seller.latitude}&mlon=${pet.seller.longitude}#map=15/${pet.seller.latitude}/${pet.seller.longitude}`
      : null;

  return (
    <div className="bg-white rounded-lg shadow-md relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Delete icon for declined bookings */}
      {isDeclined && (
        <button
          style={{
            position: "absolute", top: 10, right: 14, zIndex: 30,
          }}
          className="text-red-600 hover:text-red-800 text-2xl font-bold"
          onClick={() => onDelete(pet._id)}
          title="Delete this card"
        >
          &times;
        </button>
      )}
      <img
        src={
          pet.imageUrls && pet.imageUrls.length > 0
            ? `http://localhost:5000/uploads/${pet.imageUrls[0]}`
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={pet.petName}
        className="w-full h-60 object-cover object-contain"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold truncate">{pet.petName}</h3>
        <p className="text-gray-600">{pet.animalType}</p>
        {pet.seller && (
          <p className="text-gray-500 mb-1">
            Seller: {pet.seller.firstName} {pet.seller.lastName}
          </p>
        )}
        <p className="mt-2 text-gray-700">{pet.shortDescription}</p>
        {locationUrl && (
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-3 inline-block"
          >
            View Location
          </a>
        )}
        {/* Status Buttons */}
        {booking ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            {isBooked && (
              <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold cursor-not-allowed">
                Booked
              </button>
            )}
            {isPending && (
              <span className="bg-yellow-500 text-white px-4 py-2 rounded font-semibold">
                Pending
              </span>
            )}
            {isDeclined && (
              <span className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
                Declined
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => onBook(pet._id)}
            disabled={!canBook}
            className={`mt-4 w-full py-2 rounded-md text-white ${
              canBook
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {canBook ? "Book Now" : "Not Available"}
          </button>
        )}
      </div>
    </div>
  );
};

const BuyerPetAdoption = () => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [removedPetIds, setRemovedPetIds] = useState([]);

  // Get buyer id
  const buyerId = user?._id || null;

  useEffect(() => {
    fetchPets();
    fetchMyBookings();
    // eslint-disable-next-line
  }, []);

  const fetchPets = () => {
    setLoading(true);
    fetch("/api/pets")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pets");
        return res.json();
      })
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load pets at this time.");
        setLoading(false);
      });
  };

  const fetchMyBookings = () => {
    if (!buyerId) return;
    fetch(`/api/bookings/buyer/${buyerId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then(setBookings)
      .catch(() => {});
  };

  // Map of petId -> buyer's booking
  const myBookingMap = bookings.reduce((acc, b) => {
    acc[b.pet._id] = b;
    return acc;
  }, {});

  // Pet delete handler for declined status, only hides from UI
  const handleDeleteCard = (petId) => {
    setRemovedPetIds([...removedPetIds, petId]);
    // Optionally: call backend API to delete the booking/request
  };

  // Filter out removed/declined pet cards, plus search filter
  const filteredPets = pets
    .filter((pet) => !removedPetIds.includes(pet._id))
    .filter(
      (pet) =>
        (pet.petName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (pet.animalType?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

  // Booking request handler
  const handleBook = async (petId) => {
    if (!buyerId) {
      setModalMessage("You must be logged in to book a pet.");
      setModalVisible(true);
      return;
    }
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId, buyerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setModalMessage("Successfully booked pet!");
      setModalVisible(true);
      fetchPets();
      fetchMyBookings();
    } catch (err) {
      setModalMessage(err.message);
      setModalVisible(true);
    }
  };

  const closeModal = () => setModalVisible(false);

  if (loading) return <div className="p-10 text-center">Loading pets...</div>;
  if (error)
    return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Find Your New Best Friend
      </h1>
      <input
        type="text"
        placeholder="Search by name or animal type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block mx-auto mb-10 px-4 py-3 border rounded-md w-full max-w-xl focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard
              key={pet._id}
              pet={pet}
              booking={myBookingMap[pet._id]}
              onBook={handleBook}
              onDelete={handleDeleteCard}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No pets found matching your criteria.
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        See All Pets on the Map
      </h2>
      <MapContainer
        center={[20, 77]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPets.map(
          (pet) =>
            pet.seller?.latitude &&
            pet.seller?.longitude && (
              <Marker
                key={pet._id}
                position={[pet.seller.latitude, pet.seller.longitude]}
              >
                <Popup>
                  <strong>{pet.petName}</strong>
                  <br />
                  {pet.animalType}
                  <br />
                  {pet.seller && (
                    <>
                      Seller: {pet.seller.firstName} {pet.seller.lastName}
                      <br />
                    </>
                  )}
                  Location: {pet.seller.city}, {pet.seller.state}
                  <br />
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${pet.seller.latitude}&mlon=${pet.seller.longitude}#map=15/${pet.seller.latitude}/${pet.seller.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Location
                  </a>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>

      <div className="max-w-xl mx-auto my-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Your Adoption Requests
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">
            No adoption requests made yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="p-4 rounded border flex items-center justify-between bg-white shadow"
              >
                <span>
                  <strong>{booking.pet.petName}</strong> <span className="text-gray-600">({booking.pet.animalType})</span>
                </span>
                <span
                  className={`font-semibold ${
                    booking.status === "accepted"
                      ? "text-green-600"
                      : booking.status === "declined"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default BuyerPetAdoption;
