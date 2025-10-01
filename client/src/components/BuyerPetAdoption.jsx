import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Pet Card component
const PetCard = ({ pet }) => {
  const locationUrl =
    pet.seller?.latitude && pet.seller?.longitude
      ? `https://www.openstreetmap.org/?mlat=${pet.seller.latitude}&mlon=${pet.seller.longitude}#map=15/${pet.seller.latitude}/${pet.seller.longitude}`
      : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={
          pet.imageUrls && pet.imageUrls.length > 0
            ? `http://localhost:5000/uploads/${pet.imageUrls[0]}`
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={pet.petName}
        className="w-full h-100 object-cover object-contain"
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
      </div>
    </div>
  );
};

function BuyerPetAdoption() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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
  }, []);

  const filteredPets = pets.filter(
    (pet) =>
      (pet.petName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (pet.animalType?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

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
          filteredPets.map((pet) => <PetCard key={pet._id} pet={pet} />)
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
    </div>
  );
}

export default BuyerPetAdoption;
