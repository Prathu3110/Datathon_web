"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { pad2 } from "@/lib/challenges"

export interface PartnerLogo {
  /** Shown as the placeholder label and used as the image alt text. */
  name: string
  /** Path to a file in `public/`, e.g. "/logos/acme.svg". */
  src?: string
  href?: string
}

/**
 * TO ADD THE REAL LOGOS: give each entry a `src` (and optionally `href`).
 * Add or remove entries freely — the band is a wrapping grid, so any number of
 * logos stays aligned and evenly spaced at every breakpoint. Rows fill
 * 2 / 3 / 4 / 6 across as the viewport widens.
 */
export const partnerLogos: PartnerLogo[] = [
  { name: "Partner 01" },
  { name: "Partner 02" },
  { name: "Partner 03" },
  { name: "Partner 04" },
  { name: "Partner 05" },
  { name: "Partner 06" },
  { name: "Partner 07" },
  { name: "Partner 08" },
  { name: "Partner 09" },
  { name: "Partner 10" },
  { name: "Partner 11" },
  { name: "Partner 12" },
]

function LogoCell({ logo }: { logo: PartnerLogo }) {
  const content = logo.src ? (
    <Image
      src={logo.src}
      alt={logo.name}
      width={200}
      height={80}
      className="max-h-12 w-auto object-contain opacity-70 transition-opacity duration-500 group-hover/logo:opacity-100 md:max-h-14"
    />
  ) : (
    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors duration-500 group-hover/logo:text-ink">
      {logo.name}
    </span>
  )

  return (
    <li className="group/logo flex h-24 items-center justify-center border-b border-r border-border p-5 transition-colors duration-500 hover:bg-background md:h-28">
      {logo.href ? (
        <a
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="flex h-full w-full items-center justify-center"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

export function LogoStrip() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-b border-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2
            id="partners-heading"
            className="font-display text-3xl font-black uppercase tracking-tight text-ink md:text-5xl"
          >
            Partners &amp; Sponsors
          </h2>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {pad2(partnerLogos.length)} Organisations
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 overflow-hidden rounded-[var(--radius)] border border-border bg-card md:mt-12"
        >
          {/* -mr-px/-mb-px tucks the trailing cell borders under the container
              border, so the grid stays hairline-clean at any logo count. */}
          <ul className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {partnerLogos.map((logo) => (
              <LogoCell key={logo.name} logo={logo} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
