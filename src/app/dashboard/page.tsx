import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardView } from "@/components/views/dashboard-view"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's gifts from DB
  const { data: gifts, error } = await supabase
    .from("gifts")
    .select("*")
    .order("created_at", { ascending: false })

  return <DashboardView user={user} gifts={gifts || []} />
}

