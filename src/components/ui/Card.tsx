// components/ui/Card.tsx
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
  footer?: ReactNode
}

export function Card({ title, children, className, footer }: CardProps) {
  return (
    <div className={cn("bg-white border border-gray-200 rounded-2xl shadow-card p-6", className)}>
      {title && <h3 className="text-lg font-semibold text-primary mb-4 font-display">{title}</h3>}
      <div className="space-y-4">{children}</div>
      {footer && <div className="pt-4 border-t mt-6">{footer}</div>}
    </div>
  )
}
