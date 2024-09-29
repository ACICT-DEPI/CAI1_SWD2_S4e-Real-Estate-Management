import React from 'react';
import { Button, Dropdown, Space } from 'antd';

const bedItems = [
    {
        key: '0',
        label: '0 Bedroom',
    },
    {
        key: '1',
        label: '1 Bedroom',
    },
    {
        key: '2',
        label: '2 Bedrooms',
    },
    {
        key: '3',
        label: '3 Bedrooms',
    },
    {
        key: '4',
        label: '4+ Bedrooms',
    },
];

const priceItems = [
    {
        key: '1',
        label: '$0 - $100,000',
    },
    {
        key: '2',
        label: '$100,000 - $300,000',
    },
    {
        key: '3',
        label: '$300,000 - $500,000',
    },
    {
        key: '4',
        label: '$500,000+',
    },
];

const typeItems = [
    {
        key: '1',
        label: 'House',
    },
    {
        key: '2',
        label: 'Apartment',
    },
    {
        key: '3',
        label: 'Condo',
    },
    {
        key: '4',
        label: 'Townhouse',
    },
    {
        key: '5',
        label:'Other'
    }
];

function FilterDropdown() {
    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown
                    menu={{ items: bedItems }}
                    placement="bottomLeft"
                    className='w-40'
                >
                    <Button>Beds</Button>
                </Dropdown>
                <Dropdown
                    menu={{ items: priceItems }}
                    placement="bottom"
                    className='w-36'
                >
                    <Button>Price</Button>
                </Dropdown>
                <Dropdown
                    menu={{ items: typeItems }}
                    placement="bottomRight"
                    className='w-36'
                >
                    <Button>House Type</Button>
                </Dropdown>
            </Space>
        </Space>
    );
}

export default FilterDropdown;
