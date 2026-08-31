import type { ReactElement, SVGProps } from "react"
import { motion } from "framer-motion"

type IllustrationProps = SVGProps<SVGSVGElement> & {
  /** Drives per-illustration micro-animations. "hover" plays the motif's signature motion. */
  animate?: "rest" | "hover"
}

const base = {
  viewBox: "0 0 200 200",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const springy = { type: "spring" as const, stiffness: 260, damping: 20 }

/** 01 — Enterprise Knowledge Discovery: a document stack searched by a magnifying glass */
export function KnowledgeDiscoveryIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { y: 0 },
          hover: { y: -3 },
        }}
        transition={springy}
      >
        <rect x="34" y="96" width="62" height="78" rx="3" />
      </motion.g>
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ ...springy, delay: 0.05 }}
      >
        <rect x="44" y="86" width="62" height="78" rx="3" />
      </motion.g>
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { y: 0 }, hover: { y: -9 } }}
        transition={{ ...springy, delay: 0.1 }}
      >
        <rect x="54" y="76" width="62" height="78" rx="3" />
        <line x1="66" y1="94" x2="102" y2="94" />
        <line x1="66" y1="106" x2="102" y2="106" />
        <line x1="66" y1="118" x2="90" y2="118" />
      </motion.g>
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { x: 0, y: 0, rotate: 0 },
          hover: { x: 6, y: -4, rotate: -8 },
        }}
        transition={springy}
        style={{ transformOrigin: "132px 70px" }}
      >
        <circle cx="132" cy="70" r="10" />
        <circle cx="132" cy="70" r="4" />
        <line x1="139" y1="77" x2="156" y2="94" />
      </motion.g>
    </svg>
  )
}

/** 02 — API Change Impact Analysis: connected nodes with one changing node sending ripples */
export function ApiImpactIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
        transition={springy}
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="100" cy="100" r="14" />
      </motion.g>
      <circle cx="46" cy="60" r="9" />
      <circle cx="46" cy="140" r="9" />
      <circle cx="154" cy="60" r="9" />
      <circle cx="154" cy="140" r="9" />
      <motion.circle
        cx="30"
        cy="100"
        r="7"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 1 }, hover: { opacity: [1, 0.2, 1] } }}
        transition={{ duration: 0.9, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      />
      <line x1="88" y1="92" x2="53" y2="65" />
      <line x1="88" y1="108" x2="53" y2="135" />
      <line x1="112" y1="92" x2="147" y2="65" />
      <line x1="112" y1="108" x2="147" y2="135" />
      <motion.line
        x1="86"
        y1="100"
        x2="37"
        y2="100"
        initial={false}
        animate={animate}
        variants={{
          rest: { strokeDasharray: "0 0", opacity: 1 },
          hover: { strokeDasharray: "6 6", opacity: [1, 0.4, 1] },
        }}
        transition={{ duration: 0.8, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="24"
        strokeDasharray="3 6"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 0.55, scale: 1 }, hover: { opacity: 0.3, scale: 1.3 } }}
        transition={{ duration: 0.9, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
        style={{ transformOrigin: "100px 100px" }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="34"
        strokeDasharray="3 6"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 0.3, scale: 1 }, hover: { opacity: 0.1, scale: 1.4 } }}
        transition={{ duration: 0.9, delay: 0.15, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
        style={{ transformOrigin: "100px 100px" }}
      />
    </svg>
  )
}

/** 03 — Software Release Readiness: rocket with checkmarks, bug, and warning symbols */
export function ReleaseReadinessIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { y: 0 },
          hover: { y: [-1, -8, -3] },
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M100 40c14 8 20 30 20 52 0 16-6 34-20 46-14-12-20-30-20-46 0-22 6-44 20-52Z" />
        <circle cx="100" cy="86" r="8" />
        <path d="M84 118l-14 26 20-8" />
        <path d="M116 118l14 26-20-8" />
        <motion.path
          d="M92 158l8 20 8-20"
          initial={false}
          animate={animate}
          variants={{ rest: { opacity: 0.6, scaleY: 1 }, hover: { opacity: 1, scaleY: 1.3 } }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "100px 158px" }}
        />
      </motion.g>
      <path d="M46 70l8 8M50 66l0 12" />
      <path d="M150 100l10 4-10 4M154 90v20" />
      <motion.path
        d="M40 130l6 6 10-10"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 0.7 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  )
}

