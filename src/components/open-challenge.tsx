"use client"

import { motion } from "framer-motion"

export function OpenChallenge() {
  return (
    <section id="challenge-12" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center gap-10 text-center">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted"
          >
            Problem Statement 12
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.5 }}
            className="font-display mt-1 block text-6xl font-black text-accent-yellow md:text-8xl"
          >
            12
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-black uppercase tracking-tight text-ink md:text-7xl"
          >
            Open Challenge
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="max-w-xl text-balance text-lg leading-relaxed text-ink-muted"
          >
            &ldquo;Students are free to choose their own project title and domain apart from
            these problem statements.&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
          >
            No domain. No title. Your canvas.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
