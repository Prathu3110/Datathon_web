"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroRobotIllustration } from "./illustrations"

const lines = ["DATATHON", "2K26"]

export function Hero() {
  const [revealed, setRevealed] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)

  const handleCounterClick = () => {
    setRevealed(true)
    window.setTimeout(() => setRevealed(false), 1800)
  }

  const handleTitleClick = () => {
    setIsFlashing(true)
    window.setTimeout(() => setIsFlashing(false), 500)
  }

  return (
    <section id="top" className="relative overflow-x-clip pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-start gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted md:flex-row md:items-center md:gap-4">
          <span>Inter-Department Hackathon</span>
          <span className="hidden h-[1px] w-6 bg-line md:block" aria-hidden />
          <span>BDA &amp; CC × Robotics</span>
        </div>

        <h1
          className="mt-6 overflow-hidden font-display leading-[0.86] cursor-pointer select-none"
          onClick={handleTitleClick}
          title="Click me!"
        >
          {lines.map((line) => (
            <motion.span
              key={line}
              initial={{ y: "0.6em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: lines.indexOf(line) * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`chrome-text text-[12vw] font-black tracking-tight sm:text-[13vw] md:text-[12vw] ${isFlashing ? "chrome-flash" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-md"
          >
            <p className="text-balance text-lg leading-relaxed text-ink-muted">
              Twelve problem statements. Two disciplines. Eleven official challenges — plus one open canvas for whatever you dare to build.
            </p>
            <button
              type="button"
              onClick={handleCounterClick}
              className="mt-6 flex items-center gap-3 text-left"
              aria-label="Problem statement count"
            >
              <span className="font-display w-10 text-4xl font-black text-ink">
                <AnimatePresence mode="wait" initial={false}>
                  {revealed ? (
                    <motion.span
                      key="egg"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      0
                    </motion.span>
                  ) : (
                    <motion.span
                      key="count"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      12
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-ink-muted" aria-label="12 problem statements">
                {revealed ? (
                  <>
                    Excuses
                    <br />
                    Allowed
                  </>
                ) : (
                  <>
                    Problem
                    <br />
                    Statements
                  </>
                )}
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.35 },
              scale: { duration: 0.6, delay: 0.35 },
              y: { duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 },
            }}
            data-cursor="expand"
            className="text-ink-muted"
            aria-hidden
          >
            <HeroRobotIllustration className="h-32 w-32 md:h-40 md:w-40" />
          </motion.div>
        </div>

        <motion.a
          href="#challenges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink md:mt-24"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
