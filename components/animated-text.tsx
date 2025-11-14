"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  repeatDelay?: number
  animation?: "typewriter" | "reveal" | "bounce" | "wave" | "gradient"
  gradient?: string
  delay?: number
  duration?: number
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export default function AnimatedText({
  text,
  className,
  once = true,
  repeatDelay = 0,
  animation = "reveal",
  gradient = "from-rose-500 to-red-500",
  delay = 0,
  duration = 0.05,
  as: Component = "p",
}: AnimatedTextProps) {
  const textRef = useRef(null)
  const isInView = useInView(textRef, { once })
  const controls = useAnimation()
  const [isGradientAnimating, setIsGradientAnimating] = useState(false)

  // Split text into words and characters
  const words = text.split(" ")

  // Variants for different animations
  const animations: Record<string, Variants> = {
    typewriter: {
      hidden: { width: 0, opacity: 0 },
      visible: (i: number) => ({
        width: "100%",
        opacity: 1,
        transition: {
          delay: delay + i * duration,
          duration: 0.5,
          ease: "easeInOut",
        },
      }),
    },
    reveal: {
      hidden: { y: "100%", opacity: 0 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: delay + i * duration,
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
        },
      }),
    },
    bounce: {
      hidden: { y: -20, opacity: 0 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
          delay: delay + i * duration,
        },
      }),
    },
    wave: {
      hidden: { y: 0, opacity: 1 },
      visible: (i: number) => ({
        y: [0, -15, 0],
        opacity: 1,
        transition: {
          delay: delay + i * 0.08,
          duration: 0.6,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        },
      }),
    },
    gradient: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay,
          duration: 0.5,
        },
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      if (animation === "gradient") {
        setIsGradientAnimating(true)
      }
    } else {
      controls.start("hidden")

      if (animation === "gradient") {
        setIsGradientAnimating(false)
      }
    }

    // Handle repeat
    if (repeatDelay > 0 && !once) {
      const interval = setInterval(() => {
        controls.start("hidden").then(() => {
          controls.start("visible")
        })
      }, repeatDelay)

      return () => clearInterval(interval)
    }
  }, [isInView, controls, animation, repeatDelay, once])

  if (animation === "typewriter") {
    return (
      <div ref={textRef} className={cn("relative inline-block overflow-hidden", className)}>
        <motion.div
          variants={animations.typewriter}
          initial="hidden"
          animate={controls}
          custom={0}
          className="whitespace-nowrap"
        >
          <Component>{text}</Component>
        </motion.div>
      </div>
    )
  }

  if (animation === "gradient") {
    return (
      <Component
        ref={textRef}
        className={cn(
          `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`,
          isGradientAnimating && "animate-gradient-shift bg-300%",
          className,
        )}
      >
        <motion.span variants={animations.gradient} initial="hidden" animate={controls}>
          {text}
        </motion.span>
      </Component>
    )
  }

  return (
    <Component ref={textRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-1">
            {Array.from(word).map((char, charIndex) => (
              <span key={charIndex} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  variants={animations[animation]}
                  initial="hidden"
                  animate={controls}
                  custom={wordIndex * 0.25 + charIndex * duration}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </Component>
  )
}
