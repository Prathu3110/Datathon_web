"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ReleaseReadinessIllustration,
  SustainableCloudIllustration,
  SupplyChainRiskIllustration,
  FeedbackIntelligenceIllustration,
  PesticideSprayingIllustration,
  PipeInspectionIllustration,
  ObjectRetrievalIllustration,
  OpenCanvasIllustration,
} from "./illustrations"

/* ────────────────────────────────────
   8 Letters → 8 Challenges
──────────────────────────────────── */
const LETTER_ICONS = [
  { letter:"D", Icon:ReleaseReadinessIllustration,   title:"Software Release\nReadiness",         track:"BDA & CC",    number:"01", color:"#bf5fff", glow:"rgba(191,95,255,0.65)",  challengeId:"challenge-01" },
  { letter:"A", Icon:SustainableCloudIllustration,    title:"Sustainable\nCloud Computing",        track:"BDA & CC",    number:"02", color:"#00ff88", glow:"rgba(0,255,136,0.65)",   challengeId:"challenge-02" },
  { letter:"T", Icon:SupplyChainRiskIllustration,     title:"Supply Chain\nRisk Intelligence",     track:"BDA & CC",    number:"03", color:"#00e5ff", glow:"rgba(0,229,255,0.65)",   challengeId:"challenge-03" },
  { letter:"A", Icon:FeedbackIntelligenceIllustration,title:"Digital Product\nFeedback Intel",     track:"BDA & CC",    number:"04", color:"#ccff00", glow:"rgba(204,255,0,0.65)",   challengeId:"challenge-04" },
  { letter:"T", Icon:PesticideSprayingIllustration,   title:"Selective Pesticide\nSpraying",       track:"Robotics",    number:"05", color:"#ff6b35", glow:"rgba(255,107,53,0.65)",  challengeId:"challenge-05" },
  { letter:"H", Icon:PipeInspectionIllustration,      title:"Pipe Inspection\n& Defect Detection", track:"Robotics",    number:"06", color:"#00e5ff", glow:"rgba(0,229,255,0.65)",   challengeId:"challenge-06" },
  { letter:"O", Icon:ObjectRetrievalIllustration,     title:"Autonomous\nObject Retrieval",        track:"Robotics",    number:"07", color:"#bf5fff", glow:"rgba(191,95,255,0.65)",  challengeId:"challenge-07" },
  { letter:"N", Icon:OpenCanvasIllustration,           title:"Open Innovation\nChallenge",          track:"Open Track",  number:"08", color:"#ccff00", glow:"rgba(204,255,0,0.65)",   challengeId:"challenge-08" },
] as const

type Phase = "idle" | "burst" | "fly" | "orbit"
interface LetterPos { x: number; y: number }

