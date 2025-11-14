"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function FunnyCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [emoji, setEmoji] = useState("👨‍💻")

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)
    const handleMouseDown = () => {
      setClicked(true)
      // Change emoji on click
      const emojis = ["👨‍💻", "🚀", "✨", "🔥", "💻", "🎮", "🎯", "🎨", "🎬", "🎧"]
      setEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    }
    const handleMouseUp = () => setClicked(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Don't show on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      animate={{
        x: position.x - 15,
        y: position.y - 15,
        scale: clicked ? 1.2 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      <motion.div animate={{ rotate: clicked ? 360 : 0 }} transition={{ duration: 0.5 }} className="text-2xl">
        {emoji}
      </motion.div>
    </motion.div>
  )
}
