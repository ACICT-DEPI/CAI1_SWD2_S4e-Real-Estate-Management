import React, { useState } from 'react';
import { RiSearch2Line } from "react-icons/ri";
import House from './House'; // Import the House component
import useSupabaseClient from '../../backend/supabase/supabase';
import { Pagination } from 'antd';

const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const Search = ({ houses }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [input, setInput] = useState("");
    const [error, setError] = useState('');
    const [filteredHouses, setFilteredHouses] = useState(houses);
    const supabase = useSupabaseClient();
    const fetchData = async (value) => {
        if (value && value.length > 0) {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .ilike('address', `%${value}%`);

                if (error) throw error;

                // Filter out houses that are not available
                const formattedData = data
                    .filter(property => property.is_available) // Filter available properties
                    .map((property) => ({
                        image: property.images ? property.images[0] : 'https://via.placeholder.com/400x250',
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

                setFilteredHouses(formattedData);
            } catch (err) {
                setError('Error fetching data from Supabase.');
                console.error(err);
            }
        } else if (value.length === 0) {
            // Reset to all available houses when input is empty
            setFilteredHouses(houses);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    const handleSearchClick = () => {
        fetchData(input);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastHouse = currentPage * itemsPerPage;
    const indexOfFirstHouse = indexOfLastHouse - itemsPerPage;
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);

    return (
        <div className='py-10 px-5'>
            <div className='flex flex-col lg:flex-row w-full justify-center mt-2 mb-10'>
                <div className='bg-white shadow-2xl rounded-lg p-6 flex flex-col lg:flex-row gap-4 w-full max-w-[600px] transition-all duration-300 ease-in-out hover:shadow-xl border border-gray-300'>
                    <input
                        placeholder="Type to search..."
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        className='p-4 border border-gray-300 rounded-lg w-full lg:max-w-[400px] focus:outline-none focus:ring-2 focus:ring-violet-700 transition duration-300'
                    />
                    <button 
                        onClick={handleSearchClick} 
                        className='bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-14 rounded-lg flex justify-center items-center text-white text-lg font-semibold'
                    >
                        <RiSearch2Line size={24} />
                    </button>
                </div>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>} 

            {/* Render house cards */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentHouses.map((house) => (
                    <House key={house.propertyId} house={house} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={filteredHouses.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default Search;
