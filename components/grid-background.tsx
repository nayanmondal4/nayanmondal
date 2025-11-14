"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import MovingBackground from "@/components/moving-background"

interface GridBackgroundProps {
  children: ReactNode
}

export default function GridBackground({ children }: GridBackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${
              isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
            } 1px, transparent 1px), 
            linear-gradient(to bottom, ${
              isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
            } 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <MovingBackground />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${
              isDark ? "rgba(225, 29, 72, 0.15)" : "rgba(225, 29, 72, 0.1)"
            }, transparent 70%)`,
          }}
        />
      </div>
      {children}
    </div>
  )
}
