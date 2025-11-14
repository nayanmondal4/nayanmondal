"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

// Dynamically import the 3D component with no SSR to avoid React context issues
const ThreeDModelViewer = dynamic(() => import("./three-d-model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black dark:from-gray-200 dark:to-white rounded-xl">
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-rose-500 font-medium">Loading 3D Model...</p>
      </div>
    </div>
  ),
})

export default function Interactive3DSection() {
  const [color, setColor] = useState("#e11d48")
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section
      id="interactive"
      className="py-20 bg-gradient-to-b from-gray-950 to-black dark:from-gray-100 dark:to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-gray-900">Interactive Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
            Play with this interactive 3D model. Rotate, zoom, and customize it to see my 3D capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl font-bold mb-4 text-white dark:text-gray-900">Explore in 3D</h3>
            <p className="text-gray-300 dark:text-gray-700 mb-6">
              This interactive 3D model demonstrates my ability to create engaging web experiences. As a developer who
              values user interaction, I incorporate elements like this to make websites more memorable and engaging.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-gray-900">Rotate the Model</h4>
                  <p className="text-gray-400 dark:text-gray-600">
                    Click and drag to rotate the 3D model and view it from different angles.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-gray-900">Zoom In/Out</h4>
                  <p className="text-gray-400 dark:text-gray-600">
                    Use the scroll wheel or pinch gesture to zoom in and out.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mr-4">
                  <span className="text-rose-500 font-bold">03</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white dark:text-gray-900">Change Colors</h4>
                  <p className="text-gray-400 dark:text-gray-600">
                    Select different colors to see how I can create customizable experiences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <ThreeDModelViewer color={color} setColor={setColor} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