/* ────────────────────────────────────
   Main component
──────────────────────────────────── */
export function DatathonIconsAnimation({ ready = true }: { ready?: boolean }) {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView]         = useState(true)
  const [phase, setPhase]               = useState<Phase>("idle")
  const [letterPositions, setLetterPositions] = useState<LetterPos[]>([])
  const [orbitCenter, setOrbitCenter]   = useState({ x: 0, y: 0 })
  const [orbitRadius, setOrbitRadius]   = useState(170)
  const [iconSize, setIconSize]         = useState(60)
  const [logoSize, setLogoSize]         = useState(110)
  const [hoveredIdx, setHoveredIdx]     = useState<number | null>(null)
  const [logoHovered, setLogoHovered]   = useState(false)

  /* Smooth mouse parallax — ultra-damped cinematic springs */
  const mouseX   = useMotionValue(0)
  const mouseY   = useMotionValue(0)
  const springX  = useSpring(mouseX, { stiffness: 45, damping: 26, mass: 0.6 })
  const springY  = useSpring(mouseY, { stiffness: 45, damping: 26, mass: 0.6 })
  const px       = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const py       = useTransform(springY, [-0.5, 0.5], [-12, 12])
  const rotX     = useTransform(springY, [-0.5, 0.5], [4, -4])
  const rotY     = useTransform(springX, [-0.5, 0.5], [-6, 6])

  /* IntersectionObserver to pause & release GPU memory when scrolled away from Hero */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#top")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: "80px 0px" }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    let rafId: number | null = null

    const onMove = (e: MouseEvent) => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth  - 0.5)
        mouseY.set(e.clientY / window.innerHeight - 0.5)
        rafId = null
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMove)
    }
  }, [isInView, mouseX, mouseY])

  /* Measure DOM positions */
  const measure = useCallback(() => {
    const hero = document.querySelector<HTMLElement>("#top")
    if (!hero) return
    const heroRect = hero.getBoundingClientRect()
    const desktop  = window.innerWidth >= 768

    /* Sizing */
    const iSize = desktop ? Math.min(68, Math.max(52, heroRect.width * 0.044)) : 44
    const lSize = desktop ? Math.min(120, Math.max(90, heroRect.width * 0.078)) : 80
    const radius = desktop
      ? Math.min(175, Math.max(130, heroRect.width * 0.115))
      : Math.min(120, heroRect.width * 0.28)
    setIconSize(iSize)
    setLogoSize(lSize)
    setOrbitRadius(radius)

    /* Orbit center: center of hero-orbit-anchor on desktop, else bottom-center */
    const anchor = hero.querySelector<HTMLElement>("#hero-orbit-anchor")
    if (anchor && desktop) {
      const a = anchor.getBoundingClientRect()
      setOrbitCenter({
        x: a.left + a.width  / 2 - heroRect.left,
        y: a.top  + a.height / 2 - heroRect.top,
      })
    } else {
      setOrbitCenter({
        x: heroRect.width * 0.5,
        y: heroRect.height * 0.68,
      })
    }

    /* Letter centres */
    const spans = hero.querySelectorAll<HTMLElement>("[data-datathon-letter]")
    const pos: LetterPos[] = []
    spans.forEach(s => {
      const r = s.getBoundingClientRect()
      pos.push({ x: r.left + r.width/2 - heroRect.left, y: r.top + r.height/2 - heroRect.top })
    })
    if (pos.length > 0) setLetterPositions(pos)
  }, [])

  useEffect(() => {
    if (!ready) return
    measure()
    const t0 = setTimeout(() => {
      measure()
      setPhase("burst")
      const t1 = setTimeout(() => setPhase("fly"),   5800)
      const t2 = setTimeout(() => setPhase("orbit"), 13200)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }, 1000)
    window.addEventListener("resize", measure, { passive: true })
    return () => { clearTimeout(t0); window.removeEventListener("resize", measure) }
  }, [ready, measure])

  if (phase === "idle" || letterPositions.length < 8) {
    return <div ref={overlayRef} className="absolute inset-0 pointer-events-none" />
  }

  const PERIOD = 45

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{
        overflow: "visible",
        perspective: 1400,
        visibility: isInView ? "visible" : "hidden",
        willChange: "transform",
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: px,
          y: py,
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* ── NEON Logo + Orbit System ── */}
        <AnimatePresence>
          {(phase === "burst" || phase === "fly" || phase === "orbit") && (
            <NeonOrbitSystem
              key="neon"
              orbitCenter={orbitCenter}
              orbitRadius={orbitRadius}
              logoSize={logoSize}
              logoHovered={logoHovered}
              setLogoHovered={setLogoHovered}
            />
          )}
        </AnimatePresence>

        {/* ── Icons ── */}
        {LETTER_ICONS.map((item, i) => (
          <IconNode
            key={i}
            item={item}
            index={i}
            total={LETTER_ICONS.length}
            phase={phase}
            letterPos={letterPositions[i] ?? { x: 0, y: 0 }}
            orbitCenter={orbitCenter}
            orbitRadius={orbitRadius}
            iconSize={iconSize}
            period={PERIOD}
            isHovered={hoveredIdx === i}
            anyHovered={hoveredIdx !== null}
            onHoverStart={() => setHoveredIdx(i)}
            onHoverEnd={() => setHoveredIdx(null)}
          />
        ))}
      </motion.div>
    </div>
  )
}

