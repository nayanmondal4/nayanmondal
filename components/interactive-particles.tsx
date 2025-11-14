"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Wand2, Palette, Code, FileCode, Database, Film, Figma } from "lucide-react"

type Particle = {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  life: number
  maxLife: number
  type: string
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, clicked: false })
  const [mode, setMode] = useState<"attract" | "repel" | "explode" | "vortex">("attract")
  const [colorTheme, setColorTheme] = useState<"rainbow" | "rose" | "cyan" | "amber">("cyan")
  const [particleCount, setParticleCount] = useState(100)
  const animationFrameRef = useRef<number>()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Define color palettes
  const colorPalettes = {
    rainbow: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"],
    rose: ["#3b82f6", "#1d4ed8", "#2563eb", "#1e40af", "#1e3a8a"],
    cyan: ["#06b6d4", "#0891b2", "#22d3ee", "#155e75", "#083344"],
    amber: ["#f59e0b", "#d97706", "#fbbf24", "#b45309", "#78350f"],
  }

  // Tech icons for particles
  const techIcons = [
    { type: "html", icon: <FileCode className="text-orange-500" /> },
    { type: "css", icon: <Palette className="text-blue-500" /> },
    { type: "js", icon: <Code className="text-yellow-500" /> },
    { type: "react", icon: <Code className="text-cyan-500" /> },
    { type: "database", icon: <Database className="text-green-500" /> },
    { type: "design", icon: <Figma className="text-purple-500" /> },
    { type: "video", icon: <Film className="text-blue-500" /> },
  ]

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const width = canvas.width
    const height = canvas.height
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 2
      const colors = colorPalettes[colorTheme]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const techTypes = ["html", "css", "js", "react", "database", "design", "video"]
      const type = techTypes[Math.floor(Math.random() * techTypes.length)]

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100 + 100,
        maxLife: 200,
        type,
      })
    }

    particlesRef.current = particles
  }

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseDown = () => {
      mouseRef.current.clicked = true
    }

    const handleMouseUp = () => {
      mouseRef.current.clicked = false
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.touches[0].clientX - rect.left
      mouseRef.current.y = e.touches[0].clientY - rect.top
      mouseRef.current.clicked = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.touches[0].clientX - rect.left
      mouseRef.current.y = e.touches[0].clientY - rect.top
    }

    const handleTouchEnd = () => {
      mouseRef.current.clicked = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [colorTheme, particleCount])

  // Initialize canvas and animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    initParticles()

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with a semi-transparent background for trail effect
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Apply different behaviors based on mode
        if (mouseRef.current.clicked) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const force = Math.min(100 / (distance * distance), 5)

          if (mode === "attract" && distance > 5) {
            particle.vx += (dx / distance) * force
            particle.vy += (dy / distance) * force
          } else if (mode === "repel" && distance < 200) {
            particle.vx -= (dx / distance) * force
            particle.vy -= (dy / distance) * force
          } else if (mode === "explode" && distance < 100) {
            const angle = Math.atan2(dy, dx)
            particle.vx = -Math.cos(angle) * 5
            particle.vy = -Math.sin(angle) * 5
          } else if (mode === "vortex" && distance < 200) {
            const angle = Math.atan2(dy, dx)
            particle.vx += Math.sin(angle) * force
            particle.vy -= Math.cos(angle) * force
          }
        }

        // Apply friction
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Decrease life
        particle.life -= 0.5
        if (particle.life <= 0) {
          // Reset particle
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.vx = (Math.random() - 0.5) * 2
          particle.vy = (Math.random() - 0.5) * 2
          particle.life = particle.maxLife
        }

        // Draw particle
        const alpha = particle.life / particle.maxLife
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw tech icon
        ctx.fillStyle = isDark ? "#ffffff" : "#000000"
        ctx.font = `${particle.size * 1.2}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Use simple symbols for tech types
        let symbol = ""
        switch (particle.type) {
          case "html":
            symbol = "</>"
            break
          case "css":
            symbol = "#"
            break
          case "js":
            symbol = "JS"
            break
          case "react":
            symbol = "⚛"
            break
          case "database":
            symbol = "□"
            break
          case "design":
            symbol = "◆"
            break
          case "video":
            symbol = "▶"
            break
          default:
            symbol = "*"
        }

        if (particle.size > 3) {
          ctx.fillText(symbol, particle.x, particle.y)
        }

        ctx.globalAlpha = 1
      })

      // Draw mouse interaction area when clicked
      if (mouseRef.current.clicked) {
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2)
        ctx.strokeStyle = colorPalettes[colorTheme][0]
        ctx.lineWidth = 2
        ctx.stroke()

        // Add visual effect based on mode
        if (mode === "attract") {
          ctx.beginPath()
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2
            const x = mouseRef.current.x + Math.cos(angle) * 60
            const y = mouseRef.current.y + Math.sin(angle) * 60
            ctx.moveTo(x, y)
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          }
          ctx.strokeStyle = colorPalettes[colorTheme][1]
          ctx.stroke()
        } else if (mode === "repel") {
          ctx.beginPath()
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2
            const x1 = mouseRef.current.x + Math.cos(angle) * 30
            const y1 = mouseRef.current.y + Math.sin(angle) * 30
            const x2 = mouseRef.current.x + Math.cos(angle) * 70
            const y2 = mouseRef.current.y + Math.sin(angle) * 70
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
          }
          ctx.strokeStyle = colorPalettes[colorTheme][2]
          ctx.stroke()
        } else if (mode === "explode") {
          ctx.beginPath()
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 30, 0, Math.PI * 2)
          ctx.fillStyle = `${colorPalettes[colorTheme][3]}50`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2)
          ctx.fillStyle = `${colorPalettes[colorTheme][4]}30`
          ctx.fill()
        } else if (mode === "vortex") {
          ctx.beginPath()
          const spiralPoints = 16
          let radius = 10
          for (let i = 0; i < spiralPoints * 5; i++) {
            const angle = (i / spiralPoints) * Math.PI * 2
            const x = mouseRef.current.x + Math.cos(angle) * radius
            const y = mouseRef.current.y + Math.sin(angle) * radius
            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
            radius += 0.5
          }
          ctx.strokeStyle = colorPalettes[colorTheme][0]
          ctx.stroke()
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDark, mode, colorTheme, particleCount])

  return (
    <section id="game" className="py-20 bg-gradient-to-b from-gray-950 to-black dark:from-gray-100 dark:to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-gray-900">Interactive Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
            Play with this interactive particle system! Click and drag to interact with the particles and create
            beautiful patterns.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800/40 dark:bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-4">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Button
                onClick={() => setMode("attract")}
                variant={mode === "attract" ? "default" : "outline"}
                className={`rounded-full ${
                  mode === "attract"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "border-blue-500 text-white dark:text-gray-800"
                }`}
              >
                <Zap className="mr-2 h-4 w-4" /> Attract
              </Button>
              <Button
                onClick={() => setMode("repel")}
                variant={mode === "repel" ? "default" : "outline"}
                className={`rounded-full ${
                  mode === "repel"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "border-blue-500 text-white dark:text-gray-800"
                }`}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Repel
              </Button>
              <Button
                onClick={() => setMode("explode")}
                variant={mode === "explode" ? "default" : "outline"}
                className={`rounded-full ${
                  mode === "explode"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "border-blue-500 text-white dark:text-gray-800"
                }`}
              >
                <Wand2 className="mr-2 h-4 w-4" /> Explode
              </Button>
              <Button
                onClick={() => setMode("vortex")}
                variant={mode === "vortex" ? "default" : "outline"}
                className={`rounded-full ${
                  mode === "vortex"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "border-blue-500 text-white dark:text-gray-800"
                }`}
              >
                <Palette className="mr-2 h-4 w-4" /> Vortex
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Button
                onClick={() => setColorTheme("rose")}
                variant={colorTheme === "rose" ? "default" : "outline"}
                className={`rounded-full ${
                  colorTheme === "rose"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "border-blue-500 text-white dark:text-gray-800"
                }`}
              >
                Rose
              </Button>
              <Button
                onClick={() => setColorTheme("cyan")}
                variant={colorTheme === "cyan" ? "default" : "outline"}
                className={`rounded-full ${
                  colorTheme === "cyan"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "border-blue-500 text-white dark:text-gray-800"
                }`}
              >
                Cyan
              </Button>
              <Button
                onClick={() => setColorTheme("amber")}
                variant={colorTheme === "amber" ? "default" : "outline"}
                className={`rounded-full ${
                  colorTheme === "amber"
                    ? "bg-gradient-to-r from-amber-600 to-yellow-700 text-white"
                    : "border-amber-500 text-white dark:text-gray-800"
                }`}
              >
                Amber
              </Button>
              <Button
                onClick={() => setColorTheme("rainbow")}
                variant={colorTheme === "rainbow" ? "default" : "outline"}
                className={`rounded-full ${
                  colorTheme === "rainbow"
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white"
                    : "border-purple-500 text-white dark:text-gray-800"
                }`}
              >
                Rainbow
              </Button>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full h-[500px] bg-gray-900/70 dark:bg-gray-100/70 rounded-lg cursor-pointer touch-none"
              />

              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="bg-gray-800/80 dark:bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-300 dark:text-gray-700">
                  Click and drag to interact with the particles!
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 dark:text-gray-700">Particles:</span>
                <Button
                  onClick={() => setParticleCount(Math.max(50, particleCount - 50))}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0"
                  disabled={particleCount <= 50}
                >
                  -
                </Button>
                <span className="text-white dark:text-gray-900 w-12 text-center">{particleCount}</span>
                <Button
                  onClick={() => setParticleCount(Math.min(300, particleCount + 50))}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full p-0"
                  disabled={particleCount >= 300}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-400 dark:text-gray-600 text-center">
              <p>
                Each particle represents a web development skill. Try different modes and colors to create unique
                patterns!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
