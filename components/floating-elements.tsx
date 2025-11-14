"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { Code, FileCode, Database, Palette, Film, Figma, Laptop, Server, Globe } from "lucide-react"

export default function FloatingElements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const icons = [
    { Icon: Code, color: "#3b82f6", delay: 0 },
    { Icon: FileCode, color: "#60a5fa", delay: 0.1 },
    { Icon: Database, color: "#06b6d4", delay: 0.2 },
    { Icon: Palette, color: "#8b5cf6", delay: 0.3 },
    { Icon: Film, color: "#10b981", delay: 0.4 },
    { Icon: Figma, color: "#6366f1", delay: 0.5 },
    { Icon: Laptop, color: "#3b82f6", delay: 0.6 },
    { Icon: Server, color: "#0ea5e9", delay: 0.7 },
    { Icon: Globe, color: "#14b8a6", delay: 0.8 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  }

  const floatingAnimation = (index) => ({
    y: [0, -15, 0],
    rotate: [0, index % 2 === 0 ? 5 : -5, 0],
    transition: {
      duration: 3 + index * 0.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      delay: index * 0.2,
    },
  })

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div variants={containerVariants} initial="hidden" animate={controls} className="w-full h-full relative">
        {icons.map(({ Icon, color, delay }, index) => (
          <motion.div
            key={index}
            custom={delay}
            variants={itemVariants}
            animate={floatingAnimation(index)}
            className="absolute"
            style={{
              left: `${10 + (index % 3) * 30}%`,
              top: `${15 + Math.floor(index / 3) * 30}%`,
              color: color,
              opacity: 0.7,
            }}
          >
            <div className={`p-3 rounded-full ${isDark ? "bg-gray-800/30" : "bg-white/30"} backdrop-blur-sm shadow-lg`}>
              <Icon size={index % 2 === 0 ? 24 : 32} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
