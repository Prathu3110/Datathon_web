"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorMode = "default" | "view" | "expand"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 })
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    const isTouch = "ontouchstart" in window
    if (!isFinePointer || isTouch) return

    setEnabled(true)
    document.documentElement.classList.add("custom-cursor-active")

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      const viewTarget = target?.closest<HTMLElement>('[data-cursor="view"]')
      const expandTarget = target?.closest<HTMLElement>('[data-cursor="expand"]')

      if (viewTarget) setMode("view")
      else if (expandTarget) setMode("expand")
      else setMode("default")
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.documentElement.classList.remove("custom-cursor-active")
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          width: mode === "view" ? 56 : mode === "expand" ? 40 : 10,
          height: mode === "view" ? 56 : mode === "expand" ? 40 : 10,
          x: mode === "view" ? -28 : mode === "expand" ? -20 : -5,
          y: mode === "view" ? -28 : mode === "expand" ? -20 : -5,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-center rounded-full transition-colors ${
          mode === "view"
            ? "border border-accent-green bg-accent-green text-[#04080a] shadow-[0_0_15px_rgba(0,255,136,0.5)]"
            : mode === "expand"
            ? "border border-accent-green/60 bg-accent-green/20 backdrop-blur-xs"
            : "bg-accent-green shadow-[0_0_8px_rgba(0,255,136,0.8)]"
        }`}
      >
        {mode === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black uppercase tracking-[0.1em]"
          >
            View ↗
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
