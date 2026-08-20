"use client"

import Image from "next/image"

/**
 * College logo slot.
 *
 * TO ADD THE REAL LOGO: drop the file into `public/` and set the path below,
 * e.g. `const COLLEGE_LOGO_SRC: string = "/college-logo.png"`.
 * Nothing else needs to change — the slot reserves a fixed height and lets the
 * width follow the image's own aspect ratio, so the header layout stays put
 * whatever proportions the logo turns out to have.
 */
const COLLEGE_LOGO_SRC: string = "/college-logo.jpeg"

export const COLLEGE_LOGO_ALT = "SRM Institute of Science & Technology, Ramapuram"

interface CollegeLogoProps {
  /** Height utilities, e.g. "h-7 md:h-9". Width always stays auto. */
  className?: string
}

export function CollegeLogo({ className = "h-7 md:h-9" }: CollegeLogoProps) {
  if (COLLEGE_LOGO_SRC) {
    return (
      <Image
        src={COLLEGE_LOGO_SRC}
        alt={COLLEGE_LOGO_ALT}
        width={320}
        height={80}
        priority
        className={`w-auto shrink-0 object-contain ${className}`}
      />
    )
  }

  // Placeholder occupying the same footprint as the real logo will.
  return (
    <span
      role="img"
      aria-label={`${COLLEGE_LOGO_ALT} — logo placeholder`}
      className={`inline-flex aspect-[3/1] shrink-0 items-center justify-center rounded-[2px] border border-dashed border-border px-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-ink-muted ${className}`}
    >
      Logo
    </span>
  )
}
