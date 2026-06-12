import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SocialSignInBtn from "@/components/ui/social-sign-in-btn"
import { auth } from "@/lib/auth"
import { SiGithub } from "react-icons/si"
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
          <SocialSignInBtn provider="github">
            <SiGithub />
            Sign In with GitHub
          </SocialSignInBtn>
        </CardContent>
      </Card>
    </div>
  )
}
