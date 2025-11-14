"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Timeline from "@/components/timeline"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedSkillBars from "@/components/animated-skill-bars"
import SkillsChart from "@/components/skills-chart"
import EnhancedLoadingScreen from "@/components/enhanced-loading-screen"
import FunnyCursor from "@/components/funny-cursor"
import DownloadCV from "@/components/download-cv"
import PersonalSection from "@/components/personal-section"
import SectionDivider from "@/components/section-divider"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState("home")
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    // Show loading screen for 3 seconds then hide it
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "skills-chart",
        "timeline",
        "personal",
        "services",
        "download-cv",
        "contact",
      ]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Create refs for each section for smooth scrolling
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "skills-chart",
      "timeline",
      "personal",
      "services",
      "download-cv",
      "contact",
    ]
    sections.forEach((section) => {
      sectionsRef.current[section] = document.getElementById(section)
    })
  }, [loading])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <EnhancedLoadingScreen key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black text-white"
          >
            <FunnyCursor />
            <ScrollProgress />
            
            <Navbar currentSection={currentSection} />

            <SectionWrapper id="home">
              <Hero />
            </SectionWrapper>

            <SectionWrapper id="about">
              <About />
            </SectionWrapper>

            <SectionWrapper id="skills">
              <AnimatedSkillBars />
            </SectionWrapper>

            <SectionWrapper id="skills-chart">
              <SkillsChart />
            </SectionWrapper>

            <SectionWrapper id="timeline">
              <Timeline />
            </SectionWrapper>

            <SectionWrapper id="personal">
              <PersonalSection />
            </SectionWrapper>

            {/* Section Divider */}
            <SectionDivider
              image="https://imgs.search.brave.com/G2RnsftdIZT0ysOhfFrjp2wX_qEH_yvUaNslm16Tf8w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYmxh/Y2stc3BhY2UtYmFj/a2dyb3VuZC1weGhk/d2g0b2xwYzNjMXZ3/LmpwZw"
              alt="Passion & Creativity"
              position="left"
              className="my-10"
            />

            <SectionWrapper id="services">
              <Services />
            </SectionWrapper>

            <SectionWrapper id="download-cv">
              <DownloadCV />
            </SectionWrapper>

            <SectionWrapper id="contact">
              <Contact />
            </SectionWrapper>

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

// Section wrapper component for smooth transitions
function SectionWrapper({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
    margin: "-100px 0px -100px 0px",
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="section-transition"
    >
      {children}
    </motion.div>
  )
}
