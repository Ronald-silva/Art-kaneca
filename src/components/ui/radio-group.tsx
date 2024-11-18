import * as React from "react"
import { cn } from "../../lib/utils"

type RadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
  className?: string
}

export function RadioGroup({ children, className, onValueChange }: RadioGroupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value)
  }

  return (
    <div className={cn("grid", className)} onChange={handleChange}>
      {children}
    </div>
  )
}

type RadioGroupItemProps = {
  value: string
  id: string
  className?: string
}

export function RadioGroupItem({ value, id, className }: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      value={value}
      id={id}
      className={cn("peer sr-only", className)}
    />
  )
}