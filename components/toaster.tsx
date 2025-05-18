"use client"

import { useEffect } from "react"
import { Toast, ToastDescription, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.open) {
        const timeout = setTimeout(() => {
          dismiss(toast.id)
        }, 5000)

        return () => clearTimeout(timeout)
      }
    })
  }, [toasts, dismiss])

  return (
    <ToastViewport>
      {toasts.map(({ id, title, description, ...props }) => (
        <Toast key={id} {...props} onClose={() => dismiss(id)}>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </Toast>
      ))}
    </ToastViewport>
  )
}
