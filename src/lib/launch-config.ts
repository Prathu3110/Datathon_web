/**
 * Inauguration sequence configuration.
 *
 * Everything the ceremony needs to be re-pointed lives here — no component
 * should hardcode a path, phrase or duration.
 */

export interface ClipConfig {
  /** Path under `public/`. An EMPTY STRING means "not supplied yet" and the
   *  stage is skipped entirely, so the sequence still runs end to end. */
  src: string
  /** Optional still shown before the first frame paints. */
  poster?: string
}

export const launchConfig = {
  /**
   * CLIP 1 — drop the file into `public/inauguration/` and set `src` here.
   * While `src` is "", the sequence goes straight to the approval gate, so the
   * rest of the ceremony stays rehearsable before the clip exists.
   */
  clip1: {
    src: "/inauguration/morefooodplease.mp4",
    // Its own final frame — the "VOICE AUTHORIZATION REQUIRED" panel. Means the
    // approval gate always has the artwork behind it, including on the
    // ?from=approval rehearsal entry where the clip never played.
    poster: "/inauguration/clip1-lastframe.png",
  } as ClipConfig,

  /** CLIP 2 — ends on black with the SRM logo top-left, which the loading
   *  screen deliberately mirrors so the handoff has no visible cut. */
  clip2: {
    src: "/inauguration/clip2-1080p.mp4",
    poster: "/inauguration/clip2-lastframe.png",
  } as ClipConfig,

  /**
   * Spoken approval. Matched case-insensitively as a substring of the running
   * transcript, so "it is approved" and "approved!" both pass.
   */
  approvalPhrases: ["approved", "approve", "declare open", "declare it open"],

  /** Recognition language. en-IN handles Indian-English vowels far better. */
  speechLang: "en-IN",

  /** How long the icon-ring loading screen runs before revealing the site. */
  loadingDurationMs: 4600,

  /** Crossfade used between every stage. Matches the site's easing curve. */
  crossfadeMs: 900,
} as const

export type LaunchStage = "idle" | "clip1" | "approval" | "clip2" | "loading"

/** Stages that `?from=` may jump to, for rehearsal. */
export const rehearsalStages: LaunchStage[] = ["clip1", "approval", "clip2", "loading"]
