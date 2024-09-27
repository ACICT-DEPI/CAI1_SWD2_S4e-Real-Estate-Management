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
    const [message, setMessage] = useState('');
    const [senderName, setSenderName] = useState('');
    const [email, setEmail] = useState('');
    const supabase = useSupabaseClient();
    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select(`property_id, address, price, property_type, country, state, seller_phone, Bedrooms, Bathrooms, surface_area, zip_code, created_at, description, latitude, longitude, ParkingSpaces`)
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
        return <div className="text-center">Loading property details...</div>;
    }

    if (!house) {
        return <div className="text-center">No property found.</div>;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: `Message sent to seller: ${senderName}`,
            showConfirmButton: false,
            timer: 2000
        });

        setSenderName('');
        setEmail('');
        setMessage('');
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

    return (
        <section>
            <div className='container mx-auto min-h-[800px] mb-1'>
                <div>
                    <img 
                        src={house.image_url || "https://via.placeholder.com/768x432"} 
                        alt='Property' 
                        className='rounded-xl object-cover w-full max-w-3xl mx-auto my-3 mt-5 py-5' 
                    />
                    <div className='my-6 flex gap-2 flex-col'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='font-bold text-3xl pb-3'>${house.price.toLocaleString()}</h2>
                                <h2 className='text-gray-500 text-lg flex pb-4'>
                                    <MdLocationOn className='gap-0 ' /> {house.address}, {house.state}, {house.zip_code}
                                </h2>
                            </div>
                            <div className='relative'>
                                <button onClick={toggleDropdown} className='flex gap-2 bg-violet-700 text-white rounded p-2'>
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
                        <hr />
                        <div className='mt-4 flex flex-col gap-3 mb-4'>
                            <h2 className='font-bold text-2xl'>Key Features</h2>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                                <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                                    <MdHome /> {house.property_type}
                                </h2>
                                <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                                    <AiOutlineCalendar /> {new Date(house.created_at).toLocaleDateString()}
                                </h2>
                                <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                                    <FaRulerCombined /> {house.surface_area} sq ft
                                </h2>
                                <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                                    <BiBed /> {house.Bedrooms} Bedrooms
                                </h2>
                                <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                                    <BiBath /> {house.Bathrooms} Bathrooms
                                </h2>
                                <h2 className='flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center'>
                                    <FaParking /> {house.ParkingSpaces} Parking Lots
                                </h2>
                            </div>
                        </div>
                        <button onClick={handleWhatsAppClick} className='bg-violet-700 text-white p-3 rounded-md'>
                            Message Seller on WhatsApp: {house.seller_phone}
                        </button>
                        <h2 className='font-bold text-2xl'>Description</h2>
                        <p>{house.description}</p>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-2xl mb-4'>Location</h2>
                    <div className="h-96 w-full bg-gray-300 rounded-3xl shadow-lg overflow-hidden"> {/* Adjusted border-radius and added shadow */}
                        <Map markers={markers} />
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="font-bold text-2xl mb-4">Contact Seller</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="Your Name"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="border p-2 rounded"
                            required
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            className="border p-2 rounded"
                            rows="4"
                            required
                        />
                        <button type="submit" className="bg-violet-700 text-white p-3 rounded-md">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PropertyDetails;
