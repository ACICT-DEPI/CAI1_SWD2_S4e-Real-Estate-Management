export default async function InserthData(supabase, propertyData) {
  const { error } = await supabase.from("contactUs").insert({});
  if (error) {
    console.error("Error inserting data into property table : ", error);
    return null;
  } else {
    return "ok";
  }
}
