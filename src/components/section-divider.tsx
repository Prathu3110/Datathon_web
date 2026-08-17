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
}

export function SectionDivider({
  id,
  kicker,
  lines,
  supporting,
  count,
  align = "left",
  size = "default",
}: SectionDividerProps) {
  return (
    <section
      id={id}
      className={`overflow-x-clip border-t border-line ${
        size === "large" ? "py-32 md:py-52" : "py-28 md:py-40"
      } ${align === "right" ? "md:text-right" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 md:px-10">
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

        <div className={align === "right" ? "md:self-end" : "self-start"}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display overflow-hidden leading-[0.85] tracking-tight text-ink"
          >
            {lines.map((line) => (
              <span
                key={line}
                className={`block font-black ${
                  size === "large"
                    ? "text-[15vw] sm:text-[16vw] md:text-[13vw]"
                    : "text-[11vw] sm:text-[13vw] md:text-[10vw]"
                }`}
              >
                {line}
              </span>
            ))}
          </motion.h2>
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
