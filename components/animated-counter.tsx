"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function AnimatedCounter({ value, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let start = 0
      const end = value
      const totalDuration = duration * 1000
      const incrementTime = totalDuration / end

      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) {
          clearInterval(timer)
          setHasAnimated(true)
        }
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [isInView, value, duration, hasAnimated])

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  )
}
