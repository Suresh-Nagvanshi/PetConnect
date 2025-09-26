import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = () => {
  const position = [20.5937, 78.9629]; // Center coordinates for India

  return (
    <MapContainer className='mt-16' center={position} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          PetConnect Location Center
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
