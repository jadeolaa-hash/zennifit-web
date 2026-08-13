"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage("✅ Check your email to confirm your account.")
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage("🎉 Logged in successfully!")
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Sign Up / Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white p-2 rounded w-64"
      >
        Sign Up
      </button>

      <button
        onClick={handleLogin}
        className="bg-green-500 text-white p-2 rounded w-64"
      >
        Login
      </button>

      <p className="mt-2 text-sm">{message}</p>
    </div>
  )
}
