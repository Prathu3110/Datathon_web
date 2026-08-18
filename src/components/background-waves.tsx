"use client"

type Wave = {
  cy: number
  period: number
  amplitude: number
  color: string
  opacity: number
  duration: number
  reversed: boolean
  strokeWidth: number
}

const waves: Wave[] = [
  { cy: 140, period: 720,  amplitude: 52, color: "#00ff88", opacity: 0.45, duration: 9,  reversed: false, strokeWidth: 1.5 },
  { cy: 300, period: 960,  amplitude: 65, color: "#00e5ff", opacity: 0.28, duration: 14, reversed: true,  strokeWidth: 1.5 },
  { cy: 460, period: 840,  amplitude: 48, color: "#00ff88", opacity: 0.22, duration: 11, reversed: false, strokeWidth: 1   },
  { cy: 600, period: 600,  amplitude: 38, color: "#bf5fff", opacity: 0.25, duration: 8,  reversed: true,  strokeWidth: 1   },
  { cy: 740, period: 1080, amplitude: 44, color: "#00e5ff", opacity: 0.20, duration: 16, reversed: false, strokeWidth: 1.5 },
  { cy: 220, period: 780,  amplitude: 32, color: "#ccff00", opacity: 0.18, duration: 12, reversed: true,  strokeWidth: 1   },
  { cy: 530, period: 900,  amplitude: 55, color: "#00ff88", opacity: 0.14, duration: 18, reversed: false, strokeWidth: 0.8 },
]

/** Generates a smooth sine-like path using cubic bezier curves. */
function generatePath(cy: number, period: number, amplitude: number): string {
  // Cover viewport width (1440 SVG units) plus one extra period for seamless looping
  const totalWidth = 1440 + period * 2
  const qP = period / 4
  let d = `M 0,${cy}`
  for (let x = 0; x <= totalWidth; x += period) {
    // First half-period: arc upward
    d += ` C ${x + qP},${cy - amplitude} ${x + qP},${cy - amplitude} ${x + period / 2},${cy}`
    // Second half-period: arc downward
    d += ` C ${x + 3 * qP},${cy + amplitude} ${x + 3 * qP},${cy + amplitude} ${x + period},${cy}`
  }
  return d
}

export function BackgroundWaves() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {waves.map((wave, i) => (
          <g key={i}>
            {/* animateTransform uses SVG user units — scales correctly with viewBox */}
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from={wave.reversed ? `-${wave.period} 0` : `0 0`}
              to={wave.reversed ? `0 0` : `-${wave.period} 0`}
              dur={`${wave.duration}s`}
              repeatCount="indefinite"
            />
            <path
              d={generatePath(wave.cy, wave.period, wave.amplitude)}
              fill="none"
              stroke={wave.color}
              strokeWidth={wave.strokeWidth}
              opacity={wave.opacity}
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
