"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export type NavbarLinkItem = {
  label: string
  link: string
}

export type NavbarDropdownItem = {
  label: string
  items: NavbarLinkItem[]
}

export type NavbarItem = NavbarLinkItem | NavbarDropdownItem

function isDropdown(item: NavbarItem): item is NavbarDropdownItem {
  return "items" in item
}

interface NavbarProps extends React.ComponentProps<"header"> {
  brand?: React.ReactNode
  links?: NavbarItem[]
  actions?: React.ReactNode
  sticky?: boolean
}

/**
 * Responsive navigation bar.
 *
 * - **Desktop (≥ md):** `brand` — `links` — `actions`
 * - **Mobile  (< md):** `brand` — `actions` — hamburger → left drawer
 *
 * @param brand   - Logo / wordmark, typically a `<Link>`.
 * @param links   - Nav items. Pass `{ label, link }` for a plain link or
 *                  `{ label, items: [...] }` for a dropdown.
 * @param actions - Buttons / avatar shown to the right on all viewports.
 * @param sticky  - Pins the bar to the top of the viewport (`position: sticky`).
 *
 * @example
 * <Navbar
 *   brand={<Link href="/">Acme</Link>}
 *   links={[
 *     { label: "Home", link: "/" },
 *     {
 *       label: "Products",
 *       items: [
 *         { label: "Web",    link: "/products/web"    },
 *         { label: "Mobile", link: "/products/mobile" },
 *       ],
 *     },
 *   ]}
 *   actions={<Button>Sign in</Button>}
 *   sticky
 * />
 */
export function Navbar({
  className,
  brand,
  links = [],
  actions,
  sticky = false,
  ...props
}: NavbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b bg-background px-4",
        sticky && "sticky top-0 z-50",
        className
      )}
      {...props}
    >
      {brand && (
        <div className="flex shrink-0 items-center gap-2 pr-4">{brand}</div>
      )}

      {links.length > 0 && (
        <nav className="hidden flex-1 justify-start md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((item) =>
                isDropdown(item) ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid min-w-55 gap-1">
                        {item.items.map((sub) => (
                          <li key={sub.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={sub.link}
                                className="block rounded-md p-1 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                {sub.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <Button key={item.label} variant="ghost" asChild>
                    <Link href={item.link}>{item.label}</Link>
                  </Button>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      )}

      <div className="flex shrink-0 items-center gap-2">
        {actions}

        {links.length > 0 && (
          <div className="flex md:hidden">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                  <span className="sr-only">Open navigation</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full max-w-xs rounded-l-none rounded-r-xl">
                <div className="flex flex-col gap-2 p-6">
                  {links.map((item) =>
                    isDropdown(item) ? (
                      <div key={item.label} className="flex flex-col">
                        <h4 className="py-2 pl-3 font-bold text-muted-foreground">
                          {item.label}
                        </h4>
                        <div className="ml-4 flex flex-col">
                          {item.items.map((sub) => (
                            <Link
                              key={sub.link}
                              href={sub.link}
                              className="py-2 pl-3 hover:text-primary"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.link}
                        href={item.link}
                        className="py-2 pl-3 hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
    </header>
  )
}
