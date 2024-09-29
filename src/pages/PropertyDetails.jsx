import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiBed, BiBath } from "react-icons/bi";
import { MdLocationOn } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { FaShare, FaClipboard, FaParking } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRulerCombined } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import Swal from 'sweetalert2';
import Map from '@/components/Home/Map';
import useSupabaseClient from '../backend/supabase/supabase';

const PropertyDetails = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select(`property_id, address, price, property_type, country, state, seller_phone, Bedrooms, Bathrooms, surface_area, zip_code, created_at, description, latitude, longitude, ParkingSpaces, images`)
                    .eq('property_id', id)
                    .single();

                if (error) {
                    console.error("Error fetching property data:", error);
                    return;
                }
                setHouse(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data from Supabase:", err);
            }
        };
        if(supabase && id){
            fetchHouseData();
        }
    }, [id,supabase]);

    if (loading) {
        return <div className="text-center text-xl font-semibold py-10">Loading property details...</div>;
    }

    if (!house) {
        return <div className="text-center text-xl font-semibold py-10">No property found.</div>;
    }

    const shareUrl = window.location.href;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Link Copied!',
                    text: 'The property link has been copied to your clipboard.',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: 'top-end'
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to copy the link. Please try again.',
                });
            });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = house.seller_phone;

        if (phoneNumber) {
            const whatsappUrl = `https://wa.me/${phoneNumber}`;
            window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No Phone Number',
                text: 'This property does not have a valid seller phone number.',
            });
        }
    };

    const markers = [
        {
            property_id: house.property_id,
            lat: house.latitude,
            lng: house.longitude,
            address: house.address,
            price: house.price,
            bedrooms: house.Bedrooms,
            bathrooms: house.Bathrooms,
        },
    ];

    const imageUrl = house.images && house.images.length > 0 
        ? house.images[0] 
        : "https://via.placeholder.com/768x432";

    return (
        <section>
            <div className='container mx-auto min-h-[800px] mb-1'>
                <img 
                    src={imageUrl} 
                    alt='Property' 
                    className='rounded-2xl object-cover w-full max-w-3xl mx-auto my-3 mt-5 py-5 shadow-lg transition-transform transform hover:scale-105 duration-300' 
                />
                <div className='my-6 flex flex-col gap-3'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='font-bold text-3xl pb-3 text-violet-700'>${house.price.toLocaleString()}</h2>
                            <h2 className='text-gray-600 text-lg flex pb-4'>
                                <MdLocationOn className='mr-1 text-violet-600' /> 
                                {house.address}, {house.state}, {house.zip_code}
                            </h2>
                        </div>
                        <div className='relative'>
                            <button onClick={toggleDropdown} className='flex gap-2 bg-violet-700 text-white rounded p-2 shadow hover:bg-violet-600 transition'>
                                <FaShare /> Share
                            </button>
                            {dropdownOpen && (
                                <div className='absolute right-0 mt-2 bg-white border rounded shadow-lg z-10'>
                                    <div className='p-2'>
                                        <button onClick={handleCopyLink} className='flex items-center gap-2 text-gray-700 hover:bg-gray-100 w-full text-left p-2 rounded my-2'>
                                            <FaClipboard /> Copy Link
                                        </button>
                                        <FacebookShareButton url={shareUrl} className='flex items-center gap-2 text-gray-700 hover:bg-gray-200 w-full text-left p-2 rounded my-2'>
                                            <FaShare /> Share on Facebook
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl} className='flex items-center gap-2 text-gray-700 hover:bg-gray-100 w-full text-left p-2 rounded my-2'>
                                            <FaShare /> Share on Twitter
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={shareUrl} className='flex items-center gap-2 text-gray-700 hover:bg-gray-100 w-full text-left p-2 rounded my-2'>
                                            <FaShare /> Share on WhatsApp
                                        </WhatsappShareButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className='border-gray-300' />
                    <div className='mt-4 flex flex-col gap-3 mb-4'>
                        <h2 className='font-bold text-2xl'>Key Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-violet-700 justify-center shadow-md'>
                                <MdHome /> {house.property_type}
                            </h2>
                            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-violet-700 justify-center shadow-md'>
                                <AiOutlineCalendar /> {new Date(house.created_at).toLocaleDateString()}
                            </h2>
                            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-violet-700 justify-center shadow-md'>
                                <FaRulerCombined /> {house.surface_area} sq ft
                            </h2>
                            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-violet-700 justify-center shadow-md'>
                                <BiBed /> {house.Bedrooms} Bedrooms
                            </h2>
                            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-violet-700 justify-center shadow-md'>
                                <BiBath /> {house.Bathrooms} Bathrooms
                            </h2>
                            <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-violet-700 justify-center shadow-md'>
                                <FaParking /> {house.ParkingSpaces} Parking Lots
                            </h2>
                        </div>
                    </div>
                    <button onClick={handleWhatsAppClick} className='bg-violet-700 text-white p-3 rounded-md shadow hover:bg-violet-600 transition'>
                        Message Seller on WhatsApp: {house.seller_phone}
                    </button>
                    {house.description && (
                        <>
                            <h2 className='font-bold text-2xl mt-6'>Description</h2>
                            <p className='text-gray-700'>{house.description}</p>
                        </>
                    )}
                </div>
                <div className='flex flex-col mt-8'>
                    <h2 className='font-bold text-3xl mb-4 text-gray-800'>Location</h2>
                    <div className="h-96 w-full bg-gray-200 rounded-3xl shadow-lg overflow-hidden">
                        <Map markers={markers} />
                    </div>
                    <div className='mt-4 p-5 bg-white rounded-lg shadow-md border border-gray-300'>
                        <h3 className='font-semibold text-lg text-gray-800'>Property Address</h3>
                        <p className='text-gray-600 text-base'>
                            {house.address}, {house.state}, {house.zip_code}
                        </p>
                        <p className='text-gray-600 text-base mt-2'>
                            This property is located in a vibrant area with easy access to local amenities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyDetails;
