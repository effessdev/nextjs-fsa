"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./button"
import { useState } from "react"
import { toast } from "sonner"

type SocialSignInBtnProps = {
  children: React.ReactNode
  provider: "google" | "github"
  callbackURL?: string
  errorCallbackURL?: string
  newUserCallbackURL?: string
}

export default function SocialSignInBtn({
  children,
  provider,
  callbackURL = "/home",
  errorCallbackURL = "/sign-in?failed=1",
  newUserCallbackURL = "/home?newUser=1",
}: SocialSignInBtnProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)

    try {
      await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL,
        newUserCallbackURL,
        disableRedirect: false,
      })
    } catch (err) {
      console.log(err)
      toast.error(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleClick} disabled={loading}>
      {children}
    </Button>
  )
}
