"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const phases = [
  {
    number: "01",
    title: "Idea Submission",
    subtitle: "Pre-Hackathon",
    accent: "text-accent-blue",
    border: "border-accent-blue",
    glow: "rgba(0,122,255,0.12)",
    items: [
      "Teams must select one track from the available hackathon tracks.",
      "Prepare a 6–8 slide PPT using the provided template.",
      "The presentation should clearly communicate the problem, proposed solution, and overall idea.",
      "Submit the PPT within the specified deadline.",
      "No additional slides beyond the provided template limit are permitted.",
    ],
  },
  {
    number: "02",
    title: "Idea Shortlisting",
    subtitle: "Selection Round",
    accent: "text-accent-green",
    border: "border-accent-green",
    glow: "rgba(0,255,136,0.12)",
    items: [
      "All submitted ideas will be reviewed by the organizing committee.",
      "The Top 30 teams will be shortlisted based on quality, relevance, innovation, feasibility, and potential impact.",
      "Shortlisted teams will proceed to the on-site hackathon.",
    ],
  },
  {
    number: "03",
    title: "MVP Development",
    subtitle: "Round 1 — ~3–4 Hours",
    accent: "text-accent-red",
    border: "border-accent-red",
    glow: "rgba(255,59,48,0.12)",
    items: [
      "Shortlisted teams will begin developing their Minimum Viable Product (MVP) on the day of the hackathon.",
      "Teams will have approximately 3–4 hours for the initial development phase.",
      "Mentors and judges will review the progress and development stage of each team.",
    ],
  },
  {
    number: "04",
    title: "Mid-Hackathon Evaluation",
    subtitle: "Progress Review",
    accent: "text-accent-yellow",
    border: "border-accent-yellow",
    glow: "rgba(255,214,10,0.12)",
    items: [
      "Based on progress, implementation, innovation, and potential, judges will shortlist 15–20 teams for the next round.",
      "Shortlisted teams will receive an additional 3–4 hours to further develop and refine their MVP.",
    ],
  },
  {
    number: "05",
    title: "Final Evaluation",
    subtitle: "Judges' Assessment",
    accent: "text-accent-blue",
    border: "border-accent-blue",
    glow: "rgba(0,122,255,0.12)",
    items: [
      "Mentors and judges will conduct a final assessment of the shortlisted teams.",
      "Organisers may select the Top 5–6 teams for final presentations, or invite all qualifying teams to present.",
    ],
  },
  {
    number: "06",
    title: "Final Presentation & Winners",
    subtitle: "Judging Criteria",
    accent: "text-accent-green",
    border: "border-accent-green",
    glow: "rgba(0,255,136,0.12)",
    items: [
      "Finalists present their working MVP, solution, and key features before the judges.",
      "Innovation & Originality",
      "Problem Relevance",
      "Technical Implementation",
      "MVP Quality & Functionality",
      "Impact & Scalability",
      "Presentation & Demonstration",
    ],
  },
  {
    number: "07",
    title: "General Rules",
    subtitle: "Code of Conduct",
    accent: "text-accent-red",
    border: "border-accent-red",
    glow: "rgba(255,59,48,0.12)",
    items: [
      "Teams must work only on the selected problem statement/track submitted during idea-selection.",
      "All work must be developed within the designated hackathon period, unless otherwise permitted.",
      "Teams are expected to demonstrate a functional prototype/MVP during evaluation.",
      "Participants must follow instructions and time limits communicated by organizers, mentors, and judges.",
      "The decisions of the judging panel and organizing committee will be final and binding.",
    ],
  },
]

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof phases)[0]
  index: number
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      {...fade(index * 0.06)}
      className="group relative border border-line rounded-none overflow-hidden cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
      style={{
        background: expanded ? phase.glow : "transparent",
        transition: "background 0.4s ease",
      }}
    >
      {/* Hover left accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-[3px] transition-transform duration-300 origin-top scale-y-0 group-hover:scale-y-100 ${phase.border.replace("border-", "bg-")}`}
      />

      {/* Header row */}
      <div className="flex items-center gap-5 px-6 py-6 md:px-8 md:py-7">
        <span
          className={`font-display text-4xl font-black tabular-nums shrink-0 md:text-5xl ${phase.accent} transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-40 group-hover:opacity-70"}`}
        >
          {phase.number}
        </span>

        <div className="flex-1 min-w-0">
          <div className="font-display text-lg font-black uppercase tracking-tight text-ink leading-tight md:text-xl">
            {phase.title}
          </div>
          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {phase.subtitle}
          </div>
        </div>

        {/* Expand chevron */}
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`shrink-0 text-2xl font-light leading-none ${phase.accent} opacity-60`}
          aria-hidden
        >
          +
        </motion.span>
      </div>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-6 pb-7 md:px-8 space-y-3 pl-[4.5rem]">
              {phase.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${phase.accent.replace("text-", "bg-")} opacity-70`} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function RulesSection() {
  return (
    <section
      id="rules"
      aria-label="Hackathon Rules and Evaluation Process"
      className="relative border-t border-line py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,122,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        {/* Section kicker */}
        <motion.p
          {...fade(0)}
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted"
        >
          Datathon 2K26 — How It Works
        </motion.p>

        {/* Heading */}
        <motion.h2
          {...fade(0.06)}
          className="mt-4 font-display text-5xl font-black uppercase tracking-tight text-ink leading-[0.9] md:text-7xl"
        >
          Rules &amp;
          <br />
          <span className="text-accent-blue">Evaluation</span>
        </motion.h2>

        {/* Supporting line */}
        <motion.p
          {...fade(0.12)}
          className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted"
        >
          From idea submission to final presentation — here&apos;s everything you need
          to know to compete, build, and win at Datathon 2K26.
        </motion.p>

        {/* Phase cards */}
        <div className="mt-16 divide-y divide-line border-t border-b border-line">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.number} phase={phase} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          {...fade(0.1)}
          className="mt-10 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted"
        >
          All decisions by the judging panel are final &amp; binding.
        </motion.p>
      </div>
    </section>
  )
}
