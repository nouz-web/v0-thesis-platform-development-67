"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export type UserRole = "admin" | "teacher" | "student"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser(data.user)
          }
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // For demo purposes, check if there's a user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    setIsLoading(false)
    // checkAuth() // Uncomment when API is ready
  }, [])

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password, role }),
      // });

      // For demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock users for demo
      const mockUsers: Record<string, User> = {
        "admin@university.edu": {
          id: "1",
          name: "Admin User",
          email: "admin@university.edu",
          role: "admin",
          department: "Administration",
        },
        "teacher@university.edu": {
          id: "2",
          name: "Dr. Ahmed",
          email: "teacher@university.edu",
          role: "teacher",
          department: "Computer Science",
        },
        "student@university.edu": {
          id: "3",
          name: "Mohammed",
          email: "student@university.edu",
          role: "student",
          department: "Computer Science",
        },
      }

      const mockUser = mockUsers[email]

      // Check if user exists and password is correct
      if (mockUser && password === "password") {
        // Check if the user's role matches the requested role
        if (role && mockUser.role !== role) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: `This email is not registered as a ${role}. Please select the correct role.`,
          })
          return false
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}!`,
        })

        // Redirect based on role
        if (mockUser.role === "admin") {
          router.push("/admin")
        } else if (mockUser.role === "teacher") {
          router.push("/teacher")
        } else if (mockUser.role === "student") {
          router.push("/student")
        }

        return true
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        })
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
