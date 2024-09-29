import React, { useEffect, useState } from 'react'
import Form from '../components/add-property/Form'
import { useParams } from 'react-router-dom';
import useSupabaseClient from '@/backend/supabase/supabase';
import { Spin } from 'antd';
export default function EditProperty() {
    const [property, setProperty] = useState(null)
    const { id } = useParams();
    const supabase = useSupabaseClient();
    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select()
                    .eq('property_id', id)
                    .single();

                if (error) {
                    console.error("Error fetching property data:", error);
                    return;
                } else {
                    setProperty(data);
                }
            } catch (err) {
                console.error("Error fetching data from Supabase:", err);
            }
        };
        if (supabase && id) {
            fetchHouseData();
        }
    }, [id, supabase]);
    return (
        <>
            {property ? <Form property={property} id={id} /> : <Spin fullscreen size='large' />}
        </>
    )
}
