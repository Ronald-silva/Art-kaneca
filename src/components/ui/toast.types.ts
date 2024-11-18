
import { type ReactNode } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: ReactNode
}

export interface ToastProps {
  title?: string
  description?: string
  action?: ReactNode
}

export interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}