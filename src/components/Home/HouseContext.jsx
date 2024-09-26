import React, { useState, useEffect, createContext } from 'react';
import supabaseClient from '../../backend/supabase/supabase'; // Adjust this import based on your Supabase client setup

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
    const [houses, setHouses] = useState([]);
    const [country, setCountry] = useState('Location (any)');
    const [countries, setCountries] = useState([]);
    const [property, setProperty] = useState('Property type (any)');
    const [properties, setProperties] = useState([]);
    const [price, setPrice] = useState('Price range (any)');
    const [loading, setLoading] = useState(false);

    // Fetch houses from Supabase
    const fetchHouses = async () => {
        setLoading(true);
        const { data, error } = await supabaseClient
            .from('houses') // Adjust table name according to your Supabase setup
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

    useEffect(() => {
        const allCountries = houses.map((house) => house.country);
        const uniqueCountries = ['Location (any)', ...new Set(allCountries)];
        setCountries(uniqueCountries);
    }, [houses]);

    useEffect(() => {
        const allProperties = houses.map((house) => house.type);
        const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];
        setProperties(uniqueProperties);
    }, [houses]);

    const handleClick = () => {
        setLoading(true);

        const isDefault = (str) => str.split(' ').includes('(any)');
        const minPrice = parseInt(price.split(' ')[0]);
        const maxPrice = parseInt(price.split(' ')[2]);
        
        const filteredHouses = houses.filter((house) => {
            const housePrice = parseInt(house.price);
            if (
                house.country === country &&
                house.type === property &&
                housePrice >= minPrice &&
                housePrice <= maxPrice
            ) {
                return true;
            }

            // if all values are default
            if (isDefault(country) && isDefault(property) && isDefault(price)) {
                return true;
            }

            // if country is not default
            if (!isDefault(country) && isDefault(property) && isDefault(price)) {
                return house.country === country;
            }

            // if property is not default
            if (isDefault(country) && !isDefault(property) && isDefault(price)) {
                return house.type === property;
            }

            // if price is not default
            if (isDefault(country) && isDefault(property) && !isDefault(price)) {
                return housePrice >= minPrice && housePrice <= maxPrice;
            }

            // if country & property are not default
            if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
                return house.country === country && house.type === property;
            }

            // if country & price are not default
            if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
                return house.country === country && housePrice >= minPrice && housePrice <= maxPrice;
            }

            // if property and price are not default
            if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
                return house.type === property && housePrice >= minPrice && housePrice <= maxPrice;
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
                countries,
                property,
                setProperty,
                properties,
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
