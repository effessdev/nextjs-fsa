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
            You can sign in to this website if you want. Just click the button
            below.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
