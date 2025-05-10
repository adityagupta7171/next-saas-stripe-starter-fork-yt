"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export function DashboardHeader() {
  const { isSignedIn } = useAuth()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
        <span>StockVision</span>
      </div>
      <div className="relative ml-auto flex-1 md:grow-0 md:basis-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search symbols..."
          className="w-full rounded-lg bg-background pl-8 md:w-full"
        />
      </div>
      <Link href="/sign-in">
        <Button variant="outline" size="sm" className="ml-auto md:ml-0">
          Sign In
        </Button>
      </Link>
      <ModeToggle />
    </header>
  )
}
