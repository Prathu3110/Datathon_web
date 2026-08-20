"use client"

import { OrbitalImageWheel, type OrbitalImageWheelImage } from "@/components/orbital-image-wheel"

export interface GalleryItem extends OrbitalImageWheelImage {}

export const galleryItems: GalleryItem[] = [
  { src: "/gallery/IMG_1.jpeg", alt: "Datathon Moment 1" },
  { src: "/gallery/IMG_2.jpeg", alt: "Datathon Moment 2" },
  { src: "/gallery/IMG_3.jpeg", alt: "Datathon Moment 3" },
  { src: "/gallery/IMG_4.jpeg", alt: "Datathon Moment 4" },
  { src: "/gallery/IMG_5.jpeg", alt: "Datathon Moment 5" },
  { src: "/gallery/IMG_6.jpeg", alt: "Datathon Moment 6" },
  { src: "/gallery/IMG_7.jpeg", alt: "Datathon Moment 7" },
  { src: "/gallery/IMG_8.jpeg", alt: "Datathon Moment 8" },
  { src: "/gallery/IMG_9.jpeg", alt: "Datathon Moment 9" },
  { src: "/gallery/IMG_10.jpeg", alt: "Datathon Moment 10" },
  { src: "/gallery/IMG_11.jpeg", alt: "Datathon Moment 11" },
  { src: "/gallery/IMG_12.jpeg", alt: "Datathon Moment 12" },
  { src: "/gallery/IMG_13.jpeg", alt: "Datathon Moment 13" },
  { src: "/gallery/IMG_14.jpeg", alt: "Datathon Moment 14" },
  { src: "/gallery/IMG_15.jpeg", alt: "Datathon Moment 15" },
]

export function Gallery() {
  return (
    <section id="gallery" className="border-t border-line/60 bg-background/50 relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-ink md:text-6xl">
            Gallery
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink-muted md:text-right italic font-sans">
          &ldquo;Snapshots of innovation, collaboration, and breakthrough moments from previous events.&rdquo;
        </p>
      </div>

      <OrbitalImageWheel
        images={galleryItems}
        autoPlayInterval={4500}
        className="w-full"
      />
    </section>
  )
}
