"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { launchConfig, rehearsalStages, type LaunchStage } from "@/lib/launch-config"
import { useVoiceApproval, primeMicrophonePermission, useMicLevel } from "./use-voice-approval"
import { LoadingMatrix } from "./loading-matrix"
import { CollegeLogo } from "@/components/college-logo"
import { BackgroundWaves } from "@/components/background-waves"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Inauguration sequence.
 *
 *   idle → clip1 → approval → clip2 → loading → site
 *
 * Operator controls (all invisible to the audience):
 *   • any click or key at the approval gate  → approve
 *   • Escape during a clip                   → skip that clip
 *   • ?from=clip2 (etc.)                     → jump straight to a stage
 *
 * Both clips are mounted from the first paint with preload="auto" so nothing
 * buffers in front of the audience. Audio needs a user gesture, which the
 * single click on the idle screen provides.
 */
export function LaunchSequence() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [stage, setStage] = useState<LaunchStage>("idle")
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  /** Level meter is opt-in: it holds its own mic stream, which can contend
   *  with recognition. Kept separate so diagnostics can be read safely. */
  const [showMeter, setShowMeter] = useState(false)
  const clip1Ref = useRef<HTMLVideoElement>(null)
  const clip2Ref = useRef<HTMLVideoElement>(null)

  const hasClip1 = launchConfig.clip1.src !== ""

  /* Prefetch the destination so the final handoff is a client transition. */
  useEffect(() => {
    router.prefetch("/")
  }, [router])

  /* ── stage transitions ─────────────────────────────────────────── */

  const goToApproval = useCallback(() => {
    setStage((s) => (s === "clip1" || s === "idle" ? "approval" : s))
  }, [])

  const goToClip2 = useCallback(() => {
    setStage((s) => (s === "approval" ? "clip2" : s))
  }, [])

  const goToLoading = useCallback(() => {
    setStage((s) => (s === "clip2" ? "loading" : s))
  }, [])

  /** Called once from the idle screen; unlocks audio AND gets the microphone
   *  permission prompt out of the way before the audience is watching. */
  const begin = useCallback(() => {
    void primeMicrophonePermission()
    if (hasClip1) {
      setStage("clip1")
      void clip1Ref.current?.play().catch(goToApproval)
    } else {
      // Clip 1 not supplied yet — the rest of the ceremony still runs.
      setStage("approval")
    }
  }, [hasClip1, goToApproval])

  /* ── rehearsal entry: /launch?from=clip2 ───────────────────────── */
  useEffect(() => {
    const from = searchParams.get("from") as LaunchStage | null
    if (from && rehearsalStages.includes(from)) setStage(from)
  }, [searchParams])

  /* ── play whichever clip the current stage calls for ───────────── */
  useEffect(() => {
    if (stage === "clip1") void clip1Ref.current?.play().catch(goToApproval)
    if (stage === "clip2") void clip2Ref.current?.play().catch(goToLoading)
  }, [stage, goToApproval, goToLoading])

  /* ── voice approval (silent on every failure path) ─────────────── */
  const voice = useVoiceApproval({
    active: stage === "approval",
    phrases: launchConfig.approvalPhrases,
    lang: launchConfig.speechLang,
    onApproved: goToClip2,
  })

  /* ── microphone priming ────────────────────────────────────────
     begin() primes it for the real run; this covers rehearsal entries
     (?from=approval) where begin() never fires. Runs at most once. */
  const micPrimedRef = useRef(false)
  useEffect(() => {
    const prime = () => {
      if (micPrimedRef.current) return
      micPrimedRef.current = true
      void primeMicrophonePermission()
    }
    window.addEventListener("pointerdown", prime, { once: false })
    window.addEventListener("keydown", prime, { once: false })
    return () => {
      window.removeEventListener("pointerdown", prime)
      window.removeEventListener("keydown", prime)
    }
  }, [])

  /* Input level, measured only while the operator HUD is open. */
  const micLevel = useMicLevel(showMeter && stage === "approval")

  /* ── invisible operator fallback ───────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "d") {
        // reserved: operator diagnostics, never an approval
        setShowDiagnostics((v) => !v)
        return
      }
      if (e.key.toLowerCase() === "l") {
        // reserved: level meter (opens a second mic stream), never an approval
        setShowMeter((v) => !v)
        return
      }
      if (e.key === "Escape") {
        // emergency: skip whatever clip is running
        if (stage === "clip1") goToApproval()
        else if (stage === "clip2") goToLoading()
        return
      }
      if (stage === "approval") goToClip2()
    }
    const onPointer = () => {
      if (stage === "approval") goToClip2()
    }

    window.addEventListener("keydown", onKey)
    window.addEventListener("pointerdown", onPointer)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointerdown", onPointer)
    }
  }, [stage, goToApproval, goToClip2, goToLoading])

  /* ── loading screen runs, then the site is revealed ────────────── */
  useEffect(() => {
    if (stage !== "loading") return
    const t = window.setTimeout(() => router.push("/"), launchConfig.loadingDurationMs)
    return () => window.clearTimeout(t)
  }, [stage, router])

  const clipClasses = "absolute inset-0 h-full w-full object-contain"

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#04080a]">
      {/* ── Clip 1 ── */}
      {hasClip1 && (
        <video
          ref={clip1Ref}
          src={launchConfig.clip1.src}
          poster={launchConfig.clip1.poster || undefined}
          preload="auto"
          playsInline
          onEnded={goToApproval}
          onError={goToApproval}
          className={clipClasses}
          style={{ opacity: stage === "clip1" || stage === "approval" ? 1 : 0 }}
        />
      )}

      {/* ── Clip 2 ── stays mounted under the loading screen so the
             crossfade happens over its own final frame, not over black. */}
      <video
        ref={clip2Ref}
        src={launchConfig.clip2.src}
        poster={launchConfig.clip2.poster}
        preload="auto"
        playsInline
        onEnded={goToLoading}
        onError={goToLoading}
        className={clipClasses}
        style={{ opacity: stage === "clip2" || stage === "loading" ? 1 : 0 }}
      />

      <AnimatePresence>
        {/* ── Idle: one click starts everything and unlocks audio ──
             Dressed with the site's own BackgroundWaves and chrome wordmark
             rather than anything invented, so the holding screen reads as the
             same product the audience is about to see. ── */}
        {stage === "idle" && (
          <motion.button
            key="idle"
            type="button"
            onClick={begin}
            exit={{ opacity: 0 }}
            transition={{ duration: launchConfig.crossfadeMs / 1000, ease: EASE }}
            aria-label="Begin the inauguration"
            className="absolute inset-0 z-30 cursor-pointer overflow-hidden bg-[#04080a]"
          >
            <BackgroundWaves />

            {/* soft neon bloom, same treatment as the hero */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 22%, transparent) 0%, transparent 70%)",
              }}
            />

            <span className="absolute inset-x-0 top-0 z-10">
              <span className="mx-auto flex max-w-[1400px] items-center px-6 py-4 md:px-10">
                <CollegeLogo className="h-12 sm:h-14 md:h-16" />
              </span>
            </span>

            <span className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-7">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="font-display text-[9px] font-bold uppercase tracking-[0.34em] text-ink-muted md:text-[11px]"
              >
                Inter-Department Hackathon
              </motion.span>

              <motion.span
                data-text="DATATHON 2K26"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.12, ease: EASE }}
                className="chrome-text font-display text-[9vw] font-black leading-[0.9] tracking-tight md:text-[6.4vw]"
              >
                DATATHON 2K26
              </motion.span>

              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
                className="block h-px w-40 origin-center bg-line/40 md:w-56"
                aria-hidden
              />

              <motion.span
                animate={{ opacity: [0.32, 0.9, 0.32] }}
                transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-ink-muted"
              >
                Click to begin
              </motion.span>
            </span>
          </motion.button>
        )}

        {/* ── Approval gate ──
             Clip 1 ends on its own "VOICE AUTHORIZATION REQUIRED" panel, so
             this deliberately adds NO scrim, no blur and no repeated wording —
             it only drops a live listening indicator into the empty starfield
             below the panel, leaving the clip's own artwork untouched. ── */}
        {stage === "approval" && (
          <motion.div
            key="approval"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: launchConfig.crossfadeMs / 1000, ease: EASE }}
            className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center pb-[9vh]"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-end gap-[3px]" aria-hidden>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.09,
                    }}
                    className="h-5 w-[2px] origin-bottom rounded-full bg-accent-green"
                  />
                ))}
              </div>
              <span className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-ink-muted">
                Listening
              </span>
            </div>
          </motion.div>
        )}

        {/* ── Loading handoff ── */}
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: launchConfig.crossfadeMs / 1000, ease: EASE }}
            className="absolute inset-0 z-30"
          >
            <LoadingMatrix durationMs={launchConfig.loadingDurationMs} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Operator diagnostics — toggled with "d", invisible otherwise.
          Use it in rehearsal to confirm the microphone is actually live and
          that the spoken words are reaching the recogniser. */}
      {showDiagnostics && (
        <div className="absolute bottom-3 right-3 z-40 rounded border border-border bg-black/85 px-3 py-2 font-mono text-[10px] leading-relaxed text-ink-muted">
          <div>
            stage: <span className="text-accent-green">{stage}</span>
          </div>
          <div>
            mic:{" "}
            <span className={voice.status === "listening" ? "text-accent-green" : "text-accent-yellow"}>
              {voice.status}
            </span>
          </div>
          <div>
            perm:{" "}
            <span className={voice.permission === "granted" ? "text-accent-green" : "text-accent-yellow"}>
              {voice.permission}
            </span>
            {voice.lastError ? <span className="opacity-60"> · err: {voice.lastError}</span> : null}
          </div>
          {!showMeter && <div className="opacity-60">level: off — press L</div>}
          {showMeter && (
          <div className="flex items-center gap-2">
            <span>level:</span>
            <span className="inline-block h-[6px] w-24 overflow-hidden rounded-full bg-border align-middle">
              <span
                className={micLevel > 6 ? "block h-full bg-accent-green" : "block h-full bg-accent-yellow"}
                style={{ width: `${Math.max(0, Math.min(100, micLevel))}%` }}
              />
            </span>
            <span className="tabular-nums">{micLevel < 0 ? "n/a" : `${micLevel}%`}</span>
          </div>
          )}
          <div>
            results: <span className="tabular-nums">{voice.resultCount}</span>
          </div>
          <div className="max-w-[280px] truncate">heard: {voice.heard || "\u2014"}</div>
          <div className="max-w-[280px] truncate opacity-60">
            match: {launchConfig.approvalPhrases.join(" / ")}
          </div>
        </div>
      )}
    </div>
  )
}
