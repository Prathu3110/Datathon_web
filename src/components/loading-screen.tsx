"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

const statusLogs = [
  "INITIALIZING KERNEL...",
  "LOADING TRACKS: BDA & CC × ROBOTICS...",
  "PARSING 8 PROBLEM STATEMENTS...",
  "COMPILING INTERACTIVE CANVAS...",
  "SYSTEM ONLINE",
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)

  useEffect(() => {
    // Lock scroll during boot
    document.body.style.overflow = "hidden"

    const startTime = performance.now()
    const duration = 1100 // 1.1s smooth boot time

    let animationFrameId: number

    const update = (now: number) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(1, elapsed / duration)
      // Ease out cubic progress for snappy tech feel
      const easedProgress = Math.floor((1 - Math.pow(1 - rawProgress, 3)) * 100)
      setProgress(easedProgress)

      const currentLog = Math.min(
        statusLogs.length - 1,
        Math.floor(rawProgress * statusLogs.length)
      )
      setLogIndex(currentLog)

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(update)
      } else {
        setProgress(100)
        setTimeout(() => {
          document.body.style.overflow = ""
          onComplete()
        }, 220)
      }
    }

    animationFrameId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.body.style.overflow = ""
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -16,
        filter: "blur(6px)",
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#04080a] text-foreground select-none"
    >
      {/* Background ambient neon pulse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.15) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6">
        {/* Top Header Badge */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          <span className="font-display text-xs font-black tracking-[0.25em] uppercase text-ink">
            Datathon 2K26
          </span>
          <span className="text-[10px] font-mono font-semibold text-ink-muted/80 tracking-wider">
            // BOOT
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#0c1a14] border border-[#0d3324]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-green via-[#00e5ff] to-accent-green"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 12px rgba(0, 255, 136, 0.6)",
            }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Status Line & Percentage */}
        <div className="mt-4 flex w-full items-center justify-between font-mono text-[11px]">
          <span className="text-ink-muted tracking-wider uppercase truncate max-w-[240px]">
            {statusLogs[logIndex]}
          </span>
          <span className="font-bold text-accent-green tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
