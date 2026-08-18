"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Challenge } from "@/lib/challenges"
import { accentColorMap, challenges, pad2 } from "@/lib/challenges"
import { illustrationMap } from "./illustrations"

interface ChallengeSectionProps {
  challenge: Challenge
  reversed: boolean
  onView: (id: string) => void
}

export function ChallengeSection({ challenge, reversed, onView }: ChallengeSectionProps) {
  const Illustration = illustrationMap[challenge.illustration]
  const accent = accentColorMap[challenge.accent]
  const [illustrationHovered, setIllustrationHovered] = useState(false)

  return (
    <section
      id={`challenge-${challenge.number}`}
      className="border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div
          className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 ${
            reversed ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className={`flex-1 ${reversed ? "md:text-right" : ""}`}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted"
            >
              Challenge {challenge.number} / {pad2(challenges.length)} — {challenge.track}
            </motion.p>

            <motion.span
              layoutId={`challenge-number-${challenge.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.5 }}
              className={`font-display mt-1 block text-6xl font-black md:text-8xl ${accent.text}`}
            >
              {challenge.number}
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="mt-3 text-balance font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-5xl"
            >
              {challenge.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted"
            >
              {challenge.domain}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className={`mt-6 max-w-md text-balance text-base leading-relaxed text-ink-muted ${
                reversed ? "md:ml-auto" : ""
              }`}
            >
              {challenge.summary}
            </motion.p>

            <motion.button
              type="button"
              onClick={() => onView(challenge.id)}
              data-cursor="view"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.5, delay: 0.18 }}
              whileHover={{ x: reversed ? -4 : 4 }}
              whileTap={{ scale: 0.97 }}
              className={`group mt-8 inline-flex items-center gap-3 border-b-2 pb-1 text-[12px] font-bold uppercase tracking-[0.14em] text-ink ${accent.border}`}
            >
              View Challenge
              <span aria-hidden>→</span>
            </motion.button>
          </div>

          <motion.div
            layoutId={`challenge-illustration-${challenge.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setIllustrationHovered(true)}
            onMouseLeave={() => setIllustrationHovered(false)}
            data-cursor="expand"
            className={`flex flex-1 justify-center ${accent.text}`}
            aria-hidden
          >
            {Illustration && (
              <Illustration
                className="h-40 w-40 md:h-56 md:w-56"
                animate={illustrationHovered ? "hover" : "rest"}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
