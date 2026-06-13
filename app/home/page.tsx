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

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <p className="mt-8">
        Welcome to home, {session.user.name}. You are signed in.
      </p>
    </div>
  )
}
