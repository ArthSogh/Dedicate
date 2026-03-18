import { createClient } from "@/lib/supabase/server"
import { LandingView } from "@/components/views/landing-view"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <LandingView isAuthenticated={!!user} />
}
