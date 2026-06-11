import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInWithGitHub from "@/components/ui/sign-in-with-github"

export default function SignInPage() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center p-4">
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
