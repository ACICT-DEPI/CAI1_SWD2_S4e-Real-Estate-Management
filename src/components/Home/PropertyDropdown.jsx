import React, { useContext, useState } from 'react';
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from '@headlessui/react';
import { HouseContext } from "./HouseContext";

const PropertyDropdown = () => {
    const { property, setProperty, properties } = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Menu as='div' className='dropdown relative'>
            <Menu.Button
                onClick={() => setIsOpen((prev) => !prev)}
                className='dropdown-btn w-full text-left'
            >
                <RiHome5Line className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>
                        {property}
                    </div>
                    <div className='text-[13px]'>Select your property</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />
                ) : (
                    <RiArrowDownSLine className='dropdown-icon-secondary' />
                )}
            </Menu.Button>

            <Menu.Items className='dropdown-menu'>
                {properties.map((propertyName, index) => (
                    <Menu.Item as='li' key={index} onClick={() => {
                        setProperty(propertyName);
                        setIsOpen(false); // Close the dropdown on selection
                    }}
                    className='cursor-pointer hover:text-violet-700 transition'>
                        {propertyName}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default PropertyDropdown;
