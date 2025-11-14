"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CreativeCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([])
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Add position to trail with a limit of 10 positions
      setTrailPositions((prev) => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }]
        if (newPositions.length > 10) {
          return newPositions.slice(newPositions.length - 10)
        }
        return newPositions
      })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const handleLinkHoverEvents = () => {
      const linkableElements = document.querySelectorAll(
        "a, button, [role=button], input, label, select, textarea, .hover-trigger",
      )

      linkableElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("link"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })

      // Special elements that trigger text cursor
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, .text-trigger")
      textElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("text"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })
    }

    // Only add event listeners on client
    if (typeof window !== "undefined") {
      addEventListeners()
      handleLinkHoverEvents()
      return () => removeEventListeners()
    }
  }, [])

  // Hide cursor on mobile/touch devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "")
    if (isMobile) {
      setIsVisible(false)
    }
  }, [])

  const variants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)",
      mixBlendMode: "difference",
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(225, 29, 72, 0.15)",
      border: "1px solid rgba(225, 29, 72, 0.3)",
      mixBlendMode: "difference",
    },
    text: {
      x: position.x - 60,
      y: position.y - 60,
      height: 120,
      width: 120,
      backgroundColor: "rgba(225, 29, 72, 0.03)",
      border: "1px solid rgba(225, 29, 72, 0.1)",
      mixBlendMode: "difference",
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      backgroundColor: "rgba(225, 29, 72, 0.3)",
      border: "1px solid rgba(225, 29, 72, 0.5)",
      scale: 0.8,
    },
  }

  const dotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: isDark ? "#ffffff" : "#000000",
    },
    link: {
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: "#e11d48",
      scale: 1.5,
    },
    text: {
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: "#e11d48",
      scale: 0.5,
      opacity: 0.5,
    },
    clicked: {
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: "#e11d48",
      scale: 2,
    },
  }

  return (
    <>
      {/* Cursor trails */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 z-[998] pointer-events-none rounded-full"
          animate={{
            x: pos.x - 2,
            y: pos.y - 2,
            opacity: 0.2 - i * 0.02,
            scale: 1 - i * 0.05,
          }}
          transition={{ duration: 0.1 }}
          style={{
            width: 4,
            height: 4,
            backgroundColor: "#e11d48",
            opacity: isVisible ? 1 : 0,
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="cursor-outline fixed top-0 left-0 z-[999] pointer-events-none rounded-full"
        variants={variants}
        animate={clicked ? "clicked" : cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          width: 32,
          height: 32,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[999] pointer-events-none rounded-full"
        variants={dotVariants}
        animate={clicked ? "clicked" : cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
        style={{
          width: 8,
          height: 8,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
