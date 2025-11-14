"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const timelineItems = [
    {
      year: "Oct 2025 - Present",
      title: "Assistant Web Developer",
      company: "Encode Ai",
      description: "Creating engaging websites for our college club.",
    },
    {
      year: "2022 - 2023",
      title: "Video Editor",
      company: "Youtube",
      description: "Created engaging video content for various clients and brands.",
    },
    {
      year: "2022 - Present",
      title: "Freelance Video Editor",
      company: "Various Clients",
      description: "Created many content and edits for clients.",
    },
    {
      year: "2025 - Present",
      title: "Electronics and Communication Engineering",
      company: "PES University",
      description: "Pursuing a degree in B.Tech in Electronics and Communication Engineering.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="timeline" className="py-20 bg-black">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A timeline of my professional experience and education.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>

            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div
                    className={`bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.15)] max-w-md ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-rose-400">{item.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2 text-white">{item.title}</h3>
                    <h4 className="text-lg font-medium mb-3 text-gray-300">{item.company}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gray-800 border-4 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10"></div>

                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
