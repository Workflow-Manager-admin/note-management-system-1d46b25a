import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
// Initializes Supabase client using .env variables, used for all CRUD operations.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.error('Supabase environment variables are not set!');
}

/**
 * PUBLIC_INTERFACE
 * Returns a configured Supabase client instance.
 * Use for interacting with the Supabase notes table.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);
