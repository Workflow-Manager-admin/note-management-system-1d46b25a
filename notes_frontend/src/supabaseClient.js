import { createClient } from '@supabase/supabase-js';

/**
 * PUBLIC_INTERFACE
 * Returns a configured Supabase client instance.
 * Use for interacting with the Supabase notes table.
 *
 * It expects the following environment variables to be set:
 *  REACT_APP_SUPABASE_URL
 *  REACT_APP_SUPABASE_KEY
 * See .env.sample for details.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// React will only include REACT_APP_* variables at build time. Do not use SUPABASE_URL or SUPABASE_KEY, always prefix with REACT_APP_ in .env files.

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.error(
    'Error: Supabase environment variables are not set!\\n' +
    'Ensure that REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY are defined in your .env file.\\n' +
    'You can copy .env.sample and add your values.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