/** 04 — Intelligent Procurement Analytics: shopping basket with quotation sheets and price tags */
export function ProcurementAnalyticsIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <path d="M50 90h100l-10 62a8 8 0 0 1-8 7H68a8 8 0 0 1-8-7L50 90Z" />
      <path d="M70 90l6-24h48l6 24" />
      <line x1="60" y1="108" x2="140" y2="108" />
      <line x1="66" y1="126" x2="134" y2="126" />
      <line x1="72" y1="144" x2="128" y2="144" />
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { rotate: 0, y: 0 },
          hover: { rotate: [0, -8, 6, 0], y: [0, -3, 0] },
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "150px 56px" }}
      >
        <circle cx="150" cy="56" r="16" />
        <line x1="142" y1="48" x2="158" y2="64" />
        <line x1="150" y1="46" x2="150" y2="50" />
      </motion.g>
    </svg>
  )
}

/** 05 — Cybersecurity Threat Investigation: shield with a scanning magnifying glass */
export function ThreatInvestigationIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <path d="M100 36l46 16v40c0 34-22 54-46 66-24-12-46-32-46-66V52l46-16Z" />
      <path d="M84 96l12 14 22-30" />
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { x: 0, y: 0 },
          hover: { x: [-8, 8, -4, 0], y: [4, -4, 2, 0] },
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="150" cy="70" r="17" />
        <line x1="162" y1="82" x2="176" y2="96" />
        <line x1="150" y1="62" x2="150" y2="70" />
        <circle cx="150" cy="78" r="1.2" fill="currentColor" />
      </motion.g>
    </svg>
  )
}

/** 06 — Sustainable Cloud Computing: cloud with leaf and energy symbol */
export function SustainableCloudIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M56 128a26 26 0 0 1 4-52 34 34 0 0 1 66-8 28 28 0 0 1 8 55.5" />
        <path d="M56 128h72" />
      </motion.g>
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.15 } }}
        transition={springy}
        style={{ transformOrigin: "100px 111px" }}
      >
        <path d="M100 96c10 8 10 22 0 30-10-8-10-22 0-30Z" />
        <path d="M100 96v30" />
      </motion.g>
      <motion.path
        d="M132 146l-8 16h10l-8 16"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 0.7 }, hover: { opacity: [0.4, 1, 0.4] } }}
        transition={{ duration: 0.7, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      />
    </svg>
  )
}

/** 07 — Supply Chain Risk Intelligence: delivery truck with warning signs on a route */
export function SupplyChainRiskIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { x: 0 }, hover: { x: [0, 6, 0] } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="34" y="98" width="70" height="38" rx="3" />
        <path d="M104 110h26l16 16v12h-42z" />
        <circle cx="60" cy="144" r="10" />
        <circle cx="132" cy="144" r="10" />
      </motion.g>
      <line x1="34" y1="98" x2="34" y2="80" />
      <motion.path
        d="M34 80h140"
        strokeDasharray="2 8"
        initial={false}
        animate={animate}
        variants={{ rest: { strokeDashoffset: 0 }, hover: { strokeDashoffset: -30 } }}
        transition={{ duration: 0.8, ease: "linear", repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      />
      <path d="M150 56l10 18h-20z" />
      <line x1="150" y1="62" x2="150" y2="68" />
    </svg>
  )
}

/** 08 — Digital Product Feedback Intelligence: speech bubble with review stars appearing */
export function FeedbackIntelligenceIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <path d="M40 60h96a10 10 0 0 1 10 10v46a10 10 0 0 1-10 10H92l-22 20v-20H40a10 10 0 0 1-10-10V70a10 10 0 0 1 10-10Z" />
      <line x1="52" y1="82" x2="126" y2="82" />
      <line x1="52" y1="98" x2="106" y2="98" />
      <motion.path
        d="M150 44l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z"
        initial={false}
        animate={animate}
        variants={{
          rest: { opacity: 0, scale: 0.6 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ ...springy, delay: 0.05 }}
        style={{ transformOrigin: "154px 62px" }}
      />
      <motion.path
        d="M160 100l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
        initial={false}
        animate={animate}
        variants={{
          rest: { opacity: 0, scale: 0.6 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ ...springy, delay: 0.15 }}
        style={{ transformOrigin: "162px 108px" }}
      />
    </svg>
  )
}

/** 09 — Selective Pesticide Spraying: agri robot scanning and treating one plant */
export function PesticideSprayingIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <rect x="60" y="96" width="60" height="34" rx="6" />
      <circle cx="76" cy="140" r="10" />
      <circle cx="104" cy="140" r="10" />
      <rect x="82" y="78" width="16" height="18" rx="3" />
      <line x1="90" y1="78" x2="90" y2="66" />
      <motion.circle
        cx="90"
        cy="62"
        r="4"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 1 }, hover: { opacity: [1, 0.3, 1] } }}
        transition={{ duration: 0.6, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      />
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { opacity: 0.9 },
          hover: { opacity: [0.4, 1, 0.4] },
        }}
        transition={{ duration: 0.5, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      >
        <path d="M120 106l24-6" />
        <path d="M148 96l6 4-2 7" />
      </motion.g>
      <path d="M44 150c0-20 8-34 8-34" />
      <path d="M44 150c6-2 10-8 10-16" />
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={springy}
        style={{ transformOrigin: "150px 150px" }}
      >
        <path d="M150 150c0-16-6-26-6-26" />
        <path d="M150 150c-6-2-10-8-10-14" />
      </motion.g>
    </svg>
  )
}

