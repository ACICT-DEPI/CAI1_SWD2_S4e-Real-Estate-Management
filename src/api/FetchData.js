const FetchData = async (supabase) => {
    // const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase.from('properties').select("*");
    if (error) {
      console.error("Error fetching data from property table:", error);
      return null;
    } else {
      return data  // Set the fetched data to state
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return null
  }
};
export default FetchData;
