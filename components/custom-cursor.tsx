"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
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
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, label, select, textarea").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
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
      setHidden(true)
    }
  }, [])

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      border: isDark ? "2px solid rgba(255, 255, 255, 0.8)" : "2px solid rgba(0, 0, 0, 0.8)",
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(225, 29, 72, 0.2)",
      border: "2px solid rgba(225, 29, 72, 0.8)",
      mixBlendMode: "difference",
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      backgroundColor: "rgba(225, 29, 72, 0.6)",
      border: "2px solid rgba(225, 29, 72, 0.8)",
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
    clicked: {
      x: position.x - 4,
      y: position.y - 4,
      backgroundColor: "#e11d48",
      scale: 0.5,
    },
  }

  return (
    <>
      <motion.div
        className="cursor-dot-outline fixed top-0 left-0 z-[999] pointer-events-none rounded-full"
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
        style={{
          width: 32,
          height: 32,
          opacity: hidden ? 0 : 1,
        }}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[999] pointer-events-none rounded-full"
        variants={dotVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.2 }}
        style={{
          width: 8,
          height: 8,
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  )
}
