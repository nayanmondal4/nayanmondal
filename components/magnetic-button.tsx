"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  href?: string
  strength?: number
  radius?: number
  asChild?: boolean
}

export default function MagneticButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  href,
  strength = 30,
  radius = 300,
  asChild = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

    // Only apply the magnetic effect if the cursor is within the radius
    if (distance < radius) {
      const x = (e.clientX - centerX) / strength
      const y = (e.clientY - centerY) / strength
      setPosition({ x, y })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className="inline-block"
    >
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        asChild={asChild || !!href}
        className={cn("transition-all duration-300", isHovered && "scale-105", className)}
      >
        {href ? <a href={href}>{children}</a> : children}
      </Button>
    </motion.div>
  )
}
