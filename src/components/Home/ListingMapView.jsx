import React, { useState, useEffect } from 'react';
import House from './House';
import useSupabaseClient from '../../backend/supabase/supabase';
import { Pagination } from 'antd';
import Search from './Search';


const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function ListingMapView() {
    const [houseData, setHouseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const supabase = useSupabaseClient();

    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('property_id, price, country, state, property_type, Bedrooms, Bathrooms, address, surface_area, latitude, longitude, ParkingSpaces, images, is_available');
    
                if (error) {
                    console.error("Error fetching data:", error.message);
                    return;
                }
    
                // Filter out houses that are not available
                const formattedData = data
                    .filter(property => property.is_available) // Filter available properties
                    .map((property) => ({
                        image: property.images ? property.images[0] : 'https://via.placeholder.com/400x250',
                        type: capitalizeFirstLetter(property.property_type),
                        country: capitalizeFirstLetter(property.country),
                        address: property.address,
                        state: capitalizeFirstLetter(property.state),
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
        if(supabase){
            fetchHouseData();
        }
        
    }, [supabase]);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastHouse = currentPage * itemsPerPage;
    const indexOfFirstHouse = indexOfLastHouse - itemsPerPage;
    const currentHouses = houseData.slice(indexOfFirstHouse, indexOfLastHouse);
    
    if (loading) {
        return <div>Loading properties...</div>;
    }

    return (
        <div className='mt-10'>
            <div className='flex flex-wrap gap-4 justify-center'>
                <Search houses={houseData}/>
            </div>
        </div>
    );
}

export default ListingMapView;
