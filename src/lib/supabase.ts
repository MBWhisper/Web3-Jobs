import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient;

if (typeof window !== 'undefined') {
  // Browser environment
  supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
} else {
  // Server environment (SSR, etc.)
  supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
}

export default supabase;