"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionDividerProps {
  id?: string
  kicker?: string
  lines: string[]
  supporting: ReactNode
  count: string
  align?: "left" | "right"
  size?: "default" | "large"
  /** Illustration shown beside the heading (stacks beneath it on mobile). */
  decoration?: ReactNode
}

export function SectionDivider({
  id,
  kicker,
  lines,
  supporting,
  count,
  align = "left",
  size = "default",
  decoration,
}: SectionDividerProps) {
  return (
    <section
      id={id}
      className={`overflow-x-clip border-t border-line ${
        size === "large" ? "py-24 md:py-36" : "py-20 md:py-28"
      } ${align === "right" ? "md:text-right" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 md:px-10">
        {kicker && (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6 }}
            className={`text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted ${
              align === "right" ? "md:self-end" : "self-start"
            }`}
          >
            {kicker}
          </motion.span>
        )}

        <div
          className={`flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-12 ${
            align === "right" ? "md:self-end md:flex-row-reverse" : "self-start"
          }`}
        >
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display overflow-hidden leading-[0.85] tracking-tight text-ink"
          >
          {(() => {
            const maxLen = Math.max(...lines.map((l) => l.length), 0)
            let uniformFontSizeClass = ""
            if (maxLen > 14) {
              uniformFontSizeClass = "text-[8vw] sm:text-[8vw] md:text-[6.6vw] lg:text-[5.6vw]"
            } else if (maxLen > 8) {
              uniformFontSizeClass = "text-[10vw] sm:text-[10.5vw] md:text-[8.4vw] lg:text-[7.4vw]"
            } else if (size === "large") {
              uniformFontSizeClass = "text-[12.5vw] sm:text-[13vw] md:text-[10.6vw]"
            } else {
              uniformFontSizeClass = "text-[10.5vw] sm:text-[11vw] md:text-[9vw]"
            }

            return lines.map((line) => (
              <span
                key={line}
                className={`block font-black ${uniformFontSizeClass}`}
              >
                {line}
              </span>
            ))
          })()}
          </motion.h2>
          {decoration && <div className="shrink-0 md:pb-3">{decoration}</div>}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`flex flex-col gap-8 md:flex-row md:items-center md:justify-between ${
            align === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="text-sm font-semibold uppercase leading-relaxed tracking-[0.14em] text-ink-muted">
            {supporting}
          </div>
          <div className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
            {count}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
