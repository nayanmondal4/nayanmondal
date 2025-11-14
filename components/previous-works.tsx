"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Website = {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  url: string
  category: string
}

export default function PreviousWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [filter, setFilter] = useState("all")
  const [currentFeatured, setCurrentFeatured] = useState(0)

  const websites: Website[] = [
    {
      id: 1,
      title: "EL Innovatives",
      description: "Luxury interior design company website with elegant dark theme and modern UI.",
      image:
        "https://sjc.microlink.io/9KnZUAvcIvXAFSTNVEoDcpFC5HyIwLXAdm_3f66oebDHfr4dveYgwUJysR8HeKc6TLl5upVT25zxDHOPEpPjvA.jpeg",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      url: "https://www.elinnovative.com/",
      category: "business",
    },
    {
      id: 2,
      title: "Interiors by Nayana",
      description: "Portfolio website for an interior designer showcasing projects and services.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20124133.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      url: "https://interiors-by-nayana.vercel.app/",
      category: "portfolio",
    },
    {
      id: 3,
      title: "Webifyu Design",
      description: "Web design agency website with creative animations and interactive elements.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20124312.png",
      technologies: ["Next.js", "Tailwind CSS", "Figma"],
      url: "https://webifyu.netlify.app/",
      category: "business",
    },
    {
      id: 4,
      title: "PP Woods",
      description: "E-commerce website for a wooden furniture and decor company.",
      image: "https://ik.imagekit.io/ufv2mnqwt/portfolio/Screenshot%202025-05-18%20124600.png",
      technologies: ["Next.js", "Figma", "Tailwind CSS"],
      url: "https://www.ppwoods.in/",
      category: "ecommerce",
    },
  ]

  const filteredWebsites = filter === "all" ? websites : websites.filter((website) => website.category === filter)
  const featuredWebsite = websites[currentFeatured]

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
    { id: "business", label: "Business" },
    { id: "portfolio", label: "Portfolio" },
    { id: "ecommerce", label: "E-commerce" },
  ]

  const nextFeatured = () => {
    setCurrentFeatured((prev) => (prev + 1) % websites.length)
  }

  const prevFeatured = () => {
    setCurrentFeatured((prev) => (prev - 1 + websites.length) % websites.length)
  }

  return (
    <section id="previous-works" className="py-20 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Client Websites</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Showcasing websites I've designed and developed for clients across various industries.
          </p>
        </motion.div>

        {/* Featured Website Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative overflow-hidden rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.2)] bg-gray-900/50 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredWebsite.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[16/9] md:aspect-[21/9]"
              >
                <Image
                  src={featuredWebsite.image || "/placeholder.svg"}
                  alt={featuredWebsite.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">{featuredWebsite.title}</h3>
                  <p className="text-gray-300 mb-4 max-w-2xl">{featuredWebsite.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredWebsite.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6"
                  >
                    <Link href={featuredWebsite.url} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevFeatured}
                className="rounded-full bg-black/50 hover:bg-blue-500/30 text-white h-10 w-10 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                onClick={nextFeatured}
                className="rounded-full bg-black/50 hover:bg-blue-500/30 text-white h-10 w-10 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {websites.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeatured(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentFeatured === index ? "bg-blue-500 w-6" : "bg-gray-500 hover:bg-gray-400"
                  }`}
                >
                  <span className="sr-only">Website {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => setFilter(category.id)}
              className={`rounded-full px-6 ${
                filter === category.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  : "border-blue-500 text-white hover:bg-blue-500/20"
              }`}
            >
              <motion.span whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                {category.label}
              </motion.span>
            </Button>
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
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredWebsites.map((website) => (
                <motion.div
                  key={website.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="bg-gray-800/40 backdrop-blur-sm border-0 overflow-hidden group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 h-full">
                    <div className="relative overflow-hidden h-48">
                      <Image
                        src={website.image || "/placeholder.svg"}
                        alt={website.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <Button
                          asChild
                          variant="ghost"
                          className="rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-white"
                        >
                          <Link href={website.url} target="_blank" rel="noopener noreferrer">
                            <span className="flex items-center">
                              Visit <ExternalLink className="ml-2 h-4 w-4" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {website.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{website.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {website.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
