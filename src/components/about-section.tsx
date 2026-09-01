"use client"

import { motion } from "framer-motion"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const initiatives = [
  {
    title: "Hackcelerate",
    desc: "A successful internal hackathon that set the benchmark for innovation-driven competition within the department.",
  },
  {
    title: "AI, IoT & Robotics Bootcamp",
    desc: "Hands-on learning sessions offering participants industry-relevant exposure across emerging technologies.",
  },
  {
    title: "Datathon 2K26",
    desc: "The latest milestone — an inter-department hackathon uniting BDA & CC and Robotics under one competitive roof.",
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Datathon 2K26"
      className="relative border-t border-line py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,255,136,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        {/* ── Section kicker ── */}
        <motion.p
          {...fade(0)}
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted"
        >
          About the Event
        </motion.p>

        {/* ── Headline ── */}
        <motion.h2
          {...fade(0.08)}
          className="font-display mt-4 text-4xl font-black uppercase tracking-tight text-ink md:text-6xl lg:text-7xl"
        >
          Datathon&nbsp;
          <span className="text-accent-green">2K26</span>
        </motion.h2>

        {/* ── Ruled divider ── */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-full bg-line"
          aria-hidden
        />

        {/* ── Two-column layout: intro + meta ── */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr] md:gap-20 lg:gap-32">

          {/* Left — narrative paragraphs */}
          <div className="flex flex-col gap-6">
            <motion.p
              {...fade(0.18)}
              className="text-base leading-[1.85] text-ink-muted md:text-lg"
            >
              <span className="font-semibold text-ink">
                SRM Institute of Science and Technology (SRMIST), Ramapuram Campus,
              </span>{" "}
              through its Department of Computer Science and Engineering — specialising
              in{" "}
              <span className="font-semibold text-ink">
                Big Data Analytics and Cloud Computing
              </span>{" "}
              — is organising an internal hackathon titled{" "}
              <span className="font-semibold text-accent-green">DATATHON 26</span>.
            </motion.p>

            <motion.p
              {...fade(0.26)}
              className="text-base leading-[1.85] text-ink-muted md:text-lg"
            >
              The hackathon aims to provide students with a platform to{" "}
              <span className="font-semibold text-ink">
                showcase their technical skills, develop innovative solutions,
              </span>{" "}
              and collaborate to solve real-world challenges.
            </motion.p>

            <motion.p
              {...fade(0.34)}
              className="text-base leading-[1.85] text-ink-muted md:text-lg"
            >
              The department has consistently promoted innovation through various
              technical initiatives, building a strong culture of hands-on learning
              and industry-relevant exposure across its student community.
            </motion.p>
          </div>

          {/* Right — organiser meta */}
          <motion.div {...fade(0.2)} className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Organised by
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Department of Computer Science &amp; Engineering
                <br />
                <span className="text-ink-muted">
                  Big Data Analytics &amp; Cloud Computing
                </span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Institution
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                SRM Institute of Science &amp; Technology
                <br />
                <span className="text-ink-muted">Ramapuram Campus, Chennai</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Event
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Inter-Department Hackathon
                <br />
                <span className="text-ink-muted">BDA &amp; CC × Robotics</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Initiative cards ── */}
        <div className="mt-20 grid grid-cols-1 gap-px border border-line sm:grid-cols-3">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              {...fade(0.1 + i * 0.1)}
              className="group flex flex-col gap-3 bg-background p-8 transition-colors duration-300 hover:bg-card"
            >
              {/* Index */}
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-accent-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Title */}
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-ink">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              {/* Hover underline */}
              <span
                aria-hidden
                className="mt-auto block h-px w-0 bg-accent-green transition-all duration-500 group-hover:w-full"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
