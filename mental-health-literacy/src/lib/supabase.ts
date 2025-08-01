import { createClient } from "@supabase/supabase-js";
const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const supabase = () => client;
export default supabase;
