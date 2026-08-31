"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DatathonIconsAnimation } from "./datathon-icons-animation"
import { totalCount, pad2 } from "@/lib/challenges"

const DATATHON_LETTERS = "DATATHON".split("")

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
    <section
      id="top"
      className="relative overflow-x-clip"
      style={{ height: "100svh", minHeight: 600, display: "flex", flexDirection: "column" }}
    >
      <div className="hero-aura" aria-hidden />

      {/* Full-section animation overlay */}
      <DatathonIconsAnimation ready={ready} />

      {/* Main content — fills full height as a flex column */}
      <div
        className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 flex flex-col"
        style={{ flex: 1, paddingTop: "clamp(88px, 10vw, 140px)", paddingBottom: "clamp(32px, 4vw, 64px)" }}
      >
        {/* ── Top area: University names ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-1"
        >
          <p className="font-display text-sm font-bold uppercase tracking-wider text-accent-green sm:text-base md:text-xl lg:text-2xl">
            SRM Institute Of Science And Technology
          </p>
          <p className="font-display text-xs font-semibold uppercase tracking-wide text-ink-muted sm:text-sm md:text-base">
            Department of CSE with specialization in Big Data Analytics and Cloud Computing
          </p>
        </motion.div>

        {/* ── Middle area: Two column layout — title left, orbit right ── */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center" style={{ flex: 1 }}>

          {/* Left Column: DATATHON title + CTA */}
          <div className="flex flex-col justify-center md:w-[60%] md:pr-4 min-w-0">
            {/* DATATHON 2K26 Title */}
            <h1
              className="overflow-visible font-display leading-[0.84] cursor-pointer select-none"
              onClick={handleTitleClick}
              title="Click me!"
            >
              <motion.span
                data-text="DATATHON"
                initial={{ y: 40, opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`chrome-text font-black tracking-[-0.03em] pr-2 ${isFlashing ? "chrome-flash" : ""}`}
                style={{ fontSize: "clamp(44px, 7.4vw, 124px)" }}
              >
                {DATATHON_LETTERS.map((char, i) => (
                  <span key={i} data-datathon-letter={i}>{char}</span>
                ))}
              </motion.span>

              <motion.span
                data-text="2K26"
                initial={{ y: 40, opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`chrome-text font-black tracking-[-0.03em] pr-2 ${isFlashing ? "chrome-flash" : ""}`}
                style={{ fontSize: "clamp(44px, 7.4vw, 124px)" }}
              >
                2K26
              </motion.span>
            </h1>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 md:mt-8"
            >
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                <span>Inter-Department Hackathon</span>
                <span className="h-[1px] w-5 bg-line hidden sm:block" aria-hidden />
                <span>BDA &amp; CC × Robotics</span>
              </p>

              <div className="mt-5 flex items-center gap-4">
                <a id="hero-register-btn" href="#register" className="hero-register-btn">
                  <span className="hero-register-pulse" aria-hidden />
                  Register&nbsp;Now
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </a>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  via Google&nbsp;Forms
                </span>
              </div>

              <button
                type="button"
                onClick={handleCounterClick}
                className="mt-5 flex items-center gap-3 text-left"
                aria-label="Problem statement count"
              >
                <span className="font-display w-10 text-4xl font-black text-ink">
                  <AnimatePresence mode="wait" initial={false}>
                    {revealed ? (
                      <motion.span key="egg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="block">0</motion.span>
                    ) : (
                      <motion.span key="count" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="block">{pad2(totalCount)}</motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-ink-muted" aria-label={`${totalCount} problem statements`}>
                  {revealed ? (<>Excuses<br />Allowed</>) : (<>Problem<br />Statements</>)}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: orbit anchor — the animation overlay positions into this */}
          <div
            id="hero-orbit-anchor"
            className="hidden md:flex md:w-[40%] items-center justify-center pointer-events-none"
            style={{ minHeight: "min(500px, 52vh)" }}
            aria-hidden
          />
        </div>

        {/* ── Bottom: Scroll CTA ── */}
        <motion.a
          href="#challenges"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 self-start inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >↓</motion.span>
        </motion.a>
      </div>
    </section>
  )
}
