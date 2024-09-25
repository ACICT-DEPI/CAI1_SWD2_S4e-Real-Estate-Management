import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function Map({ markers }) {
    return (
        <MapContainer 
            center={[30.143055439268853, 31.394735395877987]} 
            zoom={13} 
            scrollWheelZoom={false} 
            className='w-full h-full rounded-'
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => {
                // Ensure latitude and longitude are present
                if (marker.lat && marker.lng) {
                    return (
                        <Marker 
                            key={marker.property_id} 
                            position={[marker.lat, marker.lng]} // Use 'lat' and 'lng' from your formatted data
                        >
                            <Popup>
                                <div>
                                    <h3>{marker.address}</h3>
                                    <p>Price: ${marker.price}</p> {/* Formatting price */}
                                    <p>Bedrooms: {marker.bedrooms}</p>
                                    <p>Bathrooms: {marker.bathrooms}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                }
                return null; // Return null if lat/lng are invalid
            })}
        </MapContainer>
    );
}

export default Map;
