"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GoalForm } from "@/components/goal-form"
import type { User } from "@supabase/supabase-js"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.push("/signup") // redirect if not logged in
      } else {
        setUser(data.user)
      }
    })
  }, [router])

  if (!user) {
    return <p className="p-6">Loading your dashboard...</p>
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-8">
      <div className="w-full max-w-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/signup")
          }}
        >
          Logout
        </Button>
      </div>

      <GoalForm userId={user.id} />
    </div>
  )
}
