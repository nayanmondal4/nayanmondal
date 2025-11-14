"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Code, Laptop, Palette } from "lucide-react"

export default function LoadingScreen() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-950 to-blue-900 dark:from-blue-100 dark:to-blue-50 z-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="mb-8 relative"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-blue-300/30 border-t-blue-300"
          />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            NM
          </motion.span>
        </div>
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
          Nayan Mondal
        </h1>
      </motion.div>

      {/* Loading bar */}
      <div className="relative w-64 h-2 bg-blue-800/50 dark:bg-blue-200/50 rounded-full overflow-hidden mb-6">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
        />
      </div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-blue-200 dark:text-blue-800 text-sm mb-8"
      >
        Loading experience...
      </motion.p>

      {/* Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex space-x-8 text-blue-300 dark:text-blue-700"
      >
        {[
          { icon: <Code className="h-6 w-6" />, label: "Developer" },
          { icon: <Palette className="h-6 w-6" />, label: "Designer" },
          { icon: <Laptop className="h-6 w-6" />, label: "Creator" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + i * 0.2 }}
            className="flex flex-col items-center"
          >
            {item.icon}
            <span className="text-xs mt-2">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
