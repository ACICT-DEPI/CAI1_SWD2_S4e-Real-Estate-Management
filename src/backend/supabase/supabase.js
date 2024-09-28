import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Fetch URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const useSupabaseClient = () => {
  const { session } = useSession();
  const [supabaseClient, setSupabaseClient] = useState(null);

  useEffect(() => {
    const createSupabaseClient = async () => {
      if (session) {
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        if (supabaseAccessToken) {
          const supabase = createClient(supabaseUrl, supabaseKey, {
            global: {
              headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
              },
            },
          });
          setSupabaseClient(supabase);
          console.log("Private access");
        } else {
          setSupabaseClient(createClient(supabaseUrl, supabaseKey));
          console.log("Public assess");
        }
      } else {
        setSupabaseClient(createClient(supabaseUrl, supabaseKey));
        console.log("Public access");
      }
    };

    if (session !== undefined) {
      createSupabaseClient();
    }
  }, [session]);

  return supabaseClient;
};

export default useSupabaseClient;
