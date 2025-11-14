"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glareEffect?: boolean
  tiltEffect?: boolean
  hoverScale?: number
  glowEffect?: boolean
  glowColor?: string
}

export default function InteractiveCard({
  children,
  className,
  glareEffect = true,
  tiltEffect = true,
  hoverScale = 1.02,
  glowEffect = true,
  glowColor = "rgba(225, 29, 72, 0.5)",
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smoother movement
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  // Transform values for rotation
  const rotateX = useTransform(springY, [-100, 100], [10, -10])
  const rotateY = useTransform(springX, [-100, 100], [-10, 10])

  // Glare effect position
  const glareX = useTransform(springX, [-100, 100], [0, 100], { clamp: true })
  const glareY = useTransform(springY, [-100, 100], [0, 100], { clamp: true })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformStyle: "preserve-3d",
        scale: isHovered ? hoverScale : 1,
      }}
      whileHover={{
        boxShadow: glowEffect ? `0 0 30px ${glowColor}` : undefined,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-rose-500/10 overflow-hidden h-full">
        <CardContent className="p-0">
          {children}

          {/* Glare effect */}
          {glareEffect && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
