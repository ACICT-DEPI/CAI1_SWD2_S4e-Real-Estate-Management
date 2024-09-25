import React, { useContext, useState } from 'react';
import { RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from '@headlessui/react';
import { HouseContext } from "./HouseContext";

const PriceRangeDropdown = () => {
    const { price, setPrice } = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);

    const prices = [
        'Price range (any)',
        '100000 - 130000',
        '130000 - 160000',
        '160000 - 190000',
        '190000 - 220000',
        '10000 - 30000',
        '30000 - 40000',
    ];

    return (
        <Menu as='div' className='dropdown relative'>
            <Menu.Button
                onClick={() => setIsOpen((prev) => !prev)}
                className='dropdown-btn w-full text-left'
            >
                <RiWallet3Line className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>
                        {price}
                    </div>
                    <div className='text-[13px]'>Choose price range</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />
                ) : (
                    <RiArrowDownSLine className='dropdown-icon-secondary' />
                )}
            </Menu.Button>

            <Menu.Items className='dropdown-menu'>
                {prices.map((priceRange, index) => (
                    <Menu.Item as='li' key={index} onClick={() => {
                        setPrice(priceRange);
                        setIsOpen(false); // Close the dropdown on selection
                    }}
                    className='cursor-pointer hover:text-violet-700 transition'>
                        {priceRange}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default PriceRangeDropdown;
