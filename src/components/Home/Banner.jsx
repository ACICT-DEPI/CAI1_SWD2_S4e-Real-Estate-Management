import React, { useEffect, useState } from 'react';
import Image from "../../assets/img/house-banner.png";
import Search from "./Search";
import useSupabaseClient from '../../backend/supabase/supabase';

const Banner = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const supabase = useSupabaseClient();
    // Fetch houses from Supabase

    const fetchHouses = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('properties')
                .select('*');

            if (error) throw error;

            setHouses(data || []);
        } catch (err) {
            setError('Failed to load houses. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(supabase){
            fetchHouses();
        }
    }, [supabase]);

    return (
        <section className='h-full mb-0 xl:mb-5'>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
                    <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
                        <span className='text-violet-700'>Rent </span> 
                        Your Dream House With Us.
                    </h1>
                    <p className='max-w-[480px] mb-8'>
                        Find your dream home, move in now, 
                        and rent with built-in savings for 
                        your down payment. In 3 years or 
                        less, you're ready to buy.
                    </p>
                </div>

                {/* Image */}
                <div className='hidden flex-1 lg:flex justify-end items-end'>
                    <img src={Image} alt="House banner" />
                </div>
            </div>
            
            {/* {loading ? (
                <p className="text-center">Loading houses...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <Search houses={houses} setResults={setHouses} />
            )} */}
        </section>
    );
};

export default Banner;
