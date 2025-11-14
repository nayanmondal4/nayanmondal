"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Instagram, Linkedin, Mail, Phone, Send, Youtube } from "lucide-react"
import Link from "next/link"
import AnimatedText from "@/components/animated-text"
import MagneticButton from "@/components/magnetic-button"
import InteractiveCard from "@/components/interactive-card"
import { AnimatePresence } from "framer-motion"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fieldFocus, setFieldFocus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const socialLinks = [
    { icon: <Mail className="h-5 w-5" />, href: "mailto:nayanmondal0411@gmail.com", label: "Email" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/nayanmondal4", label: "GitHub" },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/nayanmondall/",
      label: "LinkedIn",
    },
    { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/@hidragor", label: "YouTube" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/hidragor/", label: "Instagram" },
    { icon: <Phone className="h-5 w-5" />, href: "tel:+916005203781", label: "Phone" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="Let's Connect"
            animation="reveal"
            className="text-3xl md:text-5xl font-bold mb-4"
            as="h2"
          />
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InteractiveCard
              glareEffect={true}
              tiltEffect={true}
              hoverScale={1.02}
              glowEffect={true}
              glowColor="rgba(59, 130, 246, 0.3)"
              className="h-full"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
                <p className="text-gray-300 mb-8">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
                  vision.
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="flex items-center group">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover:bg-blue-500/20 transition-all duration-300">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Email</h4>
                      <p className="text-white group-hover:text-blue-400 transition-colors">nayanmondal0411@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center group">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 shadow-[0_0_10px_rgba(59,130,246,0.2)] group-hover:bg-blue-500/20 transition-all duration-300">
                      <Phone className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Phone</h4>
                      <p className="text-white group-hover:text-blue-400 transition-colors">+91 6005203781</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((link, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500/20 flex items-center justify-center transition-colors duration-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                          >
                            {link.icon}
                            <span className="sr-only">{link.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </InteractiveCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <InteractiveCard
              glareEffect={true}
              tiltEffect={true}
              hoverScale={1.02}
              glowEffect={true}
              glowColor="rgba(59, 130, 246, 0.3)"
              className="h-full"
            >
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      fieldFocus === "name" ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus("name")}
                    onBlur={() => setFieldFocus(null)}
                    placeholder="Your name"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      fieldFocus === "email" ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus("email")}
                    onBlur={() => setFieldFocus(null)}
                    placeholder="Your email"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      fieldFocus === "message" ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus("message")}
                    onBlur={() => setFieldFocus(null)}
                    placeholder="Your message"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500 min-h-[150px] text-white transition-all duration-300"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-md py-3 text-lg font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  strength={10}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </MagneticButton>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-green-500/20 border border-green-500 rounded-md text-green-400 text-center"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
