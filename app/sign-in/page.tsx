import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInWithGitHub from "@/components/ui/sign-in-with-github"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session !== null) {
    redirect("/home")
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center p-4">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Sign in using one of the methods given below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInWithGitHub />
        </CardContent>
      </Card>
    </div>
  )
}
