"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
  isSignedIn: boolean
  signIn: () => void
  signOut: () => void
  user: { name: string; email: string } | null
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  user: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user is signed in from localStorage
    const storedUser = localStorage.getItem("mockUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsSignedIn(true)
    }
    setIsLoaded(true)
  }, [])

  const signIn = () => {
    const mockUser = { name: "Demo User", email: "user@example.com" }
    setUser(mockUser)
    setIsSignedIn(true)
    localStorage.setItem("mockUser", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    setIsSignedIn(false)
    localStorage.removeItem("mockUser")
  }

  return <AuthContext.Provider value={{ isSignedIn, signIn, signOut, user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
