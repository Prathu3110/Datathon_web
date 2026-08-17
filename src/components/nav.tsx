"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Challenges", href: "#challenges" },
  { label: "About", href: "#about" },
  { label: "Rules", href: "#rules" },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-sm border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="group relative font-display text-[13px] font-bold uppercase tracking-[0.14em] text-ink"
        >
          Datathon 2K26
          <span
            className="pointer-events-none absolute left-0 top-full mt-1 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            Est. 2026
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col items-end gap-[5px] p-2 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "translate-y-[3.25px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[57px] bottom-0 z-40 bg-background md:hidden"
            aria-label="Primary"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink last:border-none"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
