"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  image: string
  title: string
  subtitle: string
  description: string
  badge?: string
  reverse?: boolean
  className?: string
}

export default function ParallaxSection({
  image,
  title,
  subtitle,
  description,
  badge,
  reverse = false,
  className,
}: ParallaxSectionProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [reverse ? 5 : -5, reverse ? -5 : 5])

  return (
    <section ref={ref} className={cn("relative py-20 overflow-hidden", className)}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}>
          <motion.div style={{ y: y.pipe((v) => v * -0.2), opacity, scale }} className="w-full md:w-1/2">
            <div className="text-center md:text-left">
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Badge
                    className="px-4 py-2 text-base bg-rose-500/10 text-rose-400 border-rose-500/20"
                    variant="outline"
                  >
                    {badge}
                  </Badge>
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                {title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto md:mx-0 mb-6"
              />

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-medium text-rose-400 mb-4"
              >
                {subtitle}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300 max-w-xl mx-auto md:mx-0"
              >
                {description}
              </motion.p>
            </div>
          </motion.div>

          <motion.div style={{ y: y.pipe((v) => v * 0.2), rotate, scale }} className="w-full md:w-1/2">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border-2 border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.2)]">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-5 -right-5 w-20 h-20 bg-rose-500/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute -bottom-5 -left-5 w-20 h-20 bg-rose-500/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
