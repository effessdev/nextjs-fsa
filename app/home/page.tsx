import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session === null) {
    redirect("/sign-in")
  }

  return <p>Welcome to home, {session.user.name}. You are signed in.</p>
}
