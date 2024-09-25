import React, { useState, useContext } from 'react';
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from '@headlessui/react';
import { HouseContext } from "./HouseContext";

const CountryDropdown = () => {
    const { country, setCountry, countries } = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Menu as='div' className='dropdown relative'>
            <Menu.Button
                onClick={() => setIsOpen((prev) => !prev)}
                className='dropdown-btn w-full text-left'
            >
                <RiMapPinLine className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>
                        {country}
                    </div>
                    <div className='text-[13px]'>Select your place</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />
                ) : (
                    <RiArrowDownSLine className='dropdown-icon-secondary' />
                )}
            </Menu.Button>

            <Menu.Items className='dropdown-menu'>
                {countries.map((countryName, index) => (
                    <Menu.Item as='li' key={index} onClick={() => {
                        setCountry(countryName);
                        setIsOpen(false); // Close the dropdown on selection
                    }}
                    className='cursor-pointer hover:text-violet-700 transition'>
                        {countryName}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default CountryDropdown;
