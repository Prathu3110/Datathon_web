"use client"

import { useEffect, useRef, useState } from "react"

/* The Web Speech API is not in TypeScript's DOM lib; these are the minimal
   shapes this hook actually touches. */
interface SpeechRecognitionAlternativeLike {
  transcript: string
}
interface SpeechRecognitionResultLike {
  readonly length: number
  item(index: number): SpeechRecognitionAlternativeLike
  [index: number]: SpeechRecognitionAlternativeLike
}
interface SpeechRecognitionResultListLike {
  readonly length: number
  item(index: number): SpeechRecognitionResultLike
  [index: number]: SpeechRecognitionResultLike
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number
  results: SpeechRecognitionResultListLike
}
interface SpeechRecognitionLike extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: Event) => void) | null
  onend: (() => void) | null
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}


/**
 * Triggers Chrome's microphone permission prompt early (on the opening click)
 * and releases the stream immediately.
 *
 * Without this the prompt appears the moment the approval gate opens — i.e. on
 * the projector, mid-ceremony. Priming it during the "click to begin" gesture
 * gets it out of the way, and makes recognition start instantly later.
 *
 * Resolves either way; a refusal is not an error the ceremony should care about.
 */
export async function primeMicrophonePermission(): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return false
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((t) => t.stop())
    return true
  } catch {
    return false
  }
}

/** Never surfaced to the audience — exposed only for the hidden operator HUD. */
export type VoiceStatus =
  | "idle"
  | "listening"
  | "unsupported"
  /** microphone permission denied by the OS or the browser */
  | "blocked"
  /** permission is fine, but Google's speech service is unreachable (offline) */
  | "service"

interface UseVoiceApprovalOptions {
  /** Only listen while the approval gate is on screen. */
  active: boolean
  phrases: readonly string[]
  lang: string
  onApproved: () => void
}

/**
 * Listens for a spoken approval phrase.
 *
 * Deliberately silent about failure: if the API is missing, the mic is denied,
 * or the venue has no internet (the API streams audio to Google's servers),
 * this simply never fires and the invisible click/key fallback carries the
 * ceremony. Nothing is ever rendered from an error path.
 */
export function useVoiceApproval({ active, phrases, lang, onApproved }: UseVoiceApprovalOptions) {
  const [status, setStatus] = useState<VoiceStatus>("idle")
  const [heard, setHeard] = useState("")
  /** Raw SpeechRecognition error code, for the operator HUD only. */
  const [lastError, setLastError] = useState("")
  /** Ground truth from the Permissions API: granted | denied | prompt. */
  const [permission, setPermission] = useState("unknown")
  /** How many result events arrived — 0 with a live mic means the speech
   *  service never answered, which is a network problem, not a mic problem. */
  const [resultCount, setResultCount] = useState(0)

  /* Keep the callback in a ref so re-renders never tear down recognition. */
  const onApprovedRef = useRef(onApproved)
  onApprovedRef.current = onApproved
  const firedRef = useRef(false)

  useEffect(() => {
    if (!active) return
    firedRef.current = false

    /* Ask the browser what the microphone permission actually is. This is what
       distinguishes "you denied the mic" from "the mic is fine but we're
       offline" — the two failures look identical from the error event alone. */
    navigator.permissions
      ?.query({ name: "microphone" as PermissionName })
      .then((p) => {
        setPermission(p.state)
        p.onchange = () => setPermission(p.state)
      })
      .catch(() => setPermission("unsupported"))

    const Ctor = getRecognitionCtor()
    if (!Ctor) {
      setStatus("unsupported")
      return
    }

    let stopped = false
    let recognition: SpeechRecognitionLike | null = null
    let restartTimer: number | undefined

    const handleTranscript = (text: string) => {
      const normalised = text.toLowerCase().replace(/[^a-z\s]/g, " ")
      setHeard(normalised.trim().slice(-80))
      if (firedRef.current) return
      if (phrases.some((p) => normalised.includes(p))) {
        firedRef.current = true
        onApprovedRef.current()
      }
    }

    const start = () => {
      if (stopped) return
      try {
        recognition = new Ctor()
      } catch {
        setStatus("blocked")
        return
      }
      recognition.lang = lang
      recognition.continuous = true
      recognition.interimResults = true
      recognition.maxAlternatives = 1

      recognition.onresult = (event) => {
        setResultCount((n) => n + 1)
        console.debug("[launch:voice] result")
        let text = ""
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          text += event.results[i][0].transcript + " "
        }
        handleTranscript(text)
      }

      /* Any failure is swallowed. `not-allowed` means the mic was denied, so
         retrying would only spam; anything else is transient (network drop,
         no-speech) and worth restarting. */
      recognition.onerror = (event) => {
        const code = (event as Event & { error?: string }).error ?? "unknown"
        setLastError(code)
        console.debug("[launch:voice] error:", code)

        if (code === "not-allowed") {
          // The user or the OS denied the microphone. Retrying cannot help.
          stopped = true
          setStatus("blocked")
          return
        }
        if (code === "service-not-allowed" || code === "network") {
          // Permission is fine; the speech backend is unreachable. Keep
          // retrying — a flaky venue connection may well come back.
          setStatus("service")
          return
        }
        // "no-speech" / "aborted" are routine; onend restarts us.
      }

      recognition.onend = () => {
        console.debug("[launch:voice] ended", stopped ? "(stopping)" : "(restarting)")
        if (stopped || firedRef.current) return
        restartTimer = window.setTimeout(start, 400)
      }

      try {
        recognition.start()
        console.debug("[launch:voice] started, lang =", lang)
        setStatus("listening")
      } catch {
        /* start() throws if called while already running — harmless. */
      }
    }

    start()

    return () => {
      stopped = true
      if (restartTimer) window.clearTimeout(restartTimer)
      if (recognition) {
        recognition.onresult = null
        recognition.onerror = null
        recognition.onend = null
        try {
          recognition.abort()
        } catch {
          /* already torn down */
        }
      }
      setStatus("idle")
    }
  }, [active, lang, phrases])

  return { status, heard, lastError, permission, resultCount }
}


/**
 * Live microphone input level (0-100), for the operator HUD only.
 *
 * This is the measurement that separates the two failure modes:
 *   • level moves, transcript empty  → mic is fine, speech service unreachable
 *   • level flat at 0                → wrong input device, or nothing reaching it
 *
 * Deliberately gated behind the diagnostics toggle: it holds its own
 * getUserMedia stream, and we never want that contending with recognition
 * while the ceremony is actually running.
 */
export function useMicLevel(active: boolean) {
  const [level, setLevel] = useState(0)

  useEffect(() => {
    if (!active) {
      setLevel(0)
      return
    }
    let cancelled = false
    let raf = 0
    let ctx: AudioContext | null = null
    let stream: MediaStream | null = null

    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        ctx = new AudioContext()
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 512
        ctx.createMediaStreamSource(s).connect(analyser)
        const data = new Uint8Array(analyser.frequencyBinCount)

        const tick = () => {
          analyser.getByteTimeDomainData(data)
          let peak = 0
          for (let i = 0; i < data.length; i += 1) {
            const dev = Math.abs(data[i] - 128)
            if (dev > peak) peak = dev
          }
          setLevel(Math.round((peak / 128) * 100))
          raf = requestAnimationFrame(tick)
        }
        tick()
      })
      .catch(() => setLevel(-1))

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      stream?.getTracks().forEach((t) => t.stop())
      void ctx?.close()
    }
  }, [active])

  return level
}
