"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  Code,
  Rocket,
  Coffee,
  Lightbulb,
  Send,
  CheckCircle,
  XCircle,
  Zap,
  Trophy,
  Bug,
  Laugh,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function InternshipSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("why-me")
  const [hoverButton, setHoverButton] = useState(false)

  const perks = [
    {
      icon: <Code className="h-5 w-5 text-rose-500" />,
      title: "Technical Skills",
      description: "Proficient in React, Next.js, Tailwind CSS, and Node.js.",
    },
    {
      icon: <Rocket className="h-5 w-5 text-rose-500" />,
      title: "Fast Learner",
      description: "Quick to adapt to new technologies and workflows.",
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-rose-500" />,
      title: "Problem Solver",
      description: "Creative approach to solving complex challenges.",
    },
    {
      icon: <Coffee className="h-5 w-5 text-rose-500" />,
      title: "Team Player",
      description: "Collaborative mindset with excellent communication skills.",
    },
  ]

  const expectations = [
    "Frontend or Full Stack Web Development",
    "Remote or Hybrid Work Environment",
    "Modern Tech Stack (React, Next.js, etc.)",
    "Mentorship Opportunities",
    "Collaborative Team Environment",
  ]

  const funFacts = [
    "I debug code while making memes",
    "My code has fewer bugs than my houseplants have",
    "I can explain technical concepts using only food analogies",
    "I've never met a keyboard shortcut I didn't like",
  ]

  const devJokes = [
    "My code works perfectly... until someone uses it.",
    "I wrote clean code once. Then I blinked.",
    "I'm not lazy, I'm just on energy saving mode.",
    "It's not a bug, it's an undocumented feature.",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
  ]

  return (
    <section id="internship" className="py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-500/5 rounded-full blur-3xl"
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
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-rose-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full flex items-center justify-center",
              i % 4 === 0
                ? "bg-rose-500/10 w-12 h-12"
                : i % 4 === 1
                  ? "bg-rose-600/10 w-16 h-16"
                  : i % 4 === 2
                    ? "bg-rose-700/10 w-10 h-10"
                    : "bg-rose-800/10 w-14 h-14"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {i % 4 === 0 ? (
              <Bug className="h-6 w-6 text-rose-500/50" />
            ) : i % 4 === 1 ? (
              <Code className="h-8 w-8 text-rose-500/50" />
            ) : i % 4 === 2 ? (
              <Coffee className="h-5 w-5 text-rose-500/50" />
            ) : (
              <Laugh className="h-7 w-7 text-rose-500/50" />
            )}
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
            <Badge className="px-4 py-2 text-base bg-rose-500/10 text-rose-400 border-rose-500/20" variant="outline">
              <Zap className="h-4 w-4 mr-2" /> Career Goals
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Looking for an Internship</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to bring my creativity, technical skills, and enthusiasm to your team! Currently seeking a web
            development internship opportunity where I can create bugs... I mean features!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="why-me" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-900/50 p-1 rounded-full">
              <TabsTrigger
                value="why-me"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white rounded-full transition-all duration-300"
              >
                Why Hire Me
              </TabsTrigger>
              <TabsTrigger
                value="expectations"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white rounded-full transition-all duration-300"
              >
                What I'm Looking For
              </TabsTrigger>
              <TabsTrigger
                value="fun-facts"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white rounded-full transition-all duration-300"
              >
                Fun Facts
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="why-me" className="mt-0">
                  <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                            <Trophy className="h-6 w-6 text-rose-500 mr-2" /> Why I Stand Out
                          </h3>
                          <div className="space-y-6">
                            {perks.map((perk, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                className="flex items-start group"
                                whileHover={{ x: 5 }}
                              >
                                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 mt-1 shrink-0 group-hover:bg-rose-500/20 transition-all duration-300">
                                  {perk.icon}
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-white mb-1">{perk.title}</h4>
                                  <p className="text-gray-300">{perk.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-8"
                            onMouseEnter={() => setHoverButton(true)}
                            onMouseLeave={() => setHoverButton(false)}
                          >
                            <Button
                              asChild
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-full px-8 py-6 text-lg font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)] relative overflow-hidden group"
                            >
                              <Link href="#contact">
                                <motion.span
                                  className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-transparent"
                                  animate={
                                    hoverButton
                                      ? {
                                          x: ["0%", "100%"],
                                        }
                                      : { x: "0%" }
                                  }
                                  transition={{
                                    duration: 1,
                                    ease: "easeInOut",
                                  }}
                                />
                                <motion.span
                                  className="flex items-center relative z-10"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                  <Send className="mr-2 h-5 w-5" /> Get In Touch
                                </motion.span>
                              </Link>
                            </Button>
                          </motion.div>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-rose-500/10 relative overflow-hidden">
                          {/* Animated gradient border */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              background: [
                                "linear-gradient(90deg, rgba(59,130,246,0.2) 0%, transparent 25%, transparent 75%, rgba(59,130,246,0.2) 100%)",
"linear-gradient(90deg, rgba(59,130,246,0.2) 100%, transparent 25%, transparent 75%, rgba(59,130,246,0.2) 0%)",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                            style={{ opacity: 0.1 }}
                          />

                          <h3 className="text-xl font-bold mb-4 text-white">My Internship Checklist</h3>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Proficient in modern web technologies</p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Strong problem-solving abilities</p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Excellent communication skills</p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Creative approach to challenges</p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Adaptable to new technologies</p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Team player with collaborative mindset</p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-gray-300">Eager to learn and grow</p>
                            </div>
                            <div className="flex items-center">
                              <XCircle className="h-5 w-5 text-rose-500 mr-3" />
                              <p className="text-gray-300">Fear of challenging projects</p>
                            </div>
                            <div className="flex items-center">
                              <XCircle className="h-5 w-5 text-rose-500 mr-3" />
                              <p className="text-gray-300">Resistance to feedback</p>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-black/30 rounded-lg border border-rose-500/20">
                            <p className="text-gray-300 text-center italic">
                              "I don't just write code, I craft solutions with passion and precision. And occasionally
                              with StackOverflow."
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="expectations" className="mt-0">
                  <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                            <Briefcase className="h-6 w-6 text-rose-500 mr-2" /> Internship Wishlist
                          </h3>

                          <div className="space-y-4">
                            {expectations.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                className="flex items-center group"
                                whileHover={{ x: 5 }}
                              >
                                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 shrink-0 group-hover:bg-rose-500/20 transition-all duration-300">
                                  <span className="text-rose-500 font-medium">{index + 1}</span>
                                </div>
                                <p className="text-gray-300">{item}</p>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-8 bg-gray-900/50 p-5 rounded-lg border border-rose-500/10"
                          >
                            <h4 className="text-xl font-semibold mb-3 text-white">Availability</h4>
                            <p className="text-gray-300">
                              Available for part-time positions during the academic year and full-time during summer breaks. 
                              Open to remote, hybrid, or on-site opportunities in major tech hubs.
                            </p>
                          </motion.div>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-rose-500/10">
                          <h3 className="text-xl font-bold mb-4 text-white">Ideal Learning Environment</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 mt-1 shrink-0">
                                <Code className="h-5 w-5 text-rose-500" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-1">Modern Tech Stack</h4>
                                <p className="text-gray-300">Opportunity to work with current frameworks and tools.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 mt-1 shrink-0">
                                <Rocket className="h-5 w-5 text-rose-500" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-1">Impactful Projects</h4>
                                <p className="text-gray-300">Working on meaningful tasks that contribute to the product.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 mt-1 shrink-0">
                                <Lightbulb className="h-5 w-5 text-rose-500" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-1">Mentorship</h4>
                                <p className="text-gray-300">Guidance from experienced developers to accelerate growth.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 mt-1 shrink-0">
                                <Coffee className="h-5 w-5 text-rose-500" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-1">Collaborative Culture</h4>
                                <p className="text-gray-300">Open environment with knowledge sharing and teamwork.</p>
                              </div>
                            </div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mt-6 p-4 bg-black/30 rounded-lg border border-rose-500/20"
                          >
                            <p className="text-gray-300 text-center italic">
                              "Looking for a place where I can grow, contribute, and build awesome things with incredible people."
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fun-facts" className="mt-0">
                  <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                            <Laugh className="h-6 w-6 text-rose-500 mr-2" /> Random Facts About Me
                          </h3>
                          
                          <div className="space-y-6">
                            {funFacts.map((fact, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                className="bg-gray-900/50 p-4 rounded-lg border border-rose-500/10 group hover:border-rose-500/30 transition-all duration-300"
                                whileHover={{ x: 5 }}
                              >
                                <p className="text-gray-300">{fact}</p>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-8 bg-gray-900/50 p-5 rounded-lg border border-rose-500/10"
                          >
                            <h4 className="text-xl font-semibold mb-3 text-white flex items-center">
                              <Trophy className="h-5 w-5 text-rose-500 mr-2" /> Proudest Achievement
                            </h4>
                            <p className="text-gray-300">
                              Built a full-stack web application that helped my university's club manage events and grew membership by 40%. The feeling when users actually found it useful was incredible!
                            </p>
                          </motion.div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                            <Bug className="h-6 w-6 text-rose-500 mr-2" /> Developer Humor
                          </h3>
                          
                          <div className="space-y-4">
                            {devJokes.map((joke, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                className="bg-black/30 p-4 rounded-lg border border-rose-500/10"
                              >
                                <p className="text-gray-300 italic">"{joke}"</p>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mt-6 p-5 bg-rose-500/10 rounded-lg border border-rose-500/20"
                          >
                            <h4 className="text-lg font-semibold mb-2 text-white">Why I Love Web Development</h4>
                            <p className="text-gray-300">
                              There's something magical about turning lines of code into interactive experiences that people can use and enjoy. The constant learning and problem-solving keeps me challenged and engaged every day!
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </section>
  )
}