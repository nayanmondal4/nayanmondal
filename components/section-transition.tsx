"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionTransitionProps {
  children: ReactNode
  delay?: number
}

export default function SectionTransition({ children, delay = 0 }: SectionTransitionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="section-transition"
    >
      {children}
    </motion.div>
  )
}