/** 10 — Pipe Inspection with Defect Localization: inspection robot moving to a detected crack */
export function PipeInspectionIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 80h160" />
      <path d="M20 130h160" />
      <path d="M20 80v50M180 80v50" />
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { x: 0 }, hover: { x: 26 } }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="92" cy="105" r="18" />
        <circle cx="92" cy="105" r="6" />
        <line x1="74" y1="105" x2="60" y2="105" />
        <line x1="110" y1="105" x2="124" y2="105" />
      </motion.g>
      <path d="M140 90l8 8-8 8M148 98l-6-6" opacity="0.7" />
      <motion.path
        d="M150 118l4 6-6 4 4 6"
        initial={false}
        animate={animate}
        variants={{ rest: { opacity: 0.7 }, hover: { opacity: [0.4, 1, 0.4] } }}
        transition={{ duration: 0.6, repeat: animate === "hover" ? Number.POSITIVE_INFINITY : 0 }}
      />
    </svg>
  )
}

/** 11 — Autonomous Retrieval of Dropped Objects: friendly robot reaching for an object */
export function ObjectRetrievalIllustration({ animate = "rest", ...props }: IllustrationProps) {
  return (
    <svg {...base} {...props}>
      <rect x="40" y="90" width="36" height="30" rx="6" />
      <circle cx="50" cy="102" r="3" fill="currentColor" />
      <circle cx="66" cy="102" r="3" fill="currentColor" />
      <line x1="58" y1="90" x2="58" y2="78" />
      <circle cx="58" cy="74" r="4" />
      <circle cx="58" cy="128" r="9" />
      <motion.g
        initial={false}
        animate={animate}
        variants={{
          rest: { x: 0, y: 0 },
          hover: { x: 10, y: -4 },
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <line x1="76" y1="105" x2="98" y2="95" />
        <circle cx="102" cy="92" r="6" />
      </motion.g>
      <circle cx="150" cy="70" r="10" />
      <line x1="150" y1="80" x2="150" y2="120" />
      <line x1="150" y1="92" x2="132" y2="106" />
      <line x1="150" y1="92" x2="168" y2="106" />
      <line x1="150" y1="120" x2="136" y2="150" />
      <line x1="150" y1="120" x2="164" y2="150" />
    </svg>
  )
}

/** Hero robot: playful robot interacting with a document/problem sheet, subtly animated externally */
export function HeroRobotIllustration(props: IllustrationProps) {
  const { animate: _animate, ...rest } = props
  return (
    <svg {...base} {...rest}>
      <rect x="58" y="52" width="52" height="42" rx="10" />
      <circle cx="74" cy="72" r="4" fill="currentColor" />
      <circle cx="94" cy="72" r="4" fill="currentColor" />
      <path d="M74 84h20" />
      <line x1="84" y1="52" x2="84" y2="38" />
      <circle cx="84" cy="34" r="4" />
      <line x1="58" y1="66" x2="44" y2="66" />
      <line x1="110" y1="66" x2="124" y2="66" />
      <rect x="60" y="94" width="48" height="20" rx="6" />
      <rect x="44" y="118" width="64" height="60" rx="4" />
      <line x1="56" y1="134" x2="96" y2="134" />
      <line x1="56" y1="146" x2="96" y2="146" />
      <line x1="56" y1="158" x2="80" y2="158" />
      <circle cx="118" cy="150" r="4" fill="currentColor" />
    </svg>
  )
}

/** Hero BDA & Cloud: Futuristic cloud network with database server stack and analytics flow */
export function HeroBdaCloudIllustration(props: IllustrationProps) {
  const { animate = "rest", ...rest } = props
  return (
    <svg {...base} {...rest}>
      {/* Cloud perimeter */}
      <path
        d="M62 90 C50 90 40 100 40 112 C40 124 50 134 62 134 L142 134 C156 134 168 122 168 108 C168 95 158 84 146 83 C144 65 128 50 108 50 C92 50 78 60 72 74 C69 73 65 72 62 72 C50 72 40 82 40 94"
        strokeWidth="2.5"
      />
      {/* Database server rack in cloud */}
      <rect x="74" y="78" width="52" height="15" rx="3" />
      <circle cx="84" cy="85.5" r="2.5" fill="currentColor" />
      <circle cx="92" cy="85.5" r="2.5" fill="currentColor" />
      <line x1="102" y1="85.5" x2="118" y2="85.5" />

      <rect x="74" y="99" width="52" height="15" rx="3" />
      <circle cx="84" cy="106.5" r="2.5" fill="currentColor" />
      <circle cx="92" cy="106.5" r="2.5" fill="currentColor" />
      <line x1="102" y1="106.5" x2="118" y2="106.5" />

      {/* Analytics chart bars descending from cloud */}
      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { y: 0 }, hover: { y: -4 } }}
        transition={springy}
      >
        <line x1="68" y1="142" x2="68" y2="170" strokeDasharray="3 3" />
        <rect x="60" y="154" width="16" height="24" rx="3" />
        <circle cx="68" cy="142" r="3" fill="currentColor" />
      </motion.g>

      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { y: 0 }, hover: { y: -8 } }}
        transition={{ ...springy, delay: 0.05 }}
      >
        <line x1="100" y1="138" x2="100" y2="182" strokeDasharray="3 3" />
        <rect x="92" y="146" width="16" height="32" rx="3" />
        <circle cx="100" cy="138" r="3" fill="currentColor" />
      </motion.g>

      <motion.g
        initial={false}
        animate={animate}
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ ...springy, delay: 0.1 }}
      >
        <line x1="132" y1="142" x2="132" y2="170" strokeDasharray="3 3" />
        <rect x="124" y="150" width="16" height="28" rx="3" />
        <circle cx="132" cy="142" r="3" fill="currentColor" />
      </motion.g>

      {/* Cloud data signal arcs */}
      <path d="M92 38 C97 33 103 33 108 38" strokeLinecap="round" opacity="0.8" />
      <path d="M84 28 C94 20 106 20 116 28" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

