"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SectionDividerProps {
  image: string
  alt: string
  position?: "left" | "right" | "center"
  className?: string
}

export default function SectionDivider({ image, alt, position = "center", className }: SectionDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-[300px] md:h-[400px] overflow-hidden",
        position === "left" && "text-left",
        position === "right" && "text-right",
        position === "center" && "text-center",
        className,
      )}
    >
      <motion.div style={{ y, opacity, scale, rotate }} className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image src={image || "/placeholder.svg"} alt={alt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"
            animate={{
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {alt}
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.9 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"
          />
        </motion.div>
      </div>
    </div>
  )
}
