import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Link from "next/link"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar
        brand={
          <Link href="/" className="text-lg font-bold">
            fsa
          </Link>
        }
        links={[
          { label: "Link 1", link: "/" },
          { label: "Link 2", link: "/" },
          {
            label: "Dropdown 1",
            items: [
              { label: "Sub Link 1", link: "/" },
              { label: "Sub Link 2", link: "/" },
            ],
          },
        ]}
        actions={
          <div className="flex gap-2">
            <ModeToggle />
            <Button variant="outline" asChild>
              <Link href="sign-out">Sign Out</Link>
            </Button>
          </div>
        }
        sticky
      />
      {children}
    </>
  )
}
