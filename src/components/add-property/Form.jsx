import React, { useState } from 'react';
import { Input, Select, Button, Card, Form, Typography, message, Space, Upload } from 'antd';
import InsertData from '@/api/add-property/InsertData';
import { useSession } from '@clerk/clerk-react';
import FetchData from '@/api/FetchData';
import useSupabaseClient from '@/backend/supabase/supabase';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function AntdForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('egypt');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [parkingSpaces, setParkingSpaces] = useState('');
    const [surfaceArea, setSurfaceArea] = useState('');
    const [phone, setPhone] = useState('');
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const supabase = useSupabaseClient();
    const englishRegex = /^[a-zA-Z0-9\s.,'-]+$/;
    const numericOnlyRegex = /^\d+$/;
    const zipCodeRegex = /^\d{3,9}$/;
    const englishLettersOnlyRegex = /^[a-zA-Z\s]+$/;
    const internationalPhoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  
    const validate = () => {
        let newErrors = {};

        if (!title) {
            newErrors.title = 'Title is required.';
        } else if (!englishLettersOnlyRegex.test(title)) {
            newErrors.title = 'Field must contain only English letters.';
        }

        if (!price) {
            newErrors.price = 'Price is required.';
        } else if (!numericOnlyRegex.test(price) || parseInt(price) < 0) {
            newErrors.price = 'Field must contain only positive numbers.';
        }

        if (description && numericOnlyRegex.test(description)) {
            newErrors.description = 'Description cannot consist only of numbers.';
        } else if (description && !englishRegex.test(description)) {
            newErrors.description = 'Description must contain only English characters.';
        }

        if (!state) {
            newErrors.state = 'State is required.';
        }

        if (city && !englishLettersOnlyRegex.test(city)) {
            newErrors.city = 'Field must contain only English letters.';
        }

        if (zip && !zipCodeRegex.test(zip)) {
            newErrors.zip = 'Zip code must contain between 3 and 9 digits.';
        }

        if (!propertyType) {
            newErrors.propertyType = 'Property type is required.';
        }
        if (bedrooms && (!numericOnlyRegex.test(bedrooms) || parseInt(bedrooms) < 0)) {
            newErrors.bedrooms = 'Field must contain only positive numbers.';
        }
        if (bathrooms && (!numericOnlyRegex.test(bathrooms) || parseInt(bathrooms) < 0)) {
            newErrors.bathrooms = 'Field must contain only positive numbers.';
        }
        if (parkingSpaces && (!numericOnlyRegex.test(parkingSpaces) || parseInt(parkingSpaces) < 0)) {
            newErrors.parkingSpaces = 'Field must contain only positive numbers.';
        }
        if (surfaceArea && (!numericOnlyRegex.test(surfaceArea) || parseInt(surfaceArea) < 0)) {
            newErrors.surfaceArea = 'Field must contain only positive numbers.';
        }
        if (!phone) {
            newErrors.phoneNumber = 'Phone number is required.';
        } else if (!internationalPhoneRegex.test(phone)) {
            newErrors.phoneNumber = 'Enter a valid phone number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const uploadImages = async () => {
        let uploadedImagePaths = [];
        for (const image of images) {
            const imageName = `${image.uid}`;
            const { data, error } = await supabase.storage
                .from('images') // Ensure this is your correct bucket name
                .upload(imageName, image.originFileObj, {
                    contentType: image.type,
                });

            if (error) {
                message.error(`Failed to upload ${image.name}`);
                return []; // Return empty if any file fails to upload
            }

            uploadedImagePaths.push(data.path); // Collect uploaded image paths
        }

        return uploadedImagePaths;
    };

    const handleSubmit = async () => {
        if (validate()) {
            const imagePaths = await uploadImages();
            let imageUrls = []
            if (imagePaths.length === 0) {
                message.error('Image upload failed. Please try again.');
                return;
            }else {
                for (let imagePath of imagePaths) {
                    imageUrls.push(`https://kpcjtdxeopfbjrzubivj.supabase.co/storage/v1/object/public/images/${imagePath}`);
                }
            }
            let propertyData = {
                title,
                price,
                property_type: propertyType,
                description,
                country,
                state,
                city,
                zip_code: zip,
                Bedrooms: bedrooms,
                Bathrooms: bathrooms,
                ParkingSpaces: parkingSpaces,
                surface_area: surfaceArea,
                seller_phone: phone,
                images : imageUrls
            };

            const response = await InsertData(supabase, propertyData);
            if (response) {
                message.success('Form submitted successfully');
                setTitle('')
                setPrice('')
                setPropertyType('')
                setDescription('')
                setState('')
                setCity('')
                setZip('')
                setBedrooms('')
                setBathrooms('')
                setParkingSpaces('')
                setSurfaceArea('')
                setPhone('')
                setImages([]);
            } else {
                message.error('server error, please try again later')
            }
        } else {
            message.error('Please fix the errors.');
        }
        const getdata = await FetchData(supabase);
        console.log(getdata)
    };

    return (
        <>
            <Card style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
                <Title level={3}>Post an ad</Title>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Title"
                        validateStatus={errors.title ? 'error' : ''}
                        help={errors.title}
                    >
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Required..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        validateStatus={errors.price ? 'error' : ''}
                        help={errors.price}
                    >
                        <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Required..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Property Type"
                        validateStatus={errors.propertyType ? 'error' : ''}
                        help={errors.propertyType}
                    >
                        <Select value={propertyType} onChange={setPropertyType}>
                            <Option value="house">House</Option>
                            <Option value="apartment">Apartment</Option>
                            <Option value="office">Office</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        validateStatus={errors.description ? 'error' : ''}
                        help={errors.description}
                    >
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional..."
                        />
                    </Form.Item>
                    <div className="flex justify-between gap-2">
                        <div className="flex flex-col w-1/2">
                            <Form.Item label="Country">
                                <Select value={country} onChange={setCountry}>
                                    <Option value="egypt">Egypt</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="State"
                                validateStatus={errors.state ? 'error' : ''}
                                help={errors.state}
                            >
                                <Select value={state} onChange={setState}>
                                    <Option value="cairo">Cairo</Option>
                                    <Option value="giza">Giza</Option>
                                    <Option value="alexandria">Alexandria</Option>
                                    {/* Add more state options as needed */}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <Form.Item
                                label="City"
                                validateStatus={errors.city ? 'error' : ''}
                                help={errors.city}
                            >
                                <Input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Optional..."
                                />
                            </Form.Item>

                            <Form.Item
                                label="Zip Code"
                                validateStatus={errors.zip ? 'error' : ''}
                                help={errors.zip}
                            >
                                <Input
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    placeholder="Optional..."
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="flex justify-between gap-2">
                        <div className="flex flex-col w-1/2">
                            <Form.Item
                                label="Number of Bedrooms"
                                validateStatus={errors.bedrooms ? 'error' : ''}
                                help={errors.bedrooms}
                            >
                                <Input
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    placeholder="Optional..."
                                />
                            </Form.Item>

                            <Form.Item
                                label="Number of Bathrooms"
                                validateStatus={errors.bathrooms ? 'error' : ''}
                                help={errors.bathrooms}
                            >
                                <Input
                                    value={bathrooms}
                                    onChange={(e) => setBathrooms(e.target.value)}
                                    placeholder="Optional..."
                                />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <Form.Item
                                label="Number of Parking Spaces"
                                validateStatus={errors.parkingSpaces ? 'error' : ''}
                                help={errors.parkingSpaces}
                            >
                                <Input
                                    value={parkingSpaces}
                                    onChange={(e) => setParkingSpaces(e.target.value)}
                                    placeholder="Optional..."
                                />
                            </Form.Item>

                            <Form.Item
                                label="Surface Area(squared meter)"
                                validateStatus={errors.surfaceArea ? 'error' : ''}
                                help={errors.surfaceArea}
                            >
                                <Input
                                    value={surfaceArea}
                                    onChange={(e) => setSurfaceArea(e.target.value)}
                                    placeholder="Optional..."
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item
                        label="Phone Number"
                        validateStatus={errors.phoneNumber ? 'error' : ''}
                        help={errors.phoneNumber}
                    >
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Required..."
                        />
                    </Form.Item>
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                        }}
                        size="large"
                    >
                        <Upload
                            customRequest={()=>{}}
                            fileList={images}
                            onChange={({ fileList }) => setImages(fileList)}
                            listType="picture"
                            accept="image/png, image/gif, image/jpeg"
                            maxCount={3}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
                        </Upload>
                    </Space>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className="mt-2 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}
