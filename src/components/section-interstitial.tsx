"use client"

import { motion } from "framer-motion"

export function SectionInterstitial() {
  return (
    <div className="border-t border-line py-24 md:py-40" aria-hidden>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 text-center md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30% 0px" }}
          transition={{ duration: 1 }}
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          End of BDA &amp; CC
        </motion.span>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-30% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-24 bg-line"
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30% 0px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          Next — Robotics
        </motion.span>
      </div>
    </div>
  )
}
