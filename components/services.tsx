"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Film, Palette, Figma, Database, Video } from "lucide-react"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const services = [
    {
      icon: <Code className="h-10 w-10 text-blue-500" />,
      title: "Full Stack Development",
      description:
        "Building responsive, scalable web applications with modern technologies like React, Next.js, Node.js, and more.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Film className="h-10 w-10 text-blue-500" />,
      title: "Video Editing",
      description: "Professional video editing for YouTube channels, social media content, and promotional videos.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Palette className="h-10 w-10 text-blue-500" />,
      title: "Graphic Design",
      description: "Creating eye-catching graphics, logos, and visual assets for digital and print media.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Figma className="h-10 w-10 text-blue-500" />,
      title: "UI/UX Design",
      description: "Designing intuitive user interfaces and experiences that delight users and achieve business goals.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Database className="h-10 w-10 text-blue-500" />,
      title: "Database Design",
      description: "Structuring efficient, scalable databases for web applications and data-driven solutions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Video className="h-10 w-10 text-blue-500" />,
      title: "Content Creation",
      description: "Producing engaging content strategies and multimedia assets for digital platforms.",
      color: "from-blue-500 to-blue-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I offer a range of services to help bring your ideas to life, from web development to video editing and
            design.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-800/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 h-full">
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
