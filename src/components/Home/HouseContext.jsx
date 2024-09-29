import React, { useState, useEffect, createContext } from 'react';
import supabaseClient from '../../backend/supabase/supabase';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
    const [houses, setHouses] = useState([]);
    const [country, setCountry] = useState('Location (any)');
    const [property, setProperty] = useState('Property type (any)');
    const [price, setPrice] = useState('Price range (any)');
    const [loading, setLoading] = useState(false);

    // Fetch houses from Supabase
    const fetchHouses = async () => {
        setLoading(true);
        const { data, error } = await supabaseClient
            .from('properties') // Corrected table name
            .select('*');

        if (error) {
            console.error('Error fetching houses:', error);
        } else {
            setHouses(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchHouses(); // Fetch houses on component mount
    }, []);

    const handleClick = (searchAddress) => {
        setLoading(true);

        const isDefault = (str) => str.split(' ').includes('(any)');
        const minPrice = parseInt(price.split(' ')[0]);
        const maxPrice = parseInt(price.split(' ')[2]);

        const filteredHouses = houses.filter((house) => {
            const housePrice = parseInt(house.price);
            const addressMatch = house.address.toLowerCase().includes(searchAddress.toLowerCase());

            if (
                (house.country === country || isDefault(country)) &&
                (house.property_type === property || isDefault(property)) && // Updated for property_type
                (housePrice >= minPrice && housePrice <= maxPrice) &&
                addressMatch
            ) {
                return true;
            }

            return false; // Default case
        });

        setTimeout(() => {
            setHouses(filteredHouses.length < 1 ? [] : filteredHouses);
            setLoading(false);
        }, 1000);
    };

    return (
        <HouseContext.Provider
            value={{
                country,
                setCountry,
                property,
                setProperty,
                price,
                setPrice,
                houses,
                loading,
                handleClick,
            }}
        >
            {children}
        </HouseContext.Provider>
    );
};

export default HouseContextProvider;
