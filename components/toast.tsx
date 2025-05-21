"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = React.createContext<{
  showToast: (message: string, type?: "default" | "success" | "error" | "warning") => void
}>({
  showToast: () => {},
})

export const useToast = () => React.useContext(ToastProvider)

const toastVariants = cva(
  "fixed top-4 right-4 z-50 flex items-center justify-between gap-2 rounded-md px-4 py-3 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-[#1a2035] text-white border border-[#2a3045]",
        success: "bg-green-600/90 text-white",
        error: "bg-red-600/90 text-white",
        warning: "bg-yellow-600/90 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  message: string
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, message, onClose, ...props }, ref) => {
    return (
      <div className={cn(toastVariants({ variant }), className)} ref={ref} {...props}>
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-2 rounded-full p-1 hover:bg-black/10">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  },
)
Toast.displayName = "Toast"

interface ToastContainerProps {
  children: React.ReactNode
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: string
      message: string
      type: "default" | "success" | "error" | "warning"
    }>
  >([])

  const showToast = React.useCallback(
    (message: string, type: "default" | "success" | "error" | "warning" = "default") => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, message, type }])

      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 3000)
    },
    [],
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastProvider.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.type}
            onClose={() => removeToast(toast.id)}
            className="animate-in fade-in slide-in-from-top-5"
          />
        ))}
      </div>
    </ToastProvider.Provider>
  )
}

export { Toast, toastVariants }
