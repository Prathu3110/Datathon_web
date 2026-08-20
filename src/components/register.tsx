"use client"

import { motion } from "framer-motion"
import { totalCount, openCount } from "@/lib/challenges"

/**
 * TO OPEN REGISTRATIONS: set this to the registration form URL,
 * e.g. `const REGISTRATION_URL: string = "https://forms.gle/..."`.
 * While it is empty the section shows a "opening soon" state rather than a
 * dead link.
 */
const REGISTRATION_URL: string = "https://docs.google.com/forms/d/e/1FAIpQLSeM5rvAy7xSEhrIP7jhMtnzx4VZHq1VnuVvDKDBDYNlgvrCyw/viewform?usp=publish-editor"

export function Register() {
  return (
    <section id="register" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted"
          >
            BDA &amp; CC × Robotics
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-ink md:text-8xl"
          >
            Register
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-xl text-balance text-lg leading-relaxed text-ink-muted"
          >
            {totalCount} problem statements across BDA &amp; Cloud Computing and
            Robotics — including {openCount} open canvas. Pick your track, bring your
            team, and build something the data didn&apos;t see coming.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-2"
          >
            {REGISTRATION_URL ? (
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-3 rounded-[var(--radius)] bg-accent-green px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-300 hover:scale-[1.03]"
              >
                Register Your Team
                <span aria-hidden>→</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-3 rounded-[var(--radius)] border-2 border-border px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent-yellow"
                  aria-hidden
                />
                Registration Opening Soon
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
