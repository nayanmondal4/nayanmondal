"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function MovingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Removed animated background elements */}
    </div>
  )
}
