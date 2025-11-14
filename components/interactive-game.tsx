"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Trophy, Play, Pause, RefreshCw, Code, FileCode, Database, Palette, Film, Figma } from "lucide-react"

type GameItem = {
  x: number
  y: number
  type: string
  collected: boolean
  id: number
}

type Player = {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

export default function InteractiveGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [highScore, setHighScore] = useState(0)
  const [gameItems, setGameItems] = useState<GameItem[]>([])
  const playerRef = useRef<Player>({
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    speed: 5,
  })
  const keysPressed = useRef<{ [key: string]: boolean }>({})
  const animationFrameId = useRef<number>()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const gameLoopInterval = useRef<NodeJS.Timeout | null>(null)

  // Game icons and their point values
  const gameIcons = [
    { type: "html", icon: <FileCode className="text-orange-500" />, points: 1 },
    { type: "css", icon: <Palette className="text-blue-500" />, points: 1 },
    { type: "js", icon: <Code className="text-yellow-500" />, points: 2 },
    { type: "react", icon: <Code className="text-cyan-500" />, points: 3 },
    { type: "database", icon: <Database className="text-green-500" />, points: 3 },
    { type: "design", icon: <Figma className="text-purple-500" />, points: 2 },
    { type: "video", icon: <Film className="text-red-500" />, points: 2 },
  ]

  // Initialize game
  const initGame = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Initialize player position
    playerRef.current = {
      x: canvas.width / 2 - 20,
      y: canvas.height - 60,
      width: 40,
      height: 40,
      speed: 5,
    }

    // Generate initial items
    generateItems(10)

    // Reset game state
    setScore(0)
    setTimeLeft(30)
    setGameStarted(true)
    setGamePaused(false)
  }

  // Generate random game items
  const generateItems = (count: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const newItems: GameItem[] = []

    for (let i = 0; i < count; i++) {
      newItems.push({
        x: Math.random() * (canvas.width - 30),
        y: Math.random() * (canvas.height / 2),
        type: gameIcons[Math.floor(Math.random() * gameIcons.length)].type,
        collected: false,
        id: Date.now() + i,
      })
    }

    setGameItems((prev) => [...prev, ...newItems])
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gamePaused) return

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("portfolioGameHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Game over
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Add new items periodically
    const itemGenerator = setInterval(() => {
      generateItems(3)
    }, 3000)

    // Main game loop
    const gameLoop = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move player based on keys pressed
      if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
        playerRef.current.x = Math.max(0, playerRef.current.x - playerRef.current.speed)
      }
      if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
        playerRef.current.x = Math.min(
          canvas.width - playerRef.current.width,
          playerRef.current.x + playerRef.current.speed,
        )
      }
      if (keysPressed.current["ArrowUp"] || keysPressed.current["w"]) {
        playerRef.current.y = Math.max(0, playerRef.current.y - playerRef.current.speed)
      }
      if (keysPressed.current["ArrowDown"] || keysPressed.current["s"]) {
        playerRef.current.y = Math.min(
          canvas.height - playerRef.current.height,
          playerRef.current.y + playerRef.current.speed,
        )
      }

      // Draw player
      ctx.fillStyle = isDark ? "#e11d48" : "#be123c"
      ctx.beginPath()
      ctx.roundRect(playerRef.current.x, playerRef.current.y, playerRef.current.width, playerRef.current.height, 8)
      ctx.fill()

      // Draw laptop icon on player
      ctx.fillStyle = isDark ? "white" : "white"
      ctx.font = "20px Arial"
      ctx.fillText("💻", playerRef.current.x + 10, playerRef.current.y + 25)

      // Check collisions and draw items
      const updatedItems = gameItems.map((item) => {
        if (item.collected) return item

        // Draw item
        ctx.fillStyle = getItemColor(item.type)
        ctx.beginPath()
        ctx.arc(item.x + 15, item.y + 15, 15, 0, Math.PI * 2)
        ctx.fill()

        // Draw icon
        ctx.fillStyle = "white"
        ctx.font = "12px Arial"
        ctx.fillText(getItemIcon(item.type), item.x + 8, item.y + 20)

        // Move item down slowly
        item.y += 1

        // Check if item is out of bounds
        if (item.y > canvas.height) {
          return { ...item, collected: true }
        }

        // Check collision with player
        if (
          item.x < playerRef.current.x + playerRef.current.width &&
          item.x + 30 > playerRef.current.x &&
          item.y < playerRef.current.y + playerRef.current.height &&
          item.y + 30 > playerRef.current.y
        ) {
          // Collision detected
          setScore((prev) => prev + getItemPoints(item.type))
          return { ...item, collected: true }
        }

        return item
      })

      // Update items state and remove collected ones
      setGameItems(updatedItems.filter((item) => !item.collected))

      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(gameLoop)
    }

    gameLoopInterval.current = setInterval(() => {
      if (!gamePaused && gameStarted) {
        animationFrameId.current = requestAnimationFrame(gameLoop)
      }
    }, 16)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      clearInterval(timer)
      clearInterval(itemGenerator)
      if (gameLoopInterval.current) {
        clearInterval(gameLoopInterval.current)
      }
    }
  }, [gameStarted, gamePaused, isDark])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // End game
  const endGame = () => {
    setGameStarted(false)

    // Update high score if needed
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("portfolioGameHighScore", score.toString())
    }

    // Clear game loop
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }

    if (gameLoopInterval.current) {
      clearInterval(gameLoopInterval.current)
    }

    // Clear items
    setGameItems([])
  }

  // Toggle pause
  const togglePause = () => {
    setGamePaused(!gamePaused)
  }

  // Helper functions for item properties
  const getItemColor = (type: string): string => {
    switch (type) {
      case "html":
        return "#e34c26"
      case "css":
        return "#264de4"
      case "js":
        return "#f0db4f"
      case "react":
        return "#61dafb"
      case "database":
        return "#4caf50"
      case "design":
        return "#9c27b0"
      case "video":
        return "#f44336"
      default:
        return "#cccccc"
    }
  }

  const getItemIcon = (type: string): string => {
    switch (type) {
      case "html":
        return "</>"
      case "css":
        return "CSS"
      case "js":
        return "JS"
      case "react":
        return "R"
      case "database":
        return "DB"
      case "design":
        return "D"
      case "video":
        return "▶"
      default:
        return "?"
    }
  }

  const getItemPoints = (type: string): number => {
    const icon = gameIcons.find((icon) => icon.type === type)
    return icon ? icon.points : 1
  }

  return (
    <section id="game" className="py-20 bg-gradient-to-b from-gray-950 to-black dark:from-gray-100 dark:to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-gray-900">Interactive Challenge</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
            Take a break and play this mini-game! Collect as many web development icons as you can before time runs out.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/40 dark:bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700/50 dark:bg-gray-200/50 rounded-lg px-4 py-2">
                  <span className="text-gray-300 dark:text-gray-700 font-medium">Score: </span>
                  <span className="text-rose-500 font-bold">{score}</span>
                </div>
                <div className="bg-gray-700/50 dark:bg-gray-200/50 rounded-lg px-4 py-2">
                  <span className="text-gray-300 dark:text-gray-700 font-medium">Time: </span>
                  <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-cyan-500"}`}>{timeLeft}s</span>
                </div>
              </div>
              <div className="bg-gray-700/50 dark:bg-gray-200/50 rounded-lg px-4 py-2">
                <span className="text-gray-300 dark:text-gray-700 font-medium">High Score: </span>
                <span className="text-amber-500 font-bold">{highScore}</span>
              </div>
            </div>

            <div className="relative">
              <canvas ref={canvasRef} className="w-full h-[400px] bg-gray-900/70 dark:bg-gray-100/70 rounded-lg" />

              {!gameStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 dark:bg-gray-100/80 rounded-lg">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center p-6 rounded-xl max-w-md"
                  >
                    <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-white dark:text-gray-900">Web Dev Collector</h3>
                    <p className="text-gray-300 dark:text-gray-700 mb-6">
                      Use arrow keys or WASD to move. Collect web development icons to score points!
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {gameIcons.map((icon, index) => (
                        <div key={index} className="flex items-center bg-gray-800/50 dark:bg-white/50 p-2 rounded-lg">
                          <div className="w-8 h-8 flex items-center justify-center mr-2">{icon.icon}</div>
                          <div className="text-gray-300 dark:text-gray-700">
                            <span className="text-xs block">+{icon.points}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={initGame}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-full px-8 py-6 text-lg font-medium transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    >
                      <Play className="mr-2 h-5 w-5" /> Start Game
                    </Button>
                  </motion.div>
                </div>
              )}

              {gameStarted && gamePaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 dark:bg-gray-100/80 rounded-lg">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-6 rounded-xl"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white dark:text-gray-900">Game Paused</h3>
                    <div className="flex space-x-4">
                      <Button
                        onClick={togglePause}
                        className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white border-0 rounded-full px-6 py-2"
                      >
                        <Play className="mr-2 h-5 w-5" /> Resume
                      </Button>
                      <Button
                        onClick={endGame}
                        variant="outline"
                        className="border-2 border-blue-500 text-white dark:text-gray-800 hover:bg-blue-500/20 rounded-full px-6 py-2"
                      >
                        <RefreshCw className="mr-2 h-5 w-5" /> Restart
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {gameStarted && !gamePaused && (
              <div className="mt-4 flex justify-center space-x-4">
                <Button
                  onClick={togglePause}
                  className="bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800 rounded-full px-6 py-2"
                >
                  <Pause className="mr-2 h-5 w-5" /> Pause
                </Button>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-400 dark:text-gray-600 text-center">
              <p>Tip: Use arrow keys or WASD to move your character and collect the falling icons!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
