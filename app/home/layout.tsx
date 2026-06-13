import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContent,
} from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar sticky>
        <NavbarBrand>
          <Link href="/">Brand Icon</Link>
        </NavbarBrand>
        <NavbarContent
          content={[
            { label: "Dummy Link", link: "/" },
            {
              label: "Dummy Dropdown",
              items: [
                { label: "Item 1", link: "/" },
                { label: "Item 2", link: "/" },
              ],
            },
          ]}
        />
        <NavbarActions>
          <Button variant="secondary">Dummy</Button>
        </NavbarActions>
      </Navbar>
      {children}
    </>
  )
}
