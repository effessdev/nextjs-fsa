import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session === null) {
    redirect("/sign-in")
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      <p>Welcome to home, {session.user.name}. You are signed in.</p>
      <Button variant="destructive" asChild>
        <Link href="sign-out">Sign Out</Link>
      </Button>
    </div>
  )
}
