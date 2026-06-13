import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default async function Page() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Landing Page</CardTitle>
          <CardDescription>
            This is the landing page of this website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Click the button below to go to the sign in page, or directly go to
            home if you are already signed in.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" asChild>
            <Link href="/sign-in">Go to Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/home">Go to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
