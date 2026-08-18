"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export interface GalleryItem {
  caption: string
  /** Path to a file in `public/`, e.g. "/gallery/opening-ceremony.jpg". */
  src?: string
}

/**
 * TO ADD THE REAL IMAGES: give each entry a `src`. Add or remove entries
 * freely — the grid reflows at 1 / 2 / 3 columns and every tile keeps a 4:3
 * frame, so mixed image sizes cannot break the layout.
 */
export const galleryItems: GalleryItem[] = [
  { caption: "Opening Ceremony" },
  { caption: "Team Formation" },
  { caption: "Build Phase" },
  { caption: "Mentor Rounds" },
  { caption: "Robotics Arena" },
  { caption: "Final Pitches" },
]

export function Gallery() {
  return (
    <section id="gallery" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-ink md:text-6xl">
            Gallery
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-right">
            Moments from the floor — builds, breakthroughs, and the occasional
            three-in-the-morning breakthrough.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.li
              key={item.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div
                data-cursor="expand"
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-border bg-card"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    Image Slot
                  </span>
                )}
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors duration-500 group-hover:text-ink">
                {item.caption}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
