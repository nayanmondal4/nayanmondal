"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import InteractiveCard from "@/components/interactive-card"
import MagneticButton from "@/components/magnetic-button"
import AnimatedText from "@/components/animated-text"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [filter, setFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Life Map",
      description: "A personal journey tracking app with interactive timeline visualization.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20125202.png",
      tags: ["Next.js", "Node.js", "MongoDB"],
      liveUrl: "https://life-map-xi.vercel.app/",
      githubUrl: "https://github.com/Editwithkrish",
      category: "web",
    },
    {
      id: 2,
      title: "Lernova",
      description: "An e-learning platform with interactive courses and progress tracking.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20125606.png",
      tags: ["Next.js", "Tailwind CSS", "Firebase"],
      liveUrl: "https://lernova.vercel.app/",
      githubUrl: "https://github.com/Editwithkrish",
      category: "web",
    },
    {
      id: 3,
      title: "FinScan",
      description: "Financial analysis tool with data visualization and insights.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20125507.png",
      tags: ["HTML", "Chart.js", "CSS"],
      liveUrl: "https://fin-scan-gules.vercel.app/",
      githubUrl: "https://github.com/Editwithkrish",
      category: "tools",
    },
    {
      id: 4,
      title: "Dharti",
      description: "Environmental awareness app with interactive maps and data.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20125606.png",
      tags: ["Next.js", "Mapbox", "Tailwind CSS"],
      liveUrl: "https://dharti-phi.vercel.app/",
      githubUrl: "https://github.com/Editwithkrish",
      category: "ui",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

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

  const categories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "ui", label: "UI/UX" },
    { id: "tools", label: "Tools" },
  ]

  return (
    <section id="projects" className="py-20 bg-black relative overflow-hidden">
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
            text="Things I've Built"
            animation="reveal"
            className="text-3xl md:text-5xl font-bold mb-4"
            as="h2"
          />
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and experience in web development, design, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <MagneticButton
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => setFilter(category.id)}
              className={`rounded-full px-6 ${
                filter === category.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  : "border-blue-500 text-white hover:bg-blue-500/20"
              }`}
              strength={15}
            >
              <motion.span whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                {category.label}
              </motion.span>
            </MagneticButton>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  <InteractiveCard
                    glareEffect={true}
                    tiltEffect={true}
                    hoverScale={1.02}
                    glowEffect={true}
                    glowColor="rgba(59, 130, 246, 0.3)"
                  >
                    <div className="relative overflow-hidden h-48">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full bg-black/50 hover:bg-black/70"
                              >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                              </Button>
                            </Link>
                          )}
                          {project.liveUrl && (
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full bg-black/50 hover:bg-black/70"
                              >
                                <ExternalLink className="h-5 w-5" />
                                <span className="sr-only">Live Demo</span>
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <AnimatedText
                        text={project.title}
                        animation="reveal"
                        className="text-xl font-bold mb-2 group-hover:text-rose-400 transition-colors"
                        as="h3"
                        delay={0.1}
                      />
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                            animate={hoveredProject === project.id ? { y: [0, -2, 0] } : {}}
                            transition={{ delay: index * 0.1 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </InteractiveCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
