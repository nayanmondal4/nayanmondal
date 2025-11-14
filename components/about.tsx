"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Code, Film, Palette, MapPin, Sparkles, Coffee, Terminal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedCounter from "@/components/animated-counter"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    {
      label: "Years Experience",
      value: 1,
      suffix: "+",
      tooltip: "That's 8768+ hours of debugging... I mean coding!",
    },
    {
      label: "Projects Completed",
      value: 50,
      suffix: "+",
      tooltip: "And only half of them broke after the client approved them!",
    },
    {
      label: "Clients Satisfied",
      value: 30,
      suffix: "+",
      tooltip: "They're still using my code, which means they haven't found the bugs yet.",
    },
  ]

  const skills = [
    {
      title: "Development",
      icon: <Code className="h-10 w-10 text-blue-500" />,
      description: "Full stack web development with React, Next.js, Node.js, and more.",
      color: "from-blue-500 to-blue-600",
      joke: "I speak fluent JavaScript, HTML, and Sarcasm.",
    },
    {
      title: "Video Editing",
      icon: <Film className="h-10 w-10 text-blue-500" />,
      description: "Professional video editing for YouTube channels and businesses.",
      color: "from-blue-500 to-blue-600",
      joke: "I can make anyone look good on camera. My code? That's another story.",
    },
    {
      title: "Design",
      icon: <Palette className="h-10 w-10 text-blue-500" />,
      description: "UI/UX design, graphic design, and brand identity creation.",
      color: "from-blue-500 to-blue-600",
      joke: "I make things pretty. Except my variable names. Those are terrifying.",
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

  const codeSnippets = [
    `function myLife() {
  try {
    const coffee = getCoffee();
    const code = writeBetterCode();
    return success();
  } catch (error) {
    return debugUntilMidnight();
  }
}`,
    `// TODO: Replace this with a better solution
// Last updated: 2 years ago`,
    `// This code works perfectly
// Don't touch it
// No one knows why`,
  ]

  const [currentSnippet, setCurrentSnippet] = useState(0)

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
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

      {/* Floating code particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/10 backdrop-blur-sm px-3 py-1 rounded-md font-mono text-xs text-blue-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {i % 3 === 0 ? "</>" : i % 3 === 1 ? "{...}" : "()=>{}"}
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
              <Sparkles className="h-4 w-4 mr-2" /> About Me
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Story So Far</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I&apos;m a passionate Full Stack Developer with experience in web development,
            video editing, and design. Currently pursuing Electronics and Communications Engineering at PES University in{" "}
            <span className="inline-flex items-center text-blue-400">
              <MapPin className="h-4 w-4 mr-1" /> Bangalore, India
            </span>
            . I turn Tea/coffee into code and bugs into features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <TooltipProvider>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 25px rgba(59,130,246,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 overflow-hidden">
                        <CardContent className="p-8 relative">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={hoveredStat === index ? { x: "100%" } : { x: "-100%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                          />
                          <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-2">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                          </h3>
                          <p className="text-gray-300 text-lg">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 border-blue-500/20 text-white p-3 max-w-xs">
                    <p>{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">My Experience</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-3xl mx-auto shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-blue-500/10 relative overflow-hidden"
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  "linear-gradient(90deg, rgba(59,130,246,0.3) 0%, transparent 25%, transparent 75%, rgba(59,130,246,0.3) 100%)",
"linear-gradient(90deg, rgba(59,130,246,0.3) 100%, transparent 25%, transparent 75%, rgba(59,130,246,0.3) 0%)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ opacity: 0.1 }}
            />

            <div className="border-l-2 border-blue-500 pl-6 space-y-8">
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-blue-500 border-4 border-black"></div>
                <h4 className="text-xl font-semibold text-white">Encode Ai</h4>
                <p className="text-rose-400 mb-2">Assistant Web Developer | Current</p>
                <p className="text-gray-300">
                  Creating engaging websites for our college club.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-blue-500 border-4 border-black"></div>
                <h4 className="text-xl font-semibold text-white">Youtube</h4>
                <p className="text-rose-400 mb-2">Video Editor | 2+ years</p>
                <p className="text-gray-300">
                  Created engaging video for my youtube channel.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-blue-500 border-4 border-black"></div>
                <h4 className="text-xl font-semibold text-white">Freelance</h4>
                <p className="text-rose-400 mb-2">Video Editor</p>
                <p className="text-gray-300">
                  Satisfied many clients by making content and edits for them.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border border-blue-500/10 overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full">
                <div className={`h-2 bg-gradient-to-r ${skill.color}`}></div>
                <CardContent className="p-6">
                  <motion.div
                    className="mb-4 transform group-hover:scale-110 transition-transform duration-300 bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 5, duration: 0.5 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                  <p className="text-gray-300 mb-4">{skill.description}</p>

                  <div className="mt-auto pt-4 border-t border-blue-500/10">
                    <p className="text-sm text-blue-400 italic flex items-center">
                      <Coffee className="h-4 w-4 mr-2" />
                      {skill.joke}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="md:w-1/2 max-w-md">
            <div className="bg-gray-900/50 rounded-lg border border-blue-500/10 p-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2 text-xs text-gray-400 flex items-center">
                  <Terminal className="h-3 w-3 mr-1" /> my-life.js
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={currentSnippet}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs md:text-sm font-mono text-gray-300 overflow-x-auto p-2"
                  onClick={() => setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)}
                >
                  <code>{codeSnippets[currentSnippet]}</code>
                </motion.pre>
              </AnimatePresence>
              <div className="text-xs text-gray-500 text-right mt-2">Click to see more snippets</div>
            </div>
          </div>

          <div className="md:w-1/2 max-w-md">
            <p className="text-gray-400 italic">
              I write code with future me in mind, even though I know he'll still have a few complaints.
            </p>
            <p className="text-blue-500 mt-2">- Nayan Monal</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
