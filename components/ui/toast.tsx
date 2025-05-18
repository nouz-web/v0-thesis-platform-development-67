"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Toast = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center overflow-hidden rounded-md border bg-background shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full sm:max-w-[390px]",
        className,
      )}
      {...props}
    />
  ),
)
Toast.displayName = "Toast"

const ToastAction = React.forwardRef<React.ElementRef<"button">, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-transparent bg-secondary px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:hover:bg-destructive/80 group-[.destructive]:focus-visible:ring-destructive",
        className,
      )}
      {...props}
    />
  ),
)

ToastAction.displayName = "ToastAction"

const ToastTitle = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-1 font-medium text-slate-900 dark:text-slate-100", className)} {...props} />
  ),
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm opacity-90 text-slate-900 dark:text-slate-100", className)} {...props} />
  ),
)
ToastDescription.displayName = "ToastDescription"

const ToastViewport = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-[var(--space-4)] z-[100] flex max-h-screen w-full flex-col gap-[10px] p-4 sm:bottom-[var(--space-4)] sm:right-[var(--space-4)] sm:top-auto sm:w-[360px] md:w-[400px]",
        className,
      )}
      {...props}
    />
  ),
)
ToastViewport.displayName = "ToastViewport"

type ToastActionElement = React.ReactElement<
  React.PropsWithChildren<{
    onClick?: () => void
    onDismiss?: () => void
  }>
>

type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onDismiss?: () => void
  variant?: "default" | "destructive"
}

// Simple toast context
const ToastContext = React.createContext<{
  toast: (options: { title?: string; description?: string; variant?: "default" | "destructive" }) => void
  dismiss: (id?: string) => void
}>({
  toast: () => {},
  dismiss: () => {},
})

// Export useToast hook for backward compatibility
function useToast() {
  return React.useContext(ToastContext)
}

export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  ToastAction as ToastActionElement,
  type ToastProps,
  useToast,
}
