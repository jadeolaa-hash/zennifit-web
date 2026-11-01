import { supabase } from "@/lib/supabaseClient"

type Signup = {
  email: string
  name?: string
  interest: string
}

// Returns whether the signup was saved, so forms only confirm what actually landed.
export async function saveEarlyAccessSignup({ email, name, interest }: Signup): Promise<boolean> {
  try {
    const { error } = await supabase.from("early_access_signups").insert([
      { email: email.trim(), name: name?.trim() || null, interest },
    ])
    return !error
  } catch {
    return false
  }
}
