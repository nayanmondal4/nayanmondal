"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInWindow, setIsMouseInWindow] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particlesArray: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
    }[] = []

    const createParticles = () => {
      const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) / 10

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speedX = Math.random() * 0.2 - 0.1
        const speedY = Math.random() * 0.2 - 0.1
        const color = isDark
          ? `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`
          : `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`

        particlesArray.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
          originalX: x,
          originalY: y,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i]

        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Mouse interaction
        if (isMouseInWindow) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const directionX = dx / distance || 0
            const directionY = dy / distance || 0

            particle.x -= directionX * force * 2
            particle.y -= directionY * force * 2
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        connectParticles(particle, particlesArray)
      }

      requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = (particle: (typeof particlesArray)[0], particles: typeof particlesArray) => {
      const connectionDistance = 100

      for (let j = 0; j < particles.length; j++) {
        const otherParticle = particles[j]

        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance
          ctx.strokeStyle = isDark ? `rgba(225, 29, 72, ${opacity * 0.15})` : `rgba(225, 29, 72, ${opacity * 0.15})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => {
      setIsMouseInWindow(true)
    }

    const handleMouseLeave = () => {
      setIsMouseInWindow(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isDark])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.5 }} />
  )
}
