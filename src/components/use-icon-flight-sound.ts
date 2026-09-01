"use client"

import { useEffect, useRef } from "react"

type Phase = "idle" | "burst" | "fly" | "orbit"

/**
 * These MIRROR the per-icon transitions in `datathon-icons-animation.tsx`.
 * If those delays/durations change, change these to match — they are the whole
 * reason the audio lines up with what is on screen.
 *
 *   burst: transition={{ duration: 1.9, delay: 0.52 * index }}
 *   fly:   transition={{ duration: 3.0, delay: index * 0.42 }}
 */
const ICON_COUNT = 8
const BURST_STAGGER_S = 0.52
const FLY_STAGGER_S = 0.42
const FLY_TRAVEL_S = 3.0
/** The fly transition's easing — ease={[0.16, 1, 0.3, 1]} in the animation. */
const FLY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
/** Samples used to trace the motion curve into the audio envelopes. */
const CURVE_POINTS = 96

/** Overall loudness. Deliberately low — this sits under a hero, not over it. */
const MASTER_GAIN = 0.16
/**
 * Peak gain of a travelling whoosh, at the icon's fastest moment.
 * Amplitude only — the curve SHAPE and every timing are untouched, so raising
 * this cannot affect sync. Four whooshes overlap at most, so 4 x 0.40 x
 * MASTER_GAIN stays well clear of clipping.
 */
const FLY_PEAK_GAIN = 0.4
/** How long the tail takes to disappear once the ring starts spinning. */
const STOP_FADE_S = 0.45

function createContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return Ctor ? new Ctor() : null
}

