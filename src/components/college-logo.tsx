"use client"

const COLLEGE_LOGO_SRC = "/srm-clean-hd.png"
export const COLLEGE_LOGO_ALT = "SRM Institute of Science & Technology, Ramapuram"

interface CollegeLogoProps {
  className?: string
}

export function CollegeLogo({ className = "h-12 sm:h-14 md:h-16" }: CollegeLogoProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={COLLEGE_LOGO_SRC}
        alt={COLLEGE_LOGO_ALT}
        className="h-full w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[420px] object-contain block transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
}
