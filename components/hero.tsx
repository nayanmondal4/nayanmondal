"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"
import { ArrowRight, Github, Linkedin, Instagram, Youtube, MessageCircle, Download, MapPin, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentJoke, setCurrentJoke] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const developerJokes = [
    "My code works perfectly... until someone uses it.",
    "I wrote clean code once. Then I blinked.",
    "I'm not lazy, I'm just on energy saving mode.",
    "It's not a bug, it's an undocumented feature.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % developerJokes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [developerJokes.length])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  const rotateX = useTransform(mouseY, [0, 300], [5, -5])
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5])

  const calculateTransform = (x: number, y: number, strength = 20) => {
    if (!containerRef.current) return "translate(0px, 0px)"
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const deltaX = (x - centerX) / strength
    const deltaY = (y - centerY) / strength
    return `translate(${deltaX}px, ${deltaY}px)`
  }

  // Generate a shader-like background effect
  const generateShaderBackground = () => {
    return {
      background: `
        radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(59, 130, 246, 0.15) 0%, 
        rgba(59, 130, 246, 0.05) 20%, 
        transparent 60%)
      `,
      transition: "background 0.3s ease",
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_40%)]"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      </div>

      {/* Removed animated particles */}

      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left lg:w-1/2"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge
                className="mb-4 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all duration-300 px-3 py-1 text-sm rounded-full"
                variant="outline"
              >
                <MapPin className="h-3 w-3 mr-1" /> Bangalore, India
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-2"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Nayan Mondal
              </span>{" "}
              <motion.span
                animate={{ rotate: [0, 20, 0, 20, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 1.5 }}
                className="inline-block"
              >
                😉
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8 text-xl md:text-2xl font-medium text-gray-300 h-12 mt-4"
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer.",
                  1000,
                  "Video Editor.",
                  1000,
                  "Graphic Designer.",
                  1000,
                  "UI/UX Enthusiast.",
                  1000,
                  "Overthinker?.",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl"
            >
              Pursuing ECE at PES University, I balance circuits, code, design, and video editing with questionable amounts of caffeine.
              I create things that look good, work well, and only break when I’m not looking. currently focused on creating polished, thoughtful digital experiences while quietly fighting my laptop’s dramatic tendencies.
            </motion.p>

            {/* Developer joke section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-10 relative h-16"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-full"></div>
              <div className="pl-4 border-l-4 border-blue-500/30">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentJoke}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-400 italic"
                  >
                    &ldquo;{developerJokes[currentJoke]}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-full px-8 py-6 text-lg font-medium transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                <Link href="https://wa.me/6005203781" target="_blank" rel="noopener noreferrer">
                  <motion.span
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Me
                  </motion.span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-blue-500 text-white hover:bg-blue-500/20 rounded-full px-8 py-6 text-lg font-medium transition-transform hover:scale-105"
              >
                <Link href="#download-cv">
                  <motion.span
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Download className="mr-2 h-5 w-5" /> Download CV
                  </motion.span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-12 flex space-x-4"
            >
              {[
                { icon: <Github className="h-6 w-6" />, href: "https://github.com/nayanmondal4", label: "GitHub" },
                {
                  icon: <Linkedin className="h-6 w-6" />,
                  href: "https://www.linkedin.com/in/nayanmondall/",
                  label: "LinkedIn",
                },
                {
                  icon: <Instagram className="h-6 w-6" />,
                  href: "https://www.instagram.com/hidragor/",
                  label: "Instagram",
                },
                { icon: <Youtube className="h-6 w-6" />, href: "https://www.youtube.com/@hidragor", label: "YouTube" },
              ].map((social, index) => (
                <motion.div
                  key={social.label}
                  whileHover={{ y: -5, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
            style={{
              perspective: 1000,
            }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
              }}
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto"
            >
              {/* Main image */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/f.jpg"
                  alt="Nayan Mondal"
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600 rounded-full opacity-20 z-10"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-700 rounded-full opacity-20 z-10"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 -right-12 w-16 h-16 bg-blue-300 rounded-full opacity-20 z-10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut", delay: 1 }}
              />

              {/* Code particles */}
              <motion.div
                className="absolute -top-10 left-1/4 z-30"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
              >
                <div className="text-xs bg-black/80 text-blue-500 px-2 py-1 rounded-md font-mono">
                  &lt;div&gt;Welcome&lt;/div&gt;
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-0 right-0 z-30"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-xs bg-black/80 text-blue-500 px-2 py-1 rounded-md font-mono">
                  console.log("Helloo!");
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/3 -left-20 z-30"
                animate={{
                  x: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-xs bg-black/80 text-blue-500 px-2 py-1 rounded-md font-mono">npm install life</div>
              </motion.div>

              {/* Tech icons floating around */}
              <motion.div
                className="absolute top-0 left-1/4 bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-lg z-30"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
              >
                <div className="text-2xl">🖥️</div>
              </motion.div>
              <motion.div
                className="absolute bottom-10 right-0 bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-lg z-30"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-2xl">📊</div>
              </motion.div>
              <motion.div
                className="absolute top-1/3 -left-5 bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow-lg z-30"
                animate={{
                  x: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-2xl">😁</div>
              </motion.div>
            </motion.div>

            {/* Fun fact badge */}
            <motion.div
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 px-4 py-2 rounded-full shadow-lg z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59,130,246,0.4)",
              }}
            >
              <p className="text-sm text-blue-200 text-center flex items-center">
                <Code className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-semibold">Fun fact:</span> I spend half my day in front of screen and the other half
                confused.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-blue-500 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
