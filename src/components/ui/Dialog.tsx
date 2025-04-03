"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Dialog({ open, onOpenChange, children }: DialogPrimitive.DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  )
}

export function DialogTrigger({ children }: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 bg-white p-6 rounded-xl shadow-lg top-1/2 left-1/2 w-[90vw] max-w-md transform -translate-x-1/2 -translate-y-1/2",
          className
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={20} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-primary">{children}</h2>
}
