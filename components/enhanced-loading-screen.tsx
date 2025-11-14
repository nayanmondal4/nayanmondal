"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Code, Laptop, Palette, Sparkles } from "lucide-react"

export default function EnhancedLoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing")
  const [joke, setJoke] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const loadingJokes = [
    "Compiling excuses for bugs...",
    "Reticulating splines...",
    "Generating witty dialog...",
    "Swapping time and space...",
    "Spinning violently around the y-axis...",
    "Tokenizing real life...",
    "Bending the spoon...",
    "Filtering morale...",
    "Don't think of purple hippos...",
    "We need a new fuse...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        switch (prev) {
          case "Initializing":
            return "Loading Assets"
          case "Loading Assets":
            return "Preparing Canvas"
          case "Preparing Canvas":
            return "Almost Ready"
          case "Almost Ready":
            return "Welcome!"
          default:
            return "Welcome!"
        }
      })
    }, 500)

    const jokeInterval = setInterval(() => {
      setJoke((prev) => (prev + 1) % loadingJokes.length)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
      clearInterval(jokeInterval)
    }
  }, [loadingJokes.length])

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const name = "Nayan Mondal"

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-black"></div>

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Removed logo animation */}

        <div className="mb-8 text-center">
          <div className="overflow-hidden">
            <motion.div initial={{ y: 40 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex justify-center mb-2">
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className={`text-4xl md:text-5xl font-bold ${
                      letter === " " ? "mr-2" : ""
                    } text-blue-100 dark:text-blue-900`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sm text-blue-200 dark:text-blue-700"
          >
            <span className="inline-block">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              {loadingText}
            </span>
          </motion.div>
        </div>

        {/* Loading bar */}
        <div className="relative h-2 bg-blue-800/50 dark:bg-blue-200/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 flex justify-between"
        >
          <span className="text-xs text-blue-300 dark:text-blue-700">Loading Experience</span>
          <span className="text-xs text-blue-100 dark:text-blue-900 font-medium">{progress}%</span>
        </motion.div>

        {/* Animated bars */}
        <div className="mt-8">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  delay: 1 + i * 0.2,
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{
                  originY: 1,
                  height: 8 + i * 4 + "px",
                }}
                className="bg-blue-400 dark:bg-blue-600"
              />
            ))}
          </div>
        </div>

        {/* Loading jokes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={joke}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex items-center justify-center"
          >
            <div className="text-sm text-blue-300 dark:text-blue-700 flex items-center">
              {joke % 3 === 0 ? (
                <Code className="h-4 w-4 mr-2" />
              ) : joke % 3 === 1 ? (
                <Palette className="h-4 w-4 mr-2" />
              ) : (
                <Laptop className="h-4 w-4 mr-2" />
              )}
              {loadingJokes[joke]}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 80 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-sm text-blue-200 dark:text-blue-800">
            {progress === 100 ? "Ready! Launching experience..." : "Almost there..."}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
