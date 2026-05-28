import { createClient } from "@supabase/supabase-js"

export function createPublicClient() {
  const url = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co"
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "placeholder-key"

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
