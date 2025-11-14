"use client"

import { createContext, useContext, useRef, useEffect, useState, type ReactNode } from "react"

interface SmoothScrollContextType {
  scrollY: number
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollY: 0,
})

export const useSmoothScroll = () => useContext(SmoothScrollContext)

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    if (!containerRef.current || !scrollableRef.current) return

    const updateHeights = () => {
      setWindowHeight(window.innerHeight)
      setDocumentHeight(scrollableRef.current?.scrollHeight || 0)
    }

    updateHeights()
    window.addEventListener("resize", updateHeights)

    // Create a fake scrollbar
    const onScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("resize", updateHeights)
      window.removeEventListener("scroll", onScroll)
    }
  }, [isMobile])

  // Apply the scroll position to the container
  useEffect(() => {
    if (isMobile) return
    if (!containerRef.current) return

    const transform = `translateY(-${scrollY}px)`
    containerRef.current.style.transform = transform
  }, [scrollY, isMobile])

  if (isMobile) {
    return <SmoothScrollContext.Provider value={{ scrollY: window.scrollY }}>{children}</SmoothScrollContext.Provider>
  }

  return (
    <SmoothScrollContext.Provider value={{ scrollY }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          ref={containerRef}
          style={{
            willChange: "transform",
          }}
        >
          <div
            ref={scrollableRef}
            style={{
              position: "relative",
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div style={{ height: documentHeight }} />
    </SmoothScrollContext.Provider>
  )
}
