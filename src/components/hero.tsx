"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroRobotIllustration } from "./illustrations"
import { totalCount, openCount, pad2 } from "@/lib/challenges"

const lines = ["DATATHON", "2K26"]

interface HeroProps {
  ready?: boolean
}

export function Hero({ ready = true }: HeroProps) {
  const [revealed, setRevealed] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)

  const handleCounterClick = () => {
    setRevealed(true)
    window.setTimeout(() => setRevealed(false), 1800)
  }

  const handleTitleClick = () => {
    setIsFlashing(true)
    window.setTimeout(() => setIsFlashing(false), 700)
  }

  return (
    <section id="top" className="relative overflow-x-clip pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="hero-aura" aria-hidden />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-1.5"
        >
          <p className="text-base font-bold uppercase tracking-[0.16em] text-accent-green sm:text-lg md:text-xl lg:text-2xl">
            SRM Ramapuram - Institute Of Science And Technology
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-muted sm:text-base md:text-lg">
            Department of CSE with specialization in Big Data Analytics and Cloud Computing
          </p>
        </motion.div>

        <h1
          className="mt-6 overflow-hidden font-display leading-[0.86] cursor-pointer select-none"
          onClick={handleTitleClick}
          title="Click me!"
        >
          {lines.map((line, idx) => (
            <motion.span
              key={line}
              data-text={line}
              initial={{ y: 36, opacity: 0 }}
              animate={ready ? { y: 0, opacity: 1 } : { y: 36, opacity: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.08 + idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`chrome-text text-[12vw] font-black tracking-tight sm:text-[13vw] md:text-[12vw] ${isFlashing ? "chrome-flash" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="max-w-md"
          >

            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              <span>Inter-Department Hackathon</span>
              <span className="h-[1px] w-5 bg-line hidden sm:block" aria-hidden />
              <span>BDA &amp; CC × Robotics</span>
            </p>

            {/* ── Registration CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-7 flex items-center gap-4"
            >
              <a
                id="hero-register-btn"
                href="#register"
                className="hero-register-btn"
              >
                <span className="hero-register-pulse" aria-hidden />
                Register&nbsp;Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                via Google&nbsp;Forms
              </span>
            </motion.div>

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
                      {pad2(totalCount)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-ink-muted" aria-label={`${totalCount} problem statements`}>
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
            animate={
              ready
                ? {
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                  }
                : { opacity: 0, scale: 0.92 }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.25 },
              scale: { duration: 0.6, delay: 0.25 },
              y: { duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 },
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
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
