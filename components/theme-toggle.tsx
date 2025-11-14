"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="rounded-full bg-gray-800/50 backdrop-blur-md border-gray-700 hover:bg-gray-700/70"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative w-5 h-5"
        >
          <motion.div
            initial={false}
            animate={{ opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Moon className="h-5 w-5 text-rose-400" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: isDark ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Sun className="h-5 w-5 text-blue-500" />
          </motion.div>
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
