"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, CheckCircle, Award, Download, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DownloadCV() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isDownloading, setIsDownloading] = useState(false)
  
  // CV file URL from Google Drive
  const cvFileUrl = "https://drive.google.com/file/d/10C7EtYGvwy8DUOef8XjsqLmecXJEML94/view?usp=sharing"
  
  // Google Drive direct download link (converted from sharing link)
  const directDownloadUrl = "https://drive.google.com/uc?export=download&id=10C7EtYGvwy8DUOef8XjsqLmecXJEML94"

  const cvHighlights = [
    "1+ years of experience in web development",
    "Proficient in React, Next.js, and Node.js",
    "Video editing expertise with Adobe Premiere Pro",
    "UI/UX design skills with Figma",
    "Strong problem-solving abilities",
  ]

  const handleDownload = () => {
    setIsDownloading(true)
    
    // Create a hidden anchor element for download
    const link = document.createElement("a")
    link.href = directDownloadUrl
    link.setAttribute("download", "Krishna_Kumar_Jha_CV.pdf")
    document.body.appendChild(link)
    
    // Trigger the download
    link.click()
    
    // Clean up and remove the link
    document.body.removeChild(link)
    
    // Reset download state after a short delay
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }
  
  const handleViewOnline = () => {
    // Open the CV in a new tab
    window.open(cvFileUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="download-cv" className="py-20 bg-black relative overflow-hidden">
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
      </div>

      {/* Floating document icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 14}px`,
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
            <FileText />
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
              <FileText className="h-4 w-4 mr-2" /> Resume
            </Badge>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Download My CV</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get a comprehensive overview of my skills, experience, and qualifications. My CV highlights my journey as a
            developer and creative professional.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                      <Award className="h-6 w-6 text-rose-500 mr-2" /> CV Highlights
                    </h3>

                    <div className="space-y-4 mb-8">
                      {cvHighlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          className="flex items-start group"
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 shrink-0 group-hover:text-blue-400 transition-colors" />
                          <p className="text-gray-300 group-hover:text-white transition-colors">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <p className="text-gray-400 italic mb-6">
                        "My CV represents not just my past achievements, but my passion for creating exceptional digital
                        experiences. And yes, I've fixed all the typos this time!"
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-full px-6 py-2 font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      >
                        <motion.span
                          className="flex items-center"
                          animate={isDownloading ? { scale: [1, 0.97, 1] } : {}}
                          transition={{ repeat: isDownloading ? Number.POSITIVE_INFINITY : 0, duration: 0.5 }}
                        >
                          {isDownloading ? (
                            <>
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
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" /> Download CV
                            </>
                          )}
                        </motion.span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleViewOnline}
                        className="border-2 border-blue-500 text-white hover:bg-blue-500/20 rounded-full px-6 py-2 font-medium transition-all"
                      >
                        <motion.span
                          className="flex items-center"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" /> View Online
                        </motion.span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="relative w-64 h-80 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.2)] border border-blue-500/20 overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />

                    <div className="absolute inset-2 bg-gray-900 rounded-lg flex flex-col items-center justify-center p-4">
                      <FileText className="h-16 w-16 text-blue-500 mb-4" />
                      <h4 className="text-xl font-bold text-white mb-2">Nayan Mondal</h4>
                      <p className="text-blue-400 mb-4">Full Stack Developer</p>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-4"></div>
                      <div className="space-y-2 w-full">
                        <div className="w-full h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-3/4 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-full h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2/3 h-2 bg-gray-800 rounded-full"></div>
                      </div>

                      <motion.div
                        className="absolute bottom-4 right-4 bg-rose-500/20 rounded-full p-2"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      >
                        <Download className="h-4 w-4 text-blue-400" />
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-gray-400 text-sm">Available in PDF, DOCX, and printable formats</p>
                    <p className="text-gray-500 text-xs mt-1">Last updated: Nov 2025</p>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}