import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createClient() {
  const url = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co"
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "placeholder-key"
  return createSupabaseClient(url, key)
}
