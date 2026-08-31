"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { challenges, accentColorMap, pad2 } from "@/lib/challenges"
import { illustrationMap } from "@/components/illustrations"
import { CollegeLogo } from "@/components/college-logo"

/** Seconds for one full revolution of the ring. */
const ORBIT_SECONDS = 26

interface LoadingMatrixProps {
  /** Total run time, used to drive the progress readout. */
  durationMs: number
}

/**
 * The handoff screen between clip 2 and the site.
 *
 * Deliberately mirrors clip 2's final frame — pure black with the SRM mark at
 * top-left — so the crossfade out of video has no visible seam. The orbiting
 * ring reprises the clip's own "LOADING CHALLENGE MATRIX" motif, but built
 * from the site's real challenge data and illustrations rather than a copy, so
 * it stays correct if the challenge list ever changes.
 *
 * The logo sits on the same grid the site header uses (max-w-[1400px], px-6 /
 * md:px-10, py-4), so when the site is revealed the mark is already where the
 * header will draw it.
 */
export function LoadingMatrix({ durationMs }: LoadingMatrixProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const started = performance.now()
    let frame = 0
    const tick = () => {
      const elapsed = performance.now() - started
      setProgress(Math.min(100, (elapsed / durationMs) * 100))
      if (elapsed < durationMs) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [durationMs])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#04080a]">
      {/* Logo on the site header's exact grid — it lands in place on reveal. */}
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1400px] items-center px-6 py-4 md:px-10">
          <CollegeLogo className="h-12 sm:h-14 md:h-16" />
        </div>
      </div>

      {/* Orbiting challenge icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{
            // one shared radius drives ring size, icon size and the core
            ["--r" as string]: "clamp(104px, 26vmin, 230px)",
            width: "calc(var(--r) * 2)",
            height: "calc(var(--r) * 2)",
          }}
        >
          {/* core */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.14, 1], opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-[calc(var(--r)*0.42)] w-[calc(var(--r)*0.42)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green blur-xl"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: ORBIT_SECONDS * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[calc(var(--r)*1.05)] w-[calc(var(--r)*1.05)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border"
          />

          {/* ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: ORBIT_SECONDS, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0"
          >
            {challenges.map((challenge, index) => {
              const Illustration = illustrationMap[challenge.illustration]
              const angle = (index / challenges.length) * 360
              return (
                <div
                  key={challenge.id}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{ transform: `rotate(${angle}deg) translateY(calc(var(--r) * -1))` }}
                >
                  {/* counter-rotate so every icon stays upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: ORBIT_SECONDS, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{ rotate: -angle }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`flex h-[calc(var(--r)*0.42)] w-[calc(var(--r)*0.42)] items-center justify-center rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-sm ${accentColorMap[challenge.accent].text}`}
                      style={{ filter: "drop-shadow(0 0 14px currentColor)" }}
                    >
                      {Illustration && <Illustration className="h-full w-full" animate="hover" />}
                    </motion.div>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Caption + progress — echoes the clip's own wording */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-14 md:pb-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-center text-[11px] font-bold uppercase tracking-[0.22em] text-ink-muted md:text-[13px]"
          >
            Loading Challenge Matrix
          </motion.p>

          <div className="h-[2px] w-56 overflow-hidden bg-border md:w-80">
            <motion.div
              className="h-full bg-accent-green"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="font-display text-[11px] font-bold tabular-nums tracking-[0.18em] text-ink">
            {pad2(Math.round((progress / 100) * challenges.length))} / {pad2(challenges.length)}
          </p>
        </div>
      </div>
    </div>
  )
}
