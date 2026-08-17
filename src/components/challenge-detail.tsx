"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { challenges, accentColorMap } from "@/lib/challenges"
import { illustrationMap } from "./illustrations"

interface ChallengeDetailProps {
  challengeId: string | null
  onClose: () => void
}

export function ChallengeDetail({ challengeId, onClose }: ChallengeDetailProps) {
  const challenge = challenges.find((c) => c.id === challengeId) ?? null
  const [illustrationHovered, setIllustrationHovered] = useState(false)

  useEffect(() => {
    if (!challenge) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [challenge, onClose])

  return (
    <AnimatePresence>
      {challenge && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={challenge.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-background"
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto min-h-full max-w-[1100px] px-6 py-24 md:px-10 md:py-32"
          >
            <button
              type="button"
              onClick={onClose}
              data-cursor="view"
              className="fixed right-6 top-6 z-10 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink md:right-10 md:top-8"
            >
              Close ✕
            </button>

            <button
              type="button"
              onClick={onClose}
              data-cursor="view"
              className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
            >
              <span aria-hidden>←</span> Back to Challenges
            </button>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Challenge {challenge.number} / {String(challenges.length).padStart(2, "0")} — {challenge.track}
            </p>

            <motion.span
              layoutId={`challenge-number-${challenge.id}`}
              className={`font-display mt-1 block text-7xl font-black md:text-9xl ${accentColorMap[challenge.accent].text}`}
            >
              {challenge.number}
            </motion.span>

            <h2 className="mt-4 text-balance font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
              {challenge.title}
            </h2>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {challenge.domain}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-14 grid gap-14 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Problem
                </h3>
                <p className="mt-4 text-balance text-lg leading-relaxed text-ink">
                  {challenge.problem}
                </p>

                <h3 className="mt-12 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                  What We Are Looking For
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {challenge.lookingFor.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accentColorMap[challenge.accent].bg}`} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                layoutId={`challenge-illustration-${challenge.id}`}
                onMouseEnter={() => setIllustrationHovered(true)}
                onMouseLeave={() => setIllustrationHovered(false)}
                data-cursor="expand"
                className={`flex items-start justify-center ${accentColorMap[challenge.accent].text}`}
                aria-hidden
              >
                {(() => {
                  const Illustration = illustrationMap[challenge.illustration]
                  return Illustration ? (
                    <Illustration
                      className="h-44 w-44 md:h-56 md:w-56"
                      animate={illustrationHovered ? "hover" : "rest"}
                    />
                  ) : null
                })()}
              </motion.div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-20 inline-flex items-center gap-2 border-t border-line pt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
            >
              <span aria-hidden>←</span> Back to Challenges
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
