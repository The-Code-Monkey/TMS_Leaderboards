import { createClient } from '@supabase/supabase-js';

const options = {
  auth: {
    persistSession: false,
  },
};

export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  options
);