/** Open Challenge: playful blank canvas / plus illustration */
export function OpenCanvasIllustration(props: IllustrationProps) {
  const { animate: _animate, ...rest } = props
  return (
    <svg {...base} {...rest}>
      <rect x="40" y="40" width="120" height="120" rx="6" strokeDasharray="4 8" />
      <line x1="100" y1="76" x2="100" y2="124" />
      <line x1="76" y1="100" x2="124" y2="100" />
    </svg>
  )
}

/** Open Challenge Brain: glowing neural brain with spark — animated pulse on hover */
export function BrainIllustration(props: IllustrationProps) {
  const isHover = props.animate === "hover"
  return (
    <svg {...base} {...props}>
      {/* Left hemisphere */}
      <path d="M100 56 C72 56 50 72 50 92 C50 104 56 114 66 120 C62 126 62 134 68 138 C68 148 76 154 86 152 C90 158 96 160 100 160" />
      {/* Right hemisphere */}
      <path d="M100 56 C128 56 150 72 150 92 C150 104 144 114 134 120 C138 126 138 134 132 138 C132 148 124 154 114 152 C110 158 104 160 100 160" />
      {/* Centre groove */}
      <line x1="100" y1="56" x2="100" y2="160" strokeDasharray="4 5" strokeOpacity="0.4" />
      {/* Neural nodes */}
      <circle cx="72" cy="92" r="5" fill="currentColor" opacity={isHover ? 1 : 0.7} />
      <circle cx="84" cy="112" r="4" fill="currentColor" opacity={isHover ? 1 : 0.6} />
      <circle cx="128" cy="92" r="5" fill="currentColor" opacity={isHover ? 1 : 0.7} />
      <circle cx="116" cy="112" r="4" fill="currentColor" opacity={isHover ? 1 : 0.6} />
      <circle cx="100" cy="82" r="4" fill="currentColor" opacity={isHover ? 1 : 0.5} />
      {/* Synaptic connectors */}
      <line x1="72" y1="92" x2="84" y2="112" strokeOpacity="0.5" />
      <line x1="84" y1="112" x2="100" y2="82" strokeOpacity="0.4" />
      <line x1="100" y1="82" x2="116" y2="112" strokeOpacity="0.4" />
      <line x1="116" y1="112" x2="128" y2="92" strokeOpacity="0.5" />
      {/* Spark bolt on hover */}
      <path
        d="M100 44 L94 60 L100 57 L94 76"
        strokeWidth="2.5"
        opacity={isHover ? 1 : 0.35}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const illustrationMap: Record<string, (props: IllustrationProps) => ReactElement> = {
  "knowledge-discovery": KnowledgeDiscoveryIllustration,
  "api-impact": ApiImpactIllustration,
  "release-readiness": ReleaseReadinessIllustration,
  "procurement-analytics": ProcurementAnalyticsIllustration,
  "threat-investigation": ThreatInvestigationIllustration,
  "sustainable-cloud": SustainableCloudIllustration,
  "supply-chain-risk": SupplyChainRiskIllustration,
  "feedback-intelligence": FeedbackIntelligenceIllustration,
  "pesticide-spraying": PesticideSprayingIllustration,
  "pipe-inspection": PipeInspectionIllustration,
  "object-retrieval": ObjectRetrievalIllustration,
  "open-canvas": BrainIllustration,
}
