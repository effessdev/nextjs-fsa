"use client"

import * as React from "react"
import { Moon, Sun, Contrast } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun
            className={cn(
              "h-5 w-5 transition-all duration-300",
              mounted && theme !== "light" && "hidden"
            )}
          />
          <Moon
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              mounted && theme !== "dark" && "hidden"
            )}
          />
          <Contrast
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              mounted && theme !== "system" && "hidden"
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={16}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light {mounted && theme === "light" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark {mounted && theme === "dark" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System {mounted && theme === "system" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