/* ────────────────────────────────────
   Orbit system: NEON logo + rings
──────────────────────────────────── */
function NeonOrbitSystem({
  orbitCenter, orbitRadius, logoSize, logoHovered, setLogoHovered,
}: {
  orbitCenter: { x: number; y: number }
  orbitRadius: number
  logoSize: number
  logoHovered: boolean
  setLogoHovered: (v: boolean) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
      className="absolute"
      style={{ left: orbitCenter.x, top: orbitCenter.y, willChange: "transform, opacity" }}
    >
      {/* Outer ambient glow blob — hardware accelerated radial gradient */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  orbitRadius * 2.6,
          height: orbitRadius * 2.6,
          left:  -orbitRadius * 1.3,
          top:   -orbitRadius * 1.3,
          background: "radial-gradient(circle, rgba(0,255,136,0.12) 0%, rgba(0,229,255,0.06) 45%, transparent 70%)",
          willChange: "transform, opacity",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dashed orbit ring — slowly rotates */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  orbitRadius * 2,
          height: orbitRadius * 2,
          left:  -orbitRadius,
          top:   -orbitRadius,
          border: "1.5px dashed rgba(0,255,136,0.28)",
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Second solid ring at 0.65x — gives depth */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  orbitRadius * 1.3,
          height: orbitRadius * 1.3,
          left:  -orbitRadius * 0.65,
          top:   -orbitRadius * 0.65,
          border: "1px solid rgba(0,229,255,0.14)",
          willChange: "transform",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Sweeping conic light beam */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:  orbitRadius * 2,
          height: orbitRadius * 2,
          left:  -orbitRadius,
          top:   -orbitRadius,
          background: "conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(0,255,136,0.14) 88%, transparent 100%)",
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* ── NEON Logo ── */}
      <motion.div
        className="absolute pointer-events-auto cursor-pointer select-none"
        style={{ width: logoSize, height: logoSize, left: -logoSize/2, top: -logoSize/2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        {/* Animated conic border */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: -4,
            background: "conic-gradient(from 0deg, #00ff88, #00e5ff, #bf5fff, #ccff00, #ff6b35, #00ff88)",
            opacity: logoHovered ? 0.9 : 0.55,
            willChange: "transform",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        {/* Glass plate */}
        <div
          className="absolute inset-0 rounded-full backdrop-blur-sm border border-white/10"
          style={{
            background: "radial-gradient(circle at 35% 30%, rgba(12,26,20,0.96), rgba(4,8,10,0.99))",
            boxShadow: logoHovered
              ? "0 0 35px rgba(0,255,136,0.5), inset 0 0 20px rgba(0,255,136,0.15)"
              : "0 0 18px rgba(0,255,136,0.25), inset 0 0 10px rgba(0,255,136,0.08)",
          }}
        />
        {/* Logo image */}
        <img
          src="/neon-logo.png"
          alt="NEON"
          className="relative z-10 w-full h-full object-contain p-2 rounded-full"
          style={{
            filter: logoHovered
              ? "drop-shadow(0 0 14px rgba(0,255,136,0.9)) brightness(1.3)"
              : "drop-shadow(0 0 8px rgba(0,255,136,0.55))",
          }}
        />
        {/* Tooltip */}
        <AnimatePresence>
          {logoHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="absolute z-40 whitespace-nowrap pointer-events-none"
              style={{
                left: "50%", bottom: "calc(100% + 12px)", transform: "translateX(-50%)",
                background: "rgba(4,8,10,0.94)",
                border: "1px solid rgba(0,255,136,0.5)",
                borderRadius: 10, padding: "8px 14px",
                boxShadow: "0 8px 32px rgba(0,255,136,0.22)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-[11px] font-black tracking-wider text-accent-green uppercase font-display">DATATHON 2K26</div>
              <div className="text-[9px] font-semibold text-ink-muted uppercase tracking-widest mt-0.5">BDA & CC × ROBOTICS</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────────────
   Per-icon phase orchestrator
──────────────────────────────────── */
function IconNode({
  item, index, total, phase,
  letterPos, orbitCenter, orbitRadius, iconSize, period,
  isHovered, anyHovered, onHoverStart, onHoverEnd,
}: {
  item: typeof LETTER_ICONS[number]
  index: number; total: number; phase: Phase
  letterPos: LetterPos; orbitCenter: { x:number; y:number }
  orbitRadius: number; iconSize: number; period: number
  isHovered: boolean; anyHovered: boolean
  onHoverStart: () => void; onHoverEnd: () => void
}) {
  const { Icon, color, glow } = item
  const half = iconSize / 2
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const startDeg = (index / total) * 360 - 90
  const lx = letterPos.x - half
  const ly = letterPos.y - half
  const ox = orbitCenter.x + Math.cos(angle) * orbitRadius - half
  const oy = orbitCenter.y + Math.sin(angle) * orbitRadius - half

  /* BURST: pop from letter (calm, slower jump) */
  if (phase === "burst") return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: iconSize,
        height: iconSize,
        color,
        willChange: "transform, opacity",
      }}
      initial={{ x: lx, y: ly, scale: 0, opacity: 0, rotate: -30 }}
      animate={{ x: lx, y: ly - 34, scale: [0, 1.25, 1.15], opacity: 1, rotate: [0, 10, 0] }}
      transition={{ duration: 1.9, delay: 0.52 * index, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Shockwave ring */}
      <motion.div
        className="absolute inset-[-14px] rounded-full"
        style={{ border: `2px solid ${color}`, willChange: "transform, opacity" }}
        initial={{ scale: 0.4, opacity: 0.85 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 2.0, delay: 0.52 * index + 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Visual Badge Frame matching orbit design */}
      <div
        className="w-full h-full rounded-2xl flex items-center justify-center p-1.5 backdrop-blur-xs"
        style={{
          background: "rgba(4,8,10,0.8)",
          border: `1.5px solid ${color}66`,
          boxShadow: `0 0 20px ${color}44, inset 0 0 12px ${color}18`,
          color,
        }}
      >
        <Icon className="w-full h-full" animate="hover" />
      </div>
    </motion.div>
  )

  /* FLY: travel from letter to orbit slot (slower, one-by-one flight) */
  if (phase === "fly") return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: iconSize,
        height: iconSize,
        color,
        willChange: "transform",
      }}
      initial={{ x: lx, y: ly - 34, scale: 1.15, opacity: 1 }}
      animate={{ x: ox, y: oy, scale: 1, opacity: 1 }}
      transition={{ duration: 3.0, delay: index * 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Motion trail dot */}
      <motion.div
        className="absolute inset-1/4 rounded-full"
        style={{ background: color, opacity: 0.45 }}
        animate={{ opacity: [0.45, 0], scale: [1, 2.2] }}
        transition={{ duration: 2.6, ease: "easeOut" }}
      />
      {/* Visual Badge Frame matching orbit design */}
      <div
        className="w-full h-full rounded-2xl flex items-center justify-center p-1.5 backdrop-blur-xs"
        style={{
          background: "rgba(4,8,10,0.7)",
          border: `1.5px solid ${color}44`,
          boxShadow: `0 0 16px ${color}33, inset 0 0 10px ${color}12`,
          color,
        }}
      >
        <Icon className="w-full h-full" animate="rest" />
      </div>
    </motion.div>
  )

  /* ORBIT: continuous revolution */
  if (phase === "orbit") return (
    <OrbitingIcon
      item={item} index={index}
      startDeg={startDeg} orbitCenter={orbitCenter} orbitRadius={orbitRadius}
      iconSize={iconSize} period={period} glow={glow}
      isHovered={isHovered} anyHovered={anyHovered}
      onHoverStart={onHoverStart} onHoverEnd={onHoverEnd}
    />
  )

  return null
}

/* ────────────────────────────────────
   Orbiting Icon — wrapper-rotate trick
   + rich visuals
──────────────────────────────────── */
function OrbitingIcon({
  item, index, startDeg, orbitCenter, orbitRadius, iconSize, period, glow,
  isHovered, anyHovered, onHoverStart, onHoverEnd,
}: {
  item: typeof LETTER_ICONS[number]
  index: number; startDeg: number
  orbitCenter: { x:number; y:number }; orbitRadius: number
  iconSize: number; period: number; glow: string
  isHovered: boolean; anyHovered: boolean
  onHoverStart: () => void; onHoverEnd: () => void
}) {
  const { Icon, color, title, number, track, challengeId } = item
  const half = iconSize / 2
  const slowPeriod = period * 3.5

  return (
    /* Outer wrapper: centered on orbit, rotates continuously */
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: orbitCenter.x,
        top: orbitCenter.y,
        width: 0,
        height: 0,
        rotate: startDeg,
        willChange: "transform",
      }}
      initial={{ rotate: startDeg, opacity: 1 }}
      animate={{ rotate: startDeg + 360, opacity: 1 }}
      transition={{
        rotate: { duration: anyHovered ? slowPeriod : period, repeat: Infinity, ease: "linear" },
      }}
    >
      {/* Inner: positioned on ring edge, counter-rotated to stay upright */}
      <motion.div
        className="absolute"
        style={{
          left: orbitRadius - half,
          top: -half,
          rotate: -startDeg,
          willChange: "transform",
        }}
        animate={{ rotate: -(startDeg + 360) }}
        transition={{ duration: anyHovered ? slowPeriod : period, repeat: Infinity, ease: "linear" }}
      >
        {/* ── Clickable icon ── */}
        <motion.a
          href={`#${challengeId}`}
          className="relative block pointer-events-auto cursor-pointer"
          style={{ width: iconSize, height: iconSize }}
          animate={{
            scale:   isHovered ? 1.55 : anyHovered ? 0.68 : 1,
            opacity: anyHovered && !isHovered ? 0.3 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 24 }}
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          whileTap={{ scale: 1.15 }}
          aria-label={`${number} — ${title}`}
        >
          {/* Radial neon halo on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="halo"
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -20,
                  background: `radial-gradient(circle, ${glow} 0%, ${color}22 50%, transparent 72%)`,
                  boxShadow: `0 0 40px ${color}99, 0 0 80px ${color}44`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>

          {/* Orbit particle dot that trails the icon */}
          <div
            className="absolute rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              width: 6,
              height: 6,
              left: "50%",
              top: "50%",
              marginLeft: -3,
              marginTop: -3,
              background: color,
              boxShadow: `0 0 8px ${color}, 0 0 16px ${color}88`,
              opacity: isHovered ? 0 : 0.75,
            }}
          />

          {/* Icon badge */}
          <div
            className="w-full h-full rounded-2xl flex items-center justify-center p-1.5 backdrop-blur-sm"
            style={{
              background: isHovered
                ? `radial-gradient(circle, rgba(12,26,20,0.96), rgba(4,8,10,0.99))`
                : "rgba(4,8,10,0.6)",
              border: isHovered
                ? `1.5px solid ${color}`
                : `1px solid ${color}44`,
              boxShadow: isHovered
                ? `0 0 28px ${color}88, 0 0 55px ${color}44, inset 0 0 16px ${color}22`
                : `0 0 14px ${color}44, 0 0 28px ${color}22`,
              color,
            }}
          >
            <Icon className="w-full h-full" animate={isHovered ? "hover" : "rest"} />
          </div>

          {/* Rich tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="tip"
                className="absolute z-50 pointer-events-none whitespace-nowrap"
                style={{
                  left: "50%", bottom: "calc(100% + 16px)",
                  transform: "translateX(-50%)",
                  background: "rgba(4,8,10,0.96)",
                  border: `1px solid ${color}77`,
                  borderRadius: 12, padding: "10px 16px", minWidth: 210,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.85), 0 0 30px ${color}33`,
                  backdropFilter: "blur(16px)",
                }}
                initial={{ opacity: 0, y: 12, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {/* Track badge + number */}
                <div className="flex items-center justify-between gap-3 pb-1.5 mb-2 border-b border-white/8">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
                    {track}
                  </span>
                  <span className="font-display text-[11px] font-black text-ink">#{number}</span>
                </div>
                <div className="font-display text-[13px] font-black uppercase tracking-tight text-ink leading-tight whitespace-pre-line">{title}</div>
                <div className="mt-2.5 flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest" style={{ color }}>
                  <span>View Challenge</span><span>→</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
