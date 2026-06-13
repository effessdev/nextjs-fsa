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

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

const desktopClasses: Record<Breakpoint, string> = {
  sm: "sm:flex",
  md: "md:flex",
  lg: "lg:flex",
  xl: "xl:flex",
  "2xl": "2xl:flex",
}

const mobileClasses: Record<Breakpoint, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
}

const NavbarContext = React.createContext<{
  mobileBreakpoint: Breakpoint
} | null>(null)

function isDropdownItem(item: NavbarItem): item is NavbarDropdownItem {
  return "items" in item
}

interface NavbarProps extends React.ComponentProps<"header"> {
  mobileBreakpoint?: Breakpoint
  sticky?: boolean
}

/**
 * A responsive navigation bar with support for:
 * - Brand content
 * - Desktop navigation menus
 * - Mobile drawer navigation
 * - Custom action items
 *
 * Navigation items are provided via the `content` prop on
 * `NavbarContent` and are automatically rendered as:
 * - NavigationMenu links and dropdowns on desktop
 * - A Drawer with grouped sections on mobile
 *
 * The mobile breakpoint can be configured via the
 * `mobileBreakpoint` prop.
 *
 * @example
 * <Navbar position="sticky">
 *   <NavbarBrand>
 *     <Link href="/">Acme</Link>
 *   </NavbarBrand>
 *
 *   <NavbarContent
 *     content={[
 *       { label: "Home", link: "/" },
 *       {
 *         label: "Products",
 *         items: [
 *           { label: "Web", link: "/products/web" },
 *           { label: "Mobile", link: "/products/mobile" },
 *         ],
 *       },
 *     ]}
 *   />
 *
 *   <NavbarActions>
 *     <Button>Sign In</Button>
 *   </NavbarActions>
 * </Navbar>
 */
function Navbar({
  className,
  mobileBreakpoint = "md",
  sticky = false,
  children,
  ...props
}: NavbarProps) {
  return (
    <NavbarContext.Provider value={{ mobileBreakpoint }}>
      <header
        className={cn(
          "flex h-16 items-center justify-between border-b bg-background px-4",
          sticky && "sticky top-0 z-50",
          className
        )}
        {...props}
      >
        {children}
      </header>
    </NavbarContext.Provider>
  )
}

function NavbarBrand({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

interface NavbarContentProps {
  content: NavbarItem[]
  className?: string
}

function NavbarContent({ content, className }: NavbarContentProps) {
  const context = React.useContext(NavbarContext)

  const breakpoint = context?.mobileBreakpoint ?? "md"

  return (
    <>
      {/* Mobile */}
      <div className={cn("shrink-0", mobileClasses[breakpoint])}>
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Open navigation</span>
            </Button>
          </DrawerTrigger>

          <DrawerContent className="h-full max-w-xs rounded-l-none rounded-r-xl">
            <div className="flex flex-col gap-2 p-6">
              {content.map((item) => {
                if (isDropdownItem(item)) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <h4 className="px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </h4>

                      <div className="ml-4 flex flex-col">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.link}
                            href={subItem.link}
                            className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop */}
      <nav
        className={cn(
          "hidden flex-1 justify-center",
          desktopClasses[breakpoint],
          className
        )}
      >
        <NavigationMenu>
          <NavigationMenuList>
            {content.map((item) => {
              if (isDropdownItem(item)) {
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid min-w-[220px] gap-1 p-2">
                        {item.items.map((subItem) => (
                          <li key={subItem.link}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.link}
                                className="block rounded-md p-2 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                {subItem.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={item.link}>
                  <NavigationMenuLink asChild>
                    <Link href={item.link}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  )
}

function NavbarActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

export { Navbar, NavbarBrand, NavbarContent, NavbarActions }
