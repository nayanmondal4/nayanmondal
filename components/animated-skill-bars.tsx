"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type Skill = {
  name: string
  level: number
  color?: string
}

type SkillCategory = {
  category: string
  skills: Skill[]
}

export default function AnimatedSkillBars() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skillCategories: SkillCategory[] = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML/CSS", level: 90, color: "#3b82f6" },
        { name: "JavaScript", level: 85, color: "#1d4ed8" },
        { name: "React.js", level: 80, color: "#2563eb" },
        { name: "Next.js", level: 75, color: "#1e40af" },
        { name: "Tailwind CSS", level: 85, color: "#1e3a8a" },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 75, color: "#3b82f6" },
        { name: "Express", level: 70, color: "#1d4ed8" },
        { name: "MongoDB", level: 65, color: "#2563eb" },
        { name: "Firebase", level: 70, color: "#1e40af" },
        { name: "REST API", level: 80, color: "#1e3a8a" },
      ],
    },
    {
      category: "Design & Video",
      skills: [
        { name: "Premiere Pro", level: 90, color: "#3b82f6" },
        { name: "After Effects", level: 80, color: "#1d4ed8" },
        { name: "Figma", level: 75, color: "#2563eb" },
        { name: "Photoshop", level: 70, color: "#1e40af" },
        { name: "UI/UX Design", level: 75, color: "#1e3a8a" },
      ],
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
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants}>
              <Card className="bg-gray-900/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-blue-500">{skill.level}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full h-2.5 rounded-full bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{
                                duration: 1.5,
                                delay: 0.2 + skillIndex * 0.1,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="h-full rounded-full relative"
                              style={{
                                background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}CC 100%)`,
                              }}
                            >
                              <motion.span
                                className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white shadow-md"
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.2 + skillIndex * 0.1 + 1,
                                }}
                                style={{
                                  background: skill.color,
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
