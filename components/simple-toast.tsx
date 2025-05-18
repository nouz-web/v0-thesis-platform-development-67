"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

type ToastContextType = {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => string
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...toast }])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Toast component
export function Toast({ id, title, description, variant = "default", duration = 5000 }: ToastProps) {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, removeToast])

  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm items-center justify-between rounded-lg border p-4 shadow-md",
        variant === "default" ? "bg-white text-gray-900" : "bg-red-600 text-white",
      )}
    >
      <div className="flex flex-col gap-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={() => removeToast(id)}
        className={cn(
          "ml-4 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100",
          variant === "default" ? "hover:bg-gray-100" : "hover:bg-red-700",
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

// Toaster component
export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
