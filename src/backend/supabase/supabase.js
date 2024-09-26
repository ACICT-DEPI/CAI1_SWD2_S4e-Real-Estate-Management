import { createClient } from "@supabase/supabase-js";

// Fetch URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client directly
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
