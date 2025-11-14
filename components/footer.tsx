"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Github, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/nayanmondal4", label: "GitHub" },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/nayanmondall/",
      label: "LinkedIn",
    },
    { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/@hidragor", label: "YouTube" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/hidragor/", label: "Instagram" },
  ]

  return (
    <footer className="py-12 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.1),transparent_40%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link
            href="#home"
            className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
          >
            Nayan Mondal
          </Link>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            "Thanks for scrolling! You made it to the end."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center space-x-6 mb-8"
        >
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              {link.icon}
              <span className="sr-only">{link.label}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-gray-500"
        >
          <p>Copyright &copy; {new Date().getFullYear()} — Nayan</p>
        </motion.div>
      </div>
    </footer>
  )
}
