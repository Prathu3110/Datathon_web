"use client"

const COLLEGE_LOGO_SRC = "/images.png"
export const COLLEGE_LOGO_ALT = "SRM Institute of Science & Technology, Ramapuram"

interface CollegeLogoProps {
  className?: string
}

export function CollegeLogo({ className = "h-14 md:h-16" }: CollegeLogoProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl bg-white px-3 py-1.5 shadow-lg border border-white/40 ${className}`}>
      <img
        src={COLLEGE_LOGO_SRC}
        alt={COLLEGE_LOGO_ALT}
        className="h-full w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[420px] object-contain block"
      />
    </div>
  )
}
