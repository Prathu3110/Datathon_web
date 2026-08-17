"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function SiteFooter() {
  const [pinged, setPinged] = useState(false)

  return (
    <footer id="about" className="border-t-2 border-ink py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl font-black uppercase tracking-tight text-ink">
              Datathon 2K26
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Inter-Department Hackathon
              <br />
              BDA &amp; CC × Robotics
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Eleven problem statements. Countless ways to solve them.
            </p>
          </div>

          <div id="rules" className="grid grid-cols-2 gap-10 text-sm md:flex md:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Tracks
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                BDA &amp; CC
                <br />
                Robotics
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Format
              </p>
              <p className="mt-3 leading-relaxed text-ink">
                11 Problem Statements
                <br />
                1 Open Challenge
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Datathon 2K26</p>

          <button
            type="button"
            onClick={() => {
              setPinged(true)
              window.setTimeout(() => setPinged(false), 500)
            }}
            className="inline-flex items-center gap-2 text-left transition-colors hover:text-ink"
            aria-label="System status"
          >
            <motion.span
              animate={pinged ? { scale: [1, 1.6, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green"
              aria-hidden
            />
            System Online · Challenges Loaded 11 / 11
          </button>

          <p>Build something the data didn&apos;t see coming.</p>
        </div>
      </div>
    </footer>
  )
}