/** Evaluates a CSS cubic-bezier, so the audio can follow the icon's real motion. */
function makeEase(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    let t = x
    for (let i = 0; i < 8; i += 1) {
      const err = sampleX(t) - x
      if (Math.abs(err) < 1e-6) break
      const d = slopeX(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    return sampleY(t)
  }
}

const flyEase = makeEase(...FLY_EASE)

/**
 * Normalised speed of an icon across its flight, and the moment it has
 * effectively docked.
 *
 * The easing is heavily front-loaded — 90% of the distance is covered in the
 * first third of the transition — so a whoosh spread evenly across the full
 * duration trails well behind what the eye sees. Shaping gain and filter by
 * velocity keeps the sound on the icon.
 */
function flightCurves() {
  const progress = new Float32Array(CURVE_POINTS)
  for (let n = 0; n < CURVE_POINTS; n += 1) progress[n] = flyEase(n / (CURVE_POINTS - 1))

  const velocity = new Float32Array(CURVE_POINTS)
  let peak = 0
  for (let n = 0; n < CURVE_POINTS; n += 1) {
    const a = progress[Math.max(0, n - 1)]
    const b = progress[Math.min(CURVE_POINTS - 1, n + 1)]
    velocity[n] = b - a
    if (velocity[n] > peak) peak = velocity[n]
  }

  const gain = new Float32Array(CURVE_POINTS)
  const freq = new Float32Array(CURVE_POINTS)
  for (let n = 0; n < CURVE_POINTS; n += 1) {
    const v = peak > 0 ? velocity[n] / peak : 0
    // short attack so the onset does not click
    const attack = Math.min(1, n / 2.5)
    gain[n] = 0.0001 + Math.pow(v, 0.75) * FLY_PEAK_GAIN * attack
    freq[n] = 320 + Math.pow(v, 0.6) * 1750
  }

  // when the icon is visually home (97% of the distance)
  let lo = 0
  let hi = 1
  for (let i = 0; i < 50; i += 1) {
    const mid = (lo + hi) / 2
    if (flyEase(mid) < 0.97) lo = mid
    else hi = mid
  }
  return { gain, freq, dockFraction: (lo + hi) / 2 }
}

const FLIGHT = flightCurves()

function makeNoiseBuffer(ctx: AudioContext, seconds: number) {
  const frames = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1
  return buffer
}

/**
 * Per-icon sound for the hero icon flight.
 *
 * One pop as each icon appears, one travelling whoosh as each icon flies to its
 * slot, then silence when the ring starts spinning. Events are scheduled on the
 * Web Audio clock at the same offsets the animation uses, so each sound belongs
 * to a specific icon rather than playing as one block up front.
 *
 * Entirely synthesised — no audio files, nothing fetched. A pure observer of
 * `phase`: it schedules and tears down its own nodes and never influences the
 * animation.
 *
 * Browsers block audio until the visitor interacts with the page, so on a cold
 * load this stays silent. If they click while icons are still in flight, the
 * context resumes and the remaining icons are heard.
 */
export function useIconFlightSound(phase: Phase, enabled = true) {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const stopsRef = useRef<Array<() => void>>([])

  /* Each phase schedules exactly once, even if the effect re-runs. */
  const burstDoneRef = useRef(false)
  const flyDoneRef = useRef(false)

  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    if (!enabled) return
    if (phase !== "burst" && phase !== "fly") return

    const ctx = ctxRef.current ?? createContext()
    if (!ctx) return
    ctxRef.current = ctx

    let master = masterRef.current
    if (!master) {
      master = ctx.createGain()
      master.gain.value = MASTER_GAIN
      master.connect(ctx.destination)
      masterRef.current = master
    }
    const out = master

    const track = (node: AudioScheduledSourceNode) => {
      stopsRef.current.push(() => {
        try {
          node.stop()
        } catch {
          /* already stopped */
        }
      })
    }

    /** One icon appearing: a short bright pop plus a click for the shockwave. */
    const pop = (at: number, i: number) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = "triangle"
      // each icon a step brighter than the one before it
      osc.frequency.setValueAtTime(360 + i * 38, at)
      osc.frequency.exponentialRampToValueAtTime(820 + i * 60, at + 0.13)
      g.gain.setValueAtTime(0.0001, at)
      g.gain.exponentialRampToValueAtTime(0.42, at + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.24)
      osc.connect(g).connect(out)
      osc.start(at)
      osc.stop(at + 0.28)
      track(osc)

      const click = ctx.createBufferSource()
      click.buffer = makeNoiseBuffer(ctx, 0.14)
      const hp = ctx.createBiquadFilter()
      hp.type = "highpass"
      hp.frequency.value = 1400
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.0001, at)
      cg.gain.exponentialRampToValueAtTime(0.16, at + 0.008)
      cg.gain.exponentialRampToValueAtTime(0.0001, at + 0.14)
      click.connect(hp).connect(cg).connect(out)
      click.start(at)
      click.stop(at + 0.16)
      track(click)
    }

    /** One icon travelling to its slot, tracking the animation's own easing. */
    const whoosh = (at: number, i: number) => {
      const src = ctx.createBufferSource()
      src.buffer = makeNoiseBuffer(ctx, FLY_TRAVEL_S + 0.4)

      const band = ctx.createBiquadFilter()
      band.type = "bandpass"
      band.Q.value = 4.5

      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, at)

      /* Both envelopes trace the icon's velocity, so the whoosh peaks while it
         is actually crossing the screen and dies as it settles. */
      band.frequency.setValueCurveAtTime(FLIGHT.freq, at, FLY_TRAVEL_S)
      g.gain.setValueCurveAtTime(FLIGHT.gain, at, FLY_TRAVEL_S)

      src.connect(band).connect(g).connect(out)
      src.start(at)
      src.stop(at + FLY_TRAVEL_S + 0.05)
      track(src)

      /* Soft chime the moment it is visually home — ~1.5s in, not at 3.0s. */
      const dockAt = at + FLY_TRAVEL_S * FLIGHT.dockFraction
      const dock = ctx.createOscillator()
      const dg = ctx.createGain()
      dock.type = "sine"
      dock.frequency.setValueAtTime(880 + i * 55, dockAt)
      dg.gain.setValueAtTime(0.0001, dockAt)
      dg.gain.exponentialRampToValueAtTime(0.13, dockAt + 0.012)
      dg.gain.exponentialRampToValueAtTime(0.0001, dockAt + 0.34)
      dock.connect(dg).connect(out)
      dock.start(dockAt)
      dock.stop(dockAt + 0.38)
      track(dock)
    }

    const schedule = () => {
      const t0 = ctx.currentTime
      if (phaseRef.current === "burst" && !burstDoneRef.current) {
        burstDoneRef.current = true
        for (let i = 0; i < ICON_COUNT; i += 1) pop(t0 + i * BURST_STAGGER_S, i)
      }
      if (phaseRef.current === "fly" && !flyDoneRef.current) {
        flyDoneRef.current = true
        for (let i = 0; i < ICON_COUNT; i += 1) whoosh(t0 + i * FLY_STAGGER_S, i)
      }
    }

    if (ctx.state === "suspended") {
      // Autoplay blocked: arm the next gesture, but only while still in flight.
      const resume = () => {
        void ctx.resume().then(() => {
          if (phaseRef.current === "burst" || phaseRef.current === "fly") schedule()
        })
        window.removeEventListener("pointerdown", resume)
        window.removeEventListener("keydown", resume)
      }
      window.addEventListener("pointerdown", resume, { once: true })
      window.addEventListener("keydown", resume, { once: true })
      return () => {
        window.removeEventListener("pointerdown", resume)
        window.removeEventListener("keydown", resume)
      }
    }

    schedule()
  }, [phase, enabled])

  /* Spinning has begun — fade out and release everything. */
  useEffect(() => {
    if (phase !== "orbit") return
    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + STOP_FADE_S)

    const t = window.setTimeout(
      () => {
        stopsRef.current.forEach((stop) => stop())
        stopsRef.current = []
        void ctx.close()
        ctxRef.current = null
        masterRef.current = null
        burstDoneRef.current = false
        flyDoneRef.current = false
      },
      STOP_FADE_S * 1000 + 120,
    )
    return () => window.clearTimeout(t)
  }, [phase])

  /* Unmount safety net: never leave an audio context running. */
  useEffect(
    () => () => {
      stopsRef.current.forEach((stop) => stop())
      stopsRef.current = []
      const ctx = ctxRef.current
      if (ctx && ctx.state !== "closed") void ctx.close()
      ctxRef.current = null
      masterRef.current = null
    },
    [],
  )
}
