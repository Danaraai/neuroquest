/**
 * Supabase client setup.
 *
 * TO ACTIVATE:
 * 1. Create a project at https://supabase.com
 * 2. Run supabase/schema.sql in the SQL editor
 * 3. Copy your project URL and anon key into .env.local:
 *      NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *      NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
 * 4. Uncomment the Supabase client below
 *
 * Until then, all state lives in localStorage via Zustand persist.
 */

// import { createClient } from "@supabase/supabase-js";
//
// const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//
// export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = null; // placeholder until configured

/**
 * Example: sync local Zustand state → Supabase
 * Call this after any state change if supabase is configured.
 */
export async function syncStats(_stats: unknown) {
  if (!supabase) return; // offline mode
  // TODO: upsert user_stats row
}

export async function syncSRCard(_card: unknown) {
  if (!supabase) return;
  // TODO: upsert sr_cards row
}
