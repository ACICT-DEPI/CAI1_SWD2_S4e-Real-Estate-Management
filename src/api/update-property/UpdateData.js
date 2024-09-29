export default async function InserthData(supabase, propertyData, id) {
    
    const { error } = await supabase
        .from("properties")
        .update({
            title: propertyData.title,
            price: propertyData.price,
            property_type: propertyData.property_type,
            description: propertyData.description,
            country: propertyData.country,
            city: propertyData.city,
            state: propertyData.state,
            zip_code: propertyData.zip_code,
            address: propertyData.address,
            Bedrooms: propertyData.Bedrooms,
            Bathrooms: propertyData.Bathrooms,
            ParkingSpaces: propertyData.ParkingSpaces,
            surface_area: propertyData.surface_area,
            seller_phone: propertyData.seller_phone,
            images: propertyData.images,
            file_list: propertyData.file_list
        })
        .eq('property_id', id)
    if (error) {
        console.error("Error updating data into property table : ", error);
        return null;
    } else {
        console.log('data updated')
        return "ok";
    }
}