"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Palette, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

export default function InteractiveSection() {
  const [color, setColor] = useState("#e11d48")
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const colors = [
    "#e11d48", // rose-600
    "#f43f5e", // rose-500
    "#9f1239", // rose-800
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#8b5cf6", // violet-500
    "#000000", // black
    "#ffffff", // white
  ]

  // Draw the duck silhouette on the canvas
  const drawDuck = (ctx: CanvasRenderingContext2D, color: string, scale: number, rotation: number) => {
    const canvas = ctx.canvas
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Save the current state
    ctx.save()

    // Move to center of canvas
    ctx.translate(width / 2, height / 2)

    // Apply rotation
    ctx.rotate(rotation)

    // Apply scale
    ctx.scale(scale, scale)

    // Draw duck silhouette
    ctx.fillStyle = color
    ctx.beginPath()

    // Duck body
    ctx.ellipse(0, 20, 80, 60, 0, 0, Math.PI * 2)

    // Duck head
    ctx.moveTo(70, -20)
    ctx.arc(50, -20, 30, 0, Math.PI * 2)

    // Duck bill
    ctx.moveTo(90, -20)
    ctx.lineTo(120, -10)
    ctx.lineTo(90, -30)
    ctx.closePath()

    ctx.fill()

    // Draw eye
    ctx.fillStyle = isDark ? "#000000" : "#ffffff"
    ctx.beginPath()
    ctx.arc(60, -30, 5, 0, Math.PI * 2)
    ctx.fill()

    // Restore the state
    ctx.restore()

    // Add shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.beginPath()
    ctx.ellipse(width / 2, height - 50, 80 * scale, 20 * scale, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // Animation loop
  const animate = () => {
    if (autoRotate) {
      setRotation((prev) => (prev + 0.01) % (Math.PI * 2))
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  // Initialize and cleanup animation
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [autoRotate])

  // Draw on canvas when parameters change
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Set canvas dimensions
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        drawDuck(ctx, color, scale, rotation)
      }
    }
  }, [color, scale, rotation, isDark])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          canvas.width = canvas.clientWidth
          canvas.height = canvas.clientHeight
          drawDuck(ctx, color, scale, rotation)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [color, scale, rotation])

  const resetCanvas = () => {
    setRotation(0)
    setScale(1)
  }

  return (
    <section
      id="interactive"
      className="py-20 bg-gradient-to-b from-gray-950 to-black dark:from-gray-100 dark:to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-gray-900">Interactive Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
            Play with this interactive canvas. Rotate, zoom, and customize it to see my interactive capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl font-bold mb-4 text-white dark:text-gray-900">Interactive Canvas</h3>
            <p className="text-gray-300 dark:text-gray-700 mb-6">
              This interactive canvas demonstrates my ability to create engaging web experiences. As a developer who
              values user interaction, I incorporate elements like this to make websites more memorable and engaging.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-gray-900">Rotate the Duck</h4>
                  <p className="text-gray-400 dark:text-gray-600">
                    Toggle auto-rotation or manually rotate the duck to view it from different angles.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-gray-900">Zoom In/Out</h4>
                  <p className="text-gray-400 dark:text-gray-600">
                    Use the scale slider to make the duck larger or smaller.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-bold">03</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-gray-900">Change Colors</h4>
                  <p className="text-gray-400 dark:text-gray-600">
                    Select different colors to see how I can create customizable experiences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="h-[500px] bg-gradient-to-br from-gray-900 to-black dark:from-gray-200 dark:to-white rounded-xl overflow-hidden shadow-xl relative">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-pointer"
                onClick={() => setAutoRotate(!autoRotate)}
              />

              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 bg-black/20 dark:bg-white/20 backdrop-blur-md p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-white dark:text-gray-900 text-sm font-medium">Scale</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[scale]}
                      min={0.5}
                      max={2.5}
                      step={0.1}
                      onValueChange={(value) => setScale(value[0])}
                      className="w-32"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setScale(Math.min(2.5, scale + 0.2))}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white dark:text-gray-900 text-sm font-medium">Color</span>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-white dark:text-gray-900" />
                    <div className="flex gap-1">
                      {colors.map((c) => (
                        <button
                          key={c}
                          className={`w-6 h-6 rounded-full transition-transform ${
                            color === c ? "scale-125 ring-2 ring-white dark:ring-gray-900" : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: c }}
                          onClick={() => setColor(c)}
                          aria-label={`Set color to ${c}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white dark:text-gray-900 text-sm font-medium">Controls</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8" onClick={() => setAutoRotate(!autoRotate)}>
                      {autoRotate ? "Stop Rotation" : "Auto Rotate"}
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={resetCanvas}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
