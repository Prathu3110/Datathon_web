import { Suspense } from "react"
import type { Metadata } from "next"
import { LaunchSequence } from "@/components/launch/launch-sequence"

export const metadata: Metadata = {
  title: "Datathon 2K26 — Inauguration",
  // The ceremony screen should never be indexed or previewed.
  robots: { index: false, follow: false },
}

export default function LaunchPage() {
  return (
    // useSearchParams (rehearsal `?from=`) requires a Suspense boundary.
    <Suspense fallback={<div className="fixed inset-0 bg-[#04080a]" />}>
      <LaunchSequence />
    </Suspense>
  )
}
