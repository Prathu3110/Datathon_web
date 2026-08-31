"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { challenges } from "@/lib/challenges"

const TOTAL = challenges.length

export function ScrollProgress() {
  const [current, setCurrent] = useState(1)
  const [active, setActive] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const sections = challenges
      .map((c) => document.getElementById(`challenge-${c.number}`))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const compute = () => {
      const scrollY = window.scrollY
      const viewportMid = scrollY + window.innerHeight * 0.45
      const first = sections[0]
      const last = sections[sections.length - 1]
      const firstTop = first.offsetTop
      const lastBottom = last.offsetTop + last.offsetHeight

      const withinRange = scrollY + window.innerHeight >= firstTop && scrollY <= lastBottom
      setActive(withinRange)

      if (withinRange) {
        let closestIndex = 0
        let closestDistance = Number.POSITIVE_INFINITY
        for (let i = 0; i < sections.length; i++) {
          const el = sections[i]
          const top = el.offsetTop
          const dist = Math.abs(top - viewportMid)
          if (top <= viewportMid && dist < closestDistance) {
            closestDistance = dist
            closestIndex = i
          }
        }
        setCurrent(closestIndex + 1)
      }
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        compute()
        rafRef.current = null
      })
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const progress = current / TOTAL

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed bottom-6 left-6 z-40 md:bottom-10 md:left-10"
          aria-hidden
        >
          {/* Desktop: full label */}
          <div className="hidden flex-col gap-2 md:flex">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Challenge
              </span>
              <span className="font-display text-sm font-bold tabular-nums text-ink">
                {String(current).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
              </span>
            </div>
            <div className="h-[1.5px] w-20 bg-line">
              <motion.div
                className="h-full bg-ink"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Mobile: simplified */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="font-display text-xs font-bold tabular-nums text-ink">
              {String(current).padStart(2, "0")}/{String(TOTAL).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
