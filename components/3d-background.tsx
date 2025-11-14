"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, Text } from "@react-three/drei"
import { Vector3, MathUtils } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

function FloatingParticles({ count = 50, color = "#e11d48" }) {
  const { viewport } = useThree()
  const particles = useRef<any[]>([])

  useEffect(() => {
    particles.current = Array.from({ length: count }).map(() => ({
      position: new Vector3(
        (Math.random() - 0.5) * viewport.width * 2,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * 10,
      ),
      velocity: new Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01),
      size: Math.random() * 0.2 + 0.1,
    }))
  }, [count, viewport])

  useFrame(() => {
    particles.current.forEach((particle) => {
      particle.position.add(particle.velocity)

      // Boundary check
      if (Math.abs(particle.position.x) > viewport.width) {
        particle.position.x = Math.sign(particle.position.x) * viewport.width
        particle.velocity.x *= -1
      }
      if (Math.abs(particle.position.y) > viewport.height) {
        particle.position.y = Math.sign(particle.position.y) * viewport.height
        particle.velocity.y *= -1
      }
      if (Math.abs(particle.position.z) > 10) {
        particle.position.z = Math.sign(particle.position.z) * 10
        particle.velocity.z *= -1
      }
    })
  })

  return (
    <>
      {particles.current.map((particle, i) => (
        <motion.mesh
          key={i}
          position={[particle.position.x, particle.position.y, particle.position.z]}
          animate={{
            y: particle.position.y + (Math.random() - 0.5) * 2,
            x: particle.position.x + (Math.random() - 0.5) * 2,
            z: particle.position.z + (Math.random() - 0.5) * 2,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
        </motion.mesh>
      ))}
    </>
  )
}

function FloatingLogo() {
  const mesh = useRef<any>()

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = MathUtils.lerp(
        mesh.current.rotation.y,
        Math.sin(clock.getElapsedTime() * 0.5) * 0.2,
        0.05,
      )
      mesh.current.rotation.x = MathUtils.lerp(
        mesh.current.rotation.x,
        Math.sin(clock.getElapsedTime() * 0.3) * 0.1,
        0.05,
      )
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <motion.mesh
        ref={mesh}
        animate={{
          y: [0, 0.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Text
          font="/fonts/Geist_Bold.json"
          fontSize={1.2}
          color="#e11d48"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
          maxWidth={10}
          textAlign="center"
        >
          KKJ
        </Text>
        <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.5} />
      </motion.mesh>
    </Float>
  )
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <MotionConfig transition={{ duration: 0.5 }}>
          {/* Removed floating particles */}
          <FloatingLogo />
        </MotionConfig>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
