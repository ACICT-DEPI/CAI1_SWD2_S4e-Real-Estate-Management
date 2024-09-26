import { MapPin } from 'lucide-react';
import React from 'react';
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { FaParking } from 'react-icons/fa';
import { Link } from "react-router-dom";

const House = ({ house }) => {
    const {
        image,
        type,
        country,
        address,
        bedrooms,
        bathrooms,
        surface,
        price,
        parking,
        propertyId
    } = house;

    return (
        <Link to={`/property/${propertyId}`}>
            <div className='bg-white shadow-1 p-5 w-full max-w-[350px] mx-auto mb-12 cursor-pointer hover:shadow-2xl transition rounded-lg'>
                <img 
                    className='rounded-md mb-8 w-full h-[250px] object-cover'
                    src={image} 
                    alt='house' 
                />
                <div className='mb-4 flex gap-x-2 text-sm'>
                    <div className='bg-green-500 rounded-full text-white font-primary px-3 py-2'>{type}</div>
                    <div className='bg-violet-500 rounded-full text-white font-primary px-3 py-2'>{country}</div>
                </div>
                <div className='flex text-lg font-semibold max-w-[260px]'><MapPin className='mr-2'/> {address}</div>
                <div className='flex gap-x-4 my-4'>
                    <div className='flex gap-2 text-sm text-gray-600 bg-slate-200 rounded-md p-2 w-20 justify-center items-center'>
                        <BiBed className='text-[20px]' />
                        <span>{bedrooms}</span>
                    </div>
                    <div className='flex gap-2 text-sm text-gray-600 bg-slate-200 rounded-md p-2 w-20 justify-center items-center'>
                        <BiBath className='text-[20px]' />
                        <span>{bathrooms}</span>
                    </div>
                    <div className='flex gap-2 text-sm text-gray-600 bg-slate-200 rounded-md p-2 w-24 justify-center items-center'>
                        <FaParking className='text-[20px]' />
                        <span>{parking}</span>
                    </div>
                    <div className='flex gap-2 text-sm text-gray-600 bg-slate-200 rounded-md p-2 w-24 justify-center items-center'>
                        <BiArea className='text-[20px]' />
                        <span>{surface}</span>
                    </div>
                </div>
                <div className='text-lg font-semibold text-violet-600 mb-4'>${price}</div>
            </div>
        </Link>
    );
};

export default House;
