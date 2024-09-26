import React, { useState, useEffect } from 'react';
import House from './House';
import supabaseClient from '../../backend/supabase/supabase';
import Map from './Map';

const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function ListingMapView() {
    const [houseData, setHouseData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const { data, error } = await supabaseClient
                    .from('properties')
                    .select('property_id, price, country, state, property_type, Bedrooms, Bathrooms, address, surface_area, latitude, longitude, ParkingSpaces');
    
                if (error) {
                    console.error("Error fetching data:", error.message);
                    return;
                }

                const formattedData = data.map((property) => ({
                    image: 'https://via.placeholder.com/400x250',
                    type: capitalizeFirstLetter(property.property_type), 
                    country: capitalizeFirstLetter(property.country),
                    address: property.address,
                    bedrooms: property.Bedrooms,
                    bathrooms: property.Bathrooms,
                    surface: property.surface_area,
                    price: property.price,
                    propertyId: property.property_id,
                    lat: property.latitude,
                    lng: property.longitude,
                    parking: property.ParkingSpaces
                }));
    
                setHouseData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data from Supabase:", err.message);
            }
        };
    
        fetchHouseData();
    }, []);

    if (loading) {
        return <div>Loading properties...</div>;
    }

    return (
        <div className='flex flex-col md:flex-row gap-0 mt-10 h-[80vh]'>
            <div className='flex-1 overflow-auto flex flex-wrap gap-4 ml-20'> {/* Adjusted styles to show two houses next to each other */}
                {houseData.map((house, index) => (
                    <House key={index} house={house} />
                ))}
            </div>
            <div className='w-full md:w-1/3 min-h-[400px] mr-10 rounded-lg'> {/* Adjusted map width */}
                <Map markers={houseData} />
            </div>
        </div>
    );
}

export default ListingMapView;
