import * as React from "react"
import { type ToastProps } from "./toast.types"

const useToast = () => {
  const addToast = React.useCallback((props: ToastProps) => {
    // Implementation provided by ToastProvider
    console.log(props)
  }, [])

  return {
    toast: addToast
  }
}

export { useToast }
export type { ToastProps }