import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet'; // Import Leaflet for custom icons
import { AuthContext } from "./AuthContext";

// --- HELPER & UI COMPONENTS ---

// Generic Card component for consistent styling
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
    {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
    {children}
  </div>
);

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


// --- UI SKELETON COMPONENTS ---

const PetCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-52 bg-slate-200"></div>
        <div className="p-4">
            <div className="h-6 w-3/4 rounded bg-slate-200 mb-2"></div>
            <div className="h-4 w-1/2 rounded bg-slate-200 mb-4"></div>
            <div className="h-10 w-full rounded bg-slate-200 mt-6"></div>
        </div>
    </div>
);

const MapSkeleton = () => (
    <Card title="See All Pets on the Map" className="lg:col-span-2">
        <div className="bg-slate-200 rounded-lg h-[450px] w-full animate-pulse"></div>
    </Card>
);

const RequestsSkeleton = () => (
    <Card title="Your Adoption Requests" className="lg:col-span-1">
        <div className="space-y-3 animate-pulse">
            <div className="h-12 bg-slate-200 rounded-lg"></div>
            <div className="h-12 bg-slate-200 rounded-lg"></div>
            <div className="h-12 bg-slate-200 rounded-lg"></div>
        </div>
    </Card>
);


// --- PET CARD COMPONENT ---

const PetCard = ({ pet, booking, onBook, onDelete }) => {
    const canBook = pet.status === "available" && !booking;
    const isDeclined = booking && booking.status === "declined";
    const isBooked = booking && booking.status === "accepted";
    const isPending = booking && booking.status === "pending";

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-200 flex flex-col">
            {isDeclined && (
                <button
                    style={{ position: "absolute", top: 10, right: 14, zIndex: 30 }}
                    className="text-red-600 hover:text-red-800 text-2xl font-bold"
                    onClick={() => onDelete(pet._id)}
                    title="Remove this booking"
                >
                    &times;
                </button>
            )}
            <div className="w-full h-52">
                <img
                    src={pet.imageUrls?.[0] ? `http://localhost:5000/uploads/${pet.imageUrls[0]}` : "https://placehold.co/600x400?text=Pet+Image"}
                    alt={pet.petName}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{pet.petName}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {pet.animalType}
                    </span>
                </div>
                {pet.seller && (
                    <p className="text-sm text-gray-500 mb-3">
                        By: {pet.seller.firstName} {pet.seller.lastName}
                    </p>
                )}
                <p className="text-gray-700 text-sm flex-grow line-clamp-2">{pet.shortDescription}</p>
                <div className="mt-auto pt-4">
                    {booking ? (
                         <div className="flex items-center justify-center font-semibold py-2 rounded-md text-white" style={{
                            backgroundColor: isBooked ? '#16a34a' : isPending ? '#f59e0b' : '#dc2626'
                         }}>
                            {isBooked ? "Accepted" : isPending ? "Pending" : "Declined"}
                         </div>
                    ) : (
                        <button
                            onClick={() => onBook(pet._id)}
                            disabled={!canBook}
                            className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${
                            canBook ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {canBook ? "Request to Adopt" : "Not Available"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- MAIN ADOPTION PAGE COMPONENT ---

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
    
    const petIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/12/12638.png',
        iconSize: [35, 35],
    });

    const buyerId = user?._id || null;

    useEffect(() => {
        // Mock loading time to see skeleton state
        // setTimeout(() => {
            fetchPets();
            fetchMyBookings();
        // }, 2000); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          setModalMessage("Successfully requested adoption!");
          setModalVisible(true);
          fetchPets(); // Refresh data
          fetchMyBookings(); // Refresh data
        } catch (err) {
          setModalMessage(err.message);
          setModalVisible(true);
        }
      };

    const myBookingMap = bookings.reduce((acc, b) => ({ ...acc, [b.pet._id]: b }), {});
    const handleDeleteCard = (petId) => setRemovedPetIds([...removedPetIds, petId]);
    const filteredPets = pets
        .filter((pet) => !removedPetIds.includes(pet._id))
        .filter(pet =>
            (pet.petName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (pet.animalType?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    const closeModal = () => setModalVisible(false);

    // --- RENDER LOGIC ---

    if (error) {
        return (
            <div className="bg-slate-100 min-h-screen p-8 flex items-center justify-center">
                 <Card className="text-center">
                    <h3 className="text-2xl font-bold text-red-600">Something Went Wrong</h3>
                    <p className="text-red-500 mt-2">{error}</p>
                 </Card>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="bg-slate-100 min-h-screen">
                <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                    {/* Header & Search Skeleton */}
                    <Card>
                        <h1 className="text-4xl font-extrabold text-center text-gray-800">
                            Find Your Best Friend
                        </h1>
                        <div className="mt-6 max-w-2xl mx-auto h-12 rounded-lg bg-slate-200 animate-pulse"></div>
                    </Card>

                    {/* Pet Listings Skeleton */}
                    <Card>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => <PetCardSkeleton key={i} />)}
                        </div>
                    </Card>

                    {/* Map & Adoption Requests Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <MapSkeleton />
                        <RequestsSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                {/* --- HEADER & SEARCH CARD --- */}
                <Card>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800">
                        Find Your Best Friend
                    </h1>
                    <div className="relative mt-6 max-w-2xl mx-auto">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                             </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name or animal type (e.g. 'Buddy' or 'Dog')"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </Card>
                
                {/* --- PET LISTINGS CARD --- */}
                <Card>
                    {filteredPets.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredPets.map((pet) => (
                                <PetCard
                                    key={pet._id}
                                    pet={pet}
                                    booking={myBookingMap[pet._id]}
                                    onBook={handleBook}
                                    onDelete={handleDeleteCard}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-xl font-semibold text-gray-800">No Pets Found</h3>
                            <p className="mt-1 text-gray-500">Try adjusting your search or check back later!</p>
                        </div>
                    )}
                </Card>

                {/* --- MAP & ADOPTION REQUESTS (in a grid) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card title="See All Pets on the Map" className="lg:col-span-2">
                        <MapContainer
                            center={[20.5937, 78.9629]} // Centered on India
                            zoom={5}
                            style={{ height: "450px", width: "100%" }}
                            className="rounded-lg"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {filteredPets.map(
                                (pet) =>
                                pet.seller?.latitude && pet.seller?.longitude && (
                                    <Marker
                                        key={pet._id}
                                        position={[pet.seller.latitude, pet.seller.longitude]}
                                        icon={petIcon}
                                    >
                                        <Popup><b>{pet.petName}</b> ({pet.animalType})</Popup>
                                    </Marker>
                                )
                            )}
                        </MapContainer>
                    </Card>

                    <Card title="Your Adoption Requests" className="lg:col-span-1">
                        {bookings.length === 0 ? (
                            <p className="text-gray-500 text-center mt-4">No adoption requests made yet.</p>
                        ) : (
                            <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                {bookings.map((booking) => (
                                    <li
                                        key={booking._id}
                                        className="p-3 rounded-lg border flex items-center justify-between bg-slate-50"
                                    >
                                        <span>
                                            <strong className="text-gray-800">{booking.pet.petName}</strong>
                                            <span className="text-gray-500 text-sm"> ({booking.pet.animalType})</span>
                                        </span>
                                        <span className={`font-semibold text-sm px-2 py-1 rounded-full ${
                                            booking.status === "accepted" ? "bg-green-100 text-green-700"
                                            : booking.status === "declined" ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
                {modalVisible && <Modal message={modalMessage} onClose={closeModal} />}
            </div>
        </div>
    );
};

export default BuyerPetAdoption;