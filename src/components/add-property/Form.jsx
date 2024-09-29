import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Card, Form, Typography, message, Space, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import InsertData from '@/api/add-property/InsertData';
import UpdateData from '@/api/update-property/UpdateData';

import useSupabaseClient from '@/backend/supabase/supabase';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function AntdForm({ property, id }) {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [propertyType, setPropertyType] = useState(null);
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('egypt');
    const [state, setState] = useState(null);
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [parkingSpaces, setParkingSpaces] = useState('');
    const [surfaceArea, setSurfaceArea] = useState('');
    const [phone, setPhone] = useState('');
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});

    const supabase = useSupabaseClient();
    const navigate = useNavigate();

    const englishRegex = /^[a-zA-Z0-9\s.,'-]+$/;
    const numericOnlyRegex = /^\d+$/;
    const zipCodeRegex = /^\d{3,9}$/;
    const englishLettersOnlyRegex = /^[a-zA-Z\s]+$/;
    const egyptianPhoneRegex = /^(?:\+20|0020)?01[0125]\d{8}$/;

    useEffect(() => {
        if (property) {
            setTitle(property.title);
            setPrice(property.price);
            setPropertyType(property.property_type);
            setDescription(property.description);
            setState(property.state);
            setCity(property.city);
            setZip(property.zip_code);
            setAddress(property.address);
            setBedrooms(property.Bedrooms);
            setBathrooms(property.Bathrooms);
            setParkingSpaces(property.ParkingSpaces);
            setSurfaceArea(property.surface_area);
            setPhone(property.seller_phone);
            setImages(property.file_list);
        }
    }, []);

    const validate = () => {
        let newErrors = {};

        if (!title) {
            newErrors.title = 'Title is required.';
        } else if (numericOnlyRegex.test(title)) {
            newErrors.title = 'Field cannot consist only of numbers.';
        } else if (!englishRegex.test(title)) {
            newErrors.title = 'Field must contain only English characters.';
        }

        if (!price) {
            newErrors.price = 'Price is required.';
        } else if (!numericOnlyRegex.test(price) || parseInt(price) < 0) {
            newErrors.price = 'Field must contain only positive numbers.';
        }

        if (!propertyType) {
            newErrors.propertyType = 'Property type is required.';
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

        if (!address) {
            newErrors.address = 'Address is required.';
        } else if (numericOnlyRegex.test(address)) {
            newErrors.description = 'Field cannot consist only of numbers.';
        } else if (!englishRegex.test(address)) {
            newErrors.address = 'Field must contain only English characters.';
        }

        if (!bedrooms) {
            newErrors.bedrooms = 'Number of bedrooms is required'
        } else if (!numericOnlyRegex.test(bedrooms) || parseInt(bedrooms) < 0) {
            newErrors.bedrooms = 'Field must contain only positive numbers.';
        }

        if (!bathrooms) {
            newErrors.bathrooms = 'Number of bathrooms is required'
        } else if (!numericOnlyRegex.test(bathrooms) || parseInt(bathrooms) < 0) {
            newErrors.bathrooms = 'Field must contain only positive numbers.';
        }

        if (!parkingSpaces) {
            newErrors.parkingSpaces = 'Number of parking spaces is required'
        } else if (!numericOnlyRegex.test(parkingSpaces) || parseInt(parkingSpaces) < 0) {
            newErrors.parkingSpaces = 'Field must contain only positive numbers.';
        }

        if (!surfaceArea) {
            newErrors.surfaceArea = 'surface area is required'
        } else if (!numericOnlyRegex.test(surfaceArea) || parseInt(surfaceArea) < 0) {
            newErrors.surfaceArea = 'Field must contain only positive numbers.';
        }

        if (!phone) {
            newErrors.phoneNumber = 'Phone number is required.';
        } else if (!egyptianPhoneRegex.test(phone)) {
            newErrors.phoneNumber = 'Enter a valid egyptian phone number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        console.log(images);
        try {
            const imageName = `${file.uid}`;
            const { data, error } = await supabase.storage
                .from('images')  // Your bucket name
                .upload(imageName, file, {
                    contentType: file.type,
                });

            if (error) {
                onError(error); // If upload fails, trigger error callback
                message.error(`Failed to upload ${file.name}`);
            } else {
                onSuccess(data); // If upload is successful, trigger success callback
                message.success(`${file.name} uploaded successfully`);
            }
        } catch (error) {
            onError(error);
            message.error('Upload failed.');
        }
    };

    const props = {
        listType: 'picture',
        fileList: images,
        onChange: ({ fileList }) => setImages(fileList),
        accept: "image/png, image/gif, image/jpeg",
        multiple: true,
        previewFile(file) {
            console.log('Your upload file:', file);
            // Return a Promise to resolve the file into a preview
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file); // Convert the file to a base64 string
                reader.onload = () => resolve(reader.result); // When done, resolve the promise with the result
            });
        },
    };

    //     let uploadedImagePaths = [];
    //     for (const image of images) {
    //         const imageName = `${image.uid}`;
    //         const { data, error } = await supabase.storage
    //             .from('images') // Ensure this is your correct bucket name
    //             .upload(imageName, image.originFileObj, {
    //                 contentType: image.type,
    //             });

    //         if (error) {
    //             message.error(`Failed to upload ${image.name}`);
    //             return []; // Return empty if any file fails to upload
    //         }

    //         uploadedImagePaths.push(data.path); // Collect uploaded image paths
    //     }

    //     return uploadedImagePaths;
    // };

    const handleSubmit = async () => {

        if (validate()) {

            let imageUrls = []
            images.map(image => {
                imageUrls.push(`https://kpcjtdxeopfbjrzubivj.supabase.co/storage/v1/object/public/images/${image.uid}`)
            })
            let propertyData = {
                title,
                price,
                property_type: propertyType,
                description,
                country,
                state,
                city,
                zip_code: zip,
                address: address,
                Bedrooms: bedrooms,
                Bathrooms: bathrooms,
                ParkingSpaces: parkingSpaces,
                surface_area: surfaceArea,
                seller_phone: phone,
                images: imageUrls,
                file_list: images
            };
            let response;
            if (property && id) {
                response = await UpdateData(supabase, propertyData, id);
            } else {
                response = await InsertData(supabase, propertyData);
            }
            if (response) {
                message.success('Form submitted successfully');
                navigate('/listing')
                // setTitle('')
                // setPrice('')
                // setPropertyType(null)
                // setDescription('')
                // setState(null)
                // setCity('')
                // setZip('')
                // setAddress('')
                // setBedrooms('')
                // setBathrooms('')
                // setParkingSpaces('')
                // setSurfaceArea('')
                // setPhone('')
                // setImages([]);
            } else {
                message.error('server error, please try again later')
            }
        } else {
            message.error('Please fix the errors.');
        }
        
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
                        <Select value={propertyType} onChange={setPropertyType} placeholder="Required">
                            <Option value="rent">For Rent</Option>
                            <Option value="sale">For Sale</Option>
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
                                <Select value={country} onChange={setCountry}  >
                                    <Option value="egypt">Egypt</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="State"
                                validateStatus={errors.state ? 'error' : ''}
                                help={errors.state}
                            >
                                <Select value={state} onChange={setState} placeholder="Required">
                                    <Option value="cairo">Cairo</Option>
                                    <Option value="giza">Giza</Option>
                                    <Option value="alexandria">Alexandria</Option>
                                    <Option value="aswan">Aswan</Option>
                                    <Option value="asyut">Asyut</Option>
                                    <Option value="beheira">Beheira</Option>
                                    <Option value="beni_suef">Beni Suef</Option>
                                    <Option value="dakahlia">Dakahlia</Option>
                                    <Option value="damietta">Damietta</Option>
                                    <Option value="faiyum">Faiyum</Option>
                                    <Option value="gharbia">Gharbia</Option>
                                    <Option value="ismailia">Ismailia</Option>
                                    <Option value="kafr_el_sheikh">Kafr El Sheikh</Option>
                                    <Option value="luxor">Luxor</Option>
                                    <Option value="matruh">Matruh</Option>
                                    <Option value="minya">Minya</Option>
                                    <Option value="monufia">Monufia</Option>
                                    <Option value="new_valley">New Valley</Option>
                                    <Option value="north_sinai">North Sinai</Option>
                                    <Option value="port_said">Port Said</Option>
                                    <Option value="qalyubia">Qalyubia</Option>
                                    <Option value="qanatir">Qena</Option>
                                    <Option value="red_sea">Red Sea</Option>
                                    <Option value="sharqia">Sharqia</Option>
                                    <Option value="sohag">Sohag</Option>
                                    <Option value="south_sinai">South Sinai</Option>
                                    <Option value="suez">Suez</Option>
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
                    <Form.Item
                        label="Address"
                        validateStatus={errors.address ? 'error' : ''}
                        help={errors.address}
                    >
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Required..."
                        />
                    </Form.Item>
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
                                    placeholder="Required..."
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
                                    placeholder="Required..."
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
                                    placeholder="Required..."
                                />
                            </Form.Item>

                            <Form.Item
                                label="Surface Area"
                                validateStatus={errors.surfaceArea ? 'error' : ''}
                                help={errors.surfaceArea}
                            >
                                <Input
                                    value={surfaceArea}
                                    onChange={(e) => setSurfaceArea(e.target.value)}
                                    placeholder="Required..."
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
                    {/* <Space
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
                    </Space> */}
                    <Upload {...props} customRequest={customRequest}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className="mt-2 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-700">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}
