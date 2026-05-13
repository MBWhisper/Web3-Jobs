import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[v0] Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

let supabase: SupabaseClient;

if (typeof window !== 'undefined') {
  // Browser environment
  supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
  );
} else {
  // Server environment (SSR, etc.)
  supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
  );
}

export default supabase;
