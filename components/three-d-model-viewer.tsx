"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, ZoomIn, ZoomOut, Palette } from "lucide-react"
import * as THREE from "three"

// Create a simple duck model component
function DuckModel({ scale, color }) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const modelRef = useRef()

  useEffect(() => {
    if (scene) {
      scene.traverse((node) => {
        if (node.isMesh && node.material) {
          // Clone the material to avoid modifying the cached original
          node.material = node.material.clone()
          if (node.material.color) {
            node.material.color.set(color)
          }
        }
      })
    }
  }, [scene, color])

  return <primitive ref={modelRef} object={scene} scale={[scale, scale, scale]} position={[0, -1, 0]} />
}

export default function ThreeDModelViewer({ color, setColor }) {
  const [scale, setScale] = useState(2)
  const [autoRotate, setAutoRotate] = useState(true)
  const controlsRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const colors = [
    "#3b82f6", // blue-500
    "#1d4ed8", // blue-700
    "#1e40af", // blue-800
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#8b5cf6", // violet-500
    "#000000", // black
    "#ffffff", // white
  ]

  // Preload the model
  useEffect(() => {
    const loader = new THREE.GLTFLoader()
    loader.load(
      "/assets/3d/duck.glb",
      () => setIsLoaded(true),
      undefined,
      (e) => setError(e.message),
    )
  }, [])

  if (error) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black dark:from-gray-200 dark:to-white rounded-xl">
        <div className="text-center p-6">
          <p className="text-blue-500 font-medium">Failed to load 3D model: {error}</p>
          <p className="text-gray-400 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[500px] bg-gradient-to-br from-gray-900 to-black dark:from-gray-200 dark:to-white rounded-xl overflow-hidden shadow-xl relative">
      {isLoaded ? (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <DuckModel scale={scale} color={color} />

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
          <Environment preset="city" />
          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableZoom={true}
            enablePan={true}
            minDistance={3}
            maxDistance={10}
          />
        </Canvas>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-500 font-medium">Loading 3D Model...</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 bg-black/20 dark:bg-white/20 backdrop-blur-md p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-white dark:text-gray-900 text-sm font-medium">Scale</span>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full"
              onClick={() => setScale(Math.max(0.5, scale - 0.5))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Slider
              value={[scale]}
              min={0.5}
              max={5}
              step={0.1}
              onValueChange={(value) => setScale(value[0])}
              className="w-32"
            />
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full"
              onClick={() => setScale(Math.min(5, scale + 0.5))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white dark:text-gray-900 text-sm font-medium">Color</span>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-white dark:text-gray-900" />
            <div className="flex gap-1">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    color === c ? "scale-125 ring-2 ring-white dark:ring-gray-900" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Set color to ${c}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white dark:text-gray-900 text-sm font-medium">Controls</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8" onClick={() => setAutoRotate(!autoRotate)}>
              {autoRotate ? "Stop Rotation" : "Auto Rotate"}
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={resetCamera}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
