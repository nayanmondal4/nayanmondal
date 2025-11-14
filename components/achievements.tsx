"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeAchievement, setActiveAchievement] = useState(0)

  const achievements = [
    {
      title: "VIT SOFTWARE HACKATHON 2025",
      position: "#2",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/WhatsApp%20Image%202025-05-17%20at%2016.15.50_3adf7095.jpg?updatedAt=1747478821201",
      description:
        "Secured 2nd place in the prestigious VIT Software Hackathon with an innovative solution for sustainable urban mobility.",
      technologies: ["Next.js", "Node.js", "Tailwind Css", "Figma"],
      date: "april 2025",
      link: "https://lernova.vercel.app/",
    },
    {
      title: "COEP GAME DEV HACKATHON 2024",
      position: "3rd Runner UP",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-17%20162206.png?updatedAt=1747479156534",
      description:
        "Participated in the COEP Game Development Hackathon, where we built a 4v4 multiplayer FPS game using Unreal Engine. I contributed to UI/UX design, character development, 3D modeling, and audio design. Despite not securing a winning position, the experience sharpened my game development skills, enhanced my teamwork, and gave me confidence in presenting projects publicly for the first time.",
      technologies: ["Unreal Engine", "Core", "Blender", "Unity"],
      date: "dec 2024",
      link: "https://www.linkedin.com/posts/krishna-kumar-jha-b18a262a4_gamedev-hackathon-uiux-activity-7262700791575060481-i46U?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEl6iMQBDn3IbR6_tZFSG-vZCpsneUYlzWg",
    },
    {
      title: "MIT ADT UDAAN 1.0 AND 2.0 2024-25",
      position: "",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20115332.png",
      description:
        "Recreated a functional clone of DORIS, a government data platform, as part of a team project. Built using Next.js and Tailwind CSS, the platform focused on clean UI, data visualization, and accessibility. The project enhanced my understanding of scalable frontend architecture and government-based digital services.",
      technologies: ["Next.js", "Figma", "React.js", "Tailwind css"],
      date: "Sep 2024 - april 2025",
      link: "https://dharti-phi.vercel.app/",
    },
  ]

  const nextAchievement = () => {
    setActiveAchievement((prev) => (prev + 1) % achievements.length)
  }

  const prevAchievement = () => {
    setActiveAchievement((prev) => (prev - 1 + achievements.length) % achievements.length)
  }

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
    <section id="achievements" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />

        {/* Trophy particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          >
            {i % 3 === 0 ? "🏆" : i % 3 === 1 ? "🥇" : "🏅"}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Badge className="px-4 py-2 text-base bg-blue-500/10 text-blue-400 border-blue-500/20" variant="outline">
              <Trophy className="h-4 w-4 mr-2" /> Achievements
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Award-Winning Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Showcasing my competitive edge through hackathons and coding competitions. These achievements reflect my
            ability to innovate under pressure and deliver exceptional results.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAchievement}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.15)] overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <Image
                          src={achievements[activeAchievement].image || "/placeholder.svg"}
                          alt={achievements[activeAchievement].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

                        {/* Position badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                          >
                            <Badge className="px-3 py-1.5 text-lg font-bold bg-blue-600 text-white border-0">
                              {achievements[activeAchievement].position}
                            </Badge>
                          </motion.div>
                        </div>

                        {/* Animated overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                      </div>

                      <div className="p-8 md:p-10">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <div className="flex items-center mb-2">
                            <Trophy className="h-6 w-6 text-rose-500 mr-2" />
                            <h3 className="text-2xl font-bold text-white">{achievements[activeAchievement].title}</h3>
                          </div>

                          <p className="text-blue-400 mb-4">{achievements[activeAchievement].date}</p>

                          <p className="text-gray-300 mb-6">{achievements[activeAchievement].description}</p>

                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">TECHNOLOGIES USED:</h4>
                            <div className="flex flex-wrap gap-2">
                              {achievements[activeAchievement].technologies.map((tech, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                                >
                                  <Badge
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 border-blue-500/20"
                                    variant="outline"
                                  >
                                    {tech}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <Link
                            href={achievements[activeAchievement].link}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <span className="mr-1">View Project</span>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center text-white z-10 hover:bg-blue-500/20 transition-colors"
              onClick={prevAchievement}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center text-white z-10 hover:bg-blue-500/20 transition-colors"
              onClick={nextAchievement}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {achievements.map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeAchievement === index ? "bg-rose-500 w-10" : "bg-gray-700 hover:bg-gray-600",
                )}
                onClick={() => setActiveAchievement(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Additional achievements */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                icon: <Medal className="h-8 w-8 text-amber-500" />,
                title: "10+ Hackathons",
                description: "Participated in over 10 hackathons, consistently reaching finals and winning prizes.",
              },
              {
                icon: <Award className="h-8 w-8 text-rose-500" />,
                title: "Best UI/UX Award",
                description:
                  "Recognized for exceptional user interface and experience design in multiple competitions.",
              },
              {
                icon: <Star className="h-8 w-8 text-yellow-500" />,
                title: "Open Source Contributor",
                description: "Active contributor to open source projects with multiple accepted pull requests.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border border-blue-500/10 overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <motion.div
                      className="mb-4 transform group-hover:scale-110 transition-transform duration-300 bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 5, duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
