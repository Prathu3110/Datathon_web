"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { challenges, accentColorMap, bdaCount, roboticsCount, openCount, pad2 } from "@/lib/challenges"
import { illustrationMap } from "./illustrations"

export function ChallengeIndex() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="challenges" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Datathon 2K26 System · Challenges Loaded {pad2(challenges.length)} /{" "}
          {pad2(challenges.length)}
        </div>

        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-ink md:text-6xl">
            Challenge Index
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-right">
            {bdaCount} BDA &amp; Cloud Computing tracks. {roboticsCount} Robotics tracks.{" "}
            {openCount} open canvas.
          </p>
        </div>

        <ul>
          {challenges.map((challenge, index) => {
            const Illustration = illustrationMap[challenge.illustration]
            const accent = accentColorMap[challenge.accent]
            const isHovered = hovered === challenge.id

            return (
              <li
                key={challenge.id}
                className="group border-t border-line first:border-t-2 first:border-ink"
                onMouseEnter={() => setHovered(challenge.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <a
                  href={`#challenge-${challenge.number}`}
                  data-cursor="view"
                  className="relative flex items-center gap-4 py-5 outline-offset-4 transition-transform duration-300 md:gap-8 md:py-7"
                  style={{ transform: isHovered ? "translateX(10px)" : "translateX(0)" }}
                >
                  <span className="absolute left-0 top-1 hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                    Challenge {challenge.number} / {pad2(challenges.length)}
                  </span>

                  <motion.span
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-display w-14 shrink-0 text-3xl font-black tabular-nums transition-colors duration-300 md:w-24 md:text-5xl ${
                      isHovered ? accent.text : "text-ink"
                    }`}
                  >
                    {challenge.number}
                  </motion.span>

                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-ink md:truncate md:text-2xl">
                      {challenge.title}
                    </div>
                    <div className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {challenge.domain}
                    </div>
                  </div>

                  {Illustration && (
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.85,
                      }}
                      transition={{ duration: 0.25 }}
                      data-cursor="expand"
                      className={`hidden h-16 w-16 shrink-0 lg:block ${accent.text}`}
                      aria-hidden
                    >
                      <Illustration className="h-full w-full" animate={isHovered ? "hover" : "rest"} />
                    </motion.div>
                  )}

                  <motion.span
                    animate={{ x: isHovered ? 4 : 0, rotate: isHovered ? 8 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-display shrink-0 text-2xl ${isHovered ? accent.text : "text-ink-muted"}`}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
