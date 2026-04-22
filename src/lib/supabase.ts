import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient;

if (typeof window !== 'undefined') {
  // Browser environment
  supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );
} else {
  // Server environment (SSR, etc.)
  supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default supabase;