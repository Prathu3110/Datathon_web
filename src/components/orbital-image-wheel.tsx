"use client"

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface OrbitalImageWheelImage {
  src: string
  alt?: string
  label?: string
  caption?: string
  subtitle?: string
}

export interface OrbitalImageWheelProps {
  images: OrbitalImageWheelImage[]
  autoPlayInterval?: number
  className?: string
}

export function OrbitalImageWheel({
  images,
  autoPlayInterval = 5000,
  className,
}: OrbitalImageWheelProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(1200)
  const [isInView, setIsInView] = useState(false)

  // Drag physics state
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const dragDistanceRef = useRef(0)
  const rotationAngleRef = useRef(0)
  const targetAngleRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const wheelCooldownRef = useRef(false)
  const handleNextRef = useRef<() => void>(() => {})
  const handlePrevRef = useRef<() => void>(() => {})
  const [, setRenderTrigger] = useState(0)
  const [isActiveHovered, setIsActiveHovered] = useState(false)

  // Duplicate items if count is small (< 6) for a full, rich 3D wheel experience
  const displayImages = useMemo(() => {
    if (images.length === 0) return []
    if (images.length < 6) {
      const repeated = [...images]
      while (repeated.length < 6) {
        repeated.push(...images)
      }
      return repeated
    }
    return images
  }, [images])

  const count = displayImages.length
  const angleStep = count > 0 ? (2 * Math.PI) / count : 0

  // Viewport IntersectionObserver to completely halt animations when off-screen
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(element)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: "100px 0px" }
    )
    observer.observe(element)

    return () => {
      resizeObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  // Responsive orbital dimensions adjusted for large photo sets
  const isMobile = containerWidth < 640
  const isTablet = containerWidth >= 640 && containerWidth < 1024

  const baseRadiusX = isMobile
    ? containerWidth * 0.44
    : isTablet
    ? containerWidth * 0.46
    : Math.min(containerWidth * 0.42, 580)
  const radiusX = count > 10 ? baseRadiusX * 1.08 : baseRadiusX
  const radiusZ = isMobile ? 200 : isTablet ? 260 : 340

  const cardWidth = isMobile ? 210 : isTablet ? 250 : 290
  const cardHeight = isMobile ? 290 : isTablet ? 350 : 406

  // On-demand RAF loop: runs only while transitioning or dragging, saves 100% idle CPU
  const startAnimationLoop = useCallback(() => {
    if (animationFrameRef.current !== null) return

    const loop = () => {
      if (!isDraggingRef.current) {
        const diff = targetAngleRef.current - rotationAngleRef.current
        if (Math.abs(diff) > 0.0001) {
          rotationAngleRef.current += diff * 0.14
          setRenderTrigger((v) => v + 1)
          animationFrameRef.current = requestAnimationFrame(loop)
          return
        } else {
          rotationAngleRef.current = targetAngleRef.current
          setRenderTrigger((v) => v + 1)
          animationFrameRef.current = null
          return
        }
      }
      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)
  }, [])

  // Snap to specific index with shortest angle path
  const snapToIndex = useCallback(
    (index: number) => {
      const normalizedIndex = ((index % count) + count) % count
      setCurrentIndex(normalizedIndex)

      const targetAngle = -normalizedIndex * angleStep
      const currentAngle = rotationAngleRef.current
      const twoPi = Math.PI * 2
      const delta = ((targetAngle - currentAngle) % twoPi + twoPi * 1.5) % twoPi - Math.PI
      targetAngleRef.current = currentAngle + delta
      startAnimationLoop()
    },
    [count, angleStep, startAnimationLoop]
  )

  const handleNext = useCallback(() => {
    snapToIndex(currentIndex + 1)
  }, [currentIndex, snapToIndex])

  const handlePrev = useCallback(() => {
    snapToIndex(currentIndex - 1)
  }, [currentIndex, snapToIndex])

  useEffect(() => {
    handleNextRef.current = handleNext
  }, [handleNext])

  useEffect(() => {
    handlePrevRef.current = handlePrev
  }, [handlePrev])

  // Reset hover-zoom whenever the active card changes so it doesn't
  // appear pre-zoomed before the pointer actually hovers it
  useEffect(() => {
    setIsActiveHovered(false)
  }, [currentIndex])

  // Mouse-wheel / trackpad scroll navigation. Uses a native, non-passive
  // listener so preventDefault() can stop the page from scrolling while
  // the wheel is being "scrolled" through, with a short cooldown so one
  // scroll gesture advances one card at a time instead of spinning wildly.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 4) return
      e.preventDefault()
      if (wheelCooldownRef.current) return
      wheelCooldownRef.current = true
      if (delta > 0) {
        handleNextRef.current()
      } else {
        handlePrevRef.current()
      }
      window.setTimeout(() => {
        wheelCooldownRef.current = false
      }, 220)
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  // Autoplay (only active while the gallery is in view)
  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      if (!isDraggingRef.current) {
        handleNext()
      }
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isInView, handleNext, autoPlayInterval])

  // Mouse / Touch Drag handlers with momentum
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    startXRef.current = e.clientX
    dragDistanceRef.current = 0
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    startAnimationLoop()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const deltaX = e.clientX - startXRef.current
    dragDistanceRef.current = deltaX

    const sensitivity = isMobile ? 0.005 : 0.0032
    rotationAngleRef.current += deltaX * sensitivity
    targetAngleRef.current = rotationAngleRef.current
    startXRef.current = e.clientX
    setRenderTrigger((v) => v + 1)
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    const rawIndex = -rotationAngleRef.current / angleStep
    const nearestIndex = Math.round(rawIndex)
    snapToIndex(nearestIndex)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isInView) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isInView, handleNext, handlePrev])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden select-none py-6 flex flex-col items-center justify-center gap-8",
        className
      )}
      style={{
        minHeight: isMobile ? "500px" : "600px",
        contain: "paint layout",
      }}
    >
      {/* Ambient background glow behind the wheel (contained GPU layer) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[350px] bg-accent-green/5 blur-[100px] rounded-full pointer-events-none -z-10"
        style={{ transform: "translate3d(0,0,0)", contain: "strict" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[200px] bg-accent-blue/5 blur-[80px] rounded-full pointer-events-none -z-10"
        style={{ transform: "translate3d(0,0,0)", contain: "strict" }}
      />

      {/* 3D Orbit Stage */}
      <div
        ref={stageRef}
        className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          height: cardHeight + (isMobile ? 50 : 80),
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          touchAction: "pan-y",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {displayImages.map((item, index) => {
            const itemAngle = index * angleStep + rotationAngleRef.current
            const cos = Math.cos(itemAngle)
            const sin = Math.sin(itemAngle)

            const normAngle = Math.abs(Math.atan2(sin, cos))
            const isVisible = count <= 8 || normAngle < Math.PI * 0.6
            if (!isVisible) return null

            const x = sin * radiusX
            const z = cos * radiusZ - radiusZ * 0.35
            const y = (1 - cos) * (isMobile ? 16 : 24)

            const depth = Math.max(0, (cos + 1) / 2)
            const scale = isMobile ? 0.74 + depth * 0.28 : 0.7 + depth * 0.35
            const opacity = Math.max(0.1, Math.min(1, 0.2 + depth * 0.8))
            const rotateY = -sin * 30
            const rotateZ = sin * (isMobile ? 2.5 : 4)
            const isActive = index === currentIndex

            const hoverZoom = isActive && isActiveHovered ? 1.16 : 1

            return (
              <div
                key={index}
                suppressHydrationWarning
                onClick={() => {
                  if (!isActive && Math.abs(dragDistanceRef.current) < 8) {
                    snapToIndex(index)
                  }
                }}
                onMouseEnter={() => {
                  if (isActive) setIsActiveHovered(true)
                }}
                onMouseLeave={() => {
                  if (isActive) setIsActiveHovered(false)
                }}
                className={cn(
                  "absolute left-1/2 top-1/2 origin-center group",
                  isActive ? "cursor-default" : "cursor-pointer"
                )}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex: isActive && isActiveHovered ? 2000 : Math.round(depth * 1000),
                  opacity,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange:
                    isDraggingRef.current || animationFrameRef.current !== null
                      ? "transform, opacity"
                      : "auto",
                }}
              >
                {/*
                  Hover-zoom wrapper: owns the rounded/clip boundary AND the
                  hover scale together, so scaling up grows the whole clipped
                  frame instead of the image overflowing a fixed-size box.
                */}
                <div
                  className={cn(
                    "w-full h-full rounded-2xl overflow-hidden bg-card transition-[transform,box-shadow] duration-300 ease-out",
                    isActive
                      ? "ring-2 ring-accent-green shadow-[0_0_40px_rgba(0,255,136,0.4)] hover:shadow-[0_0_55px_rgba(0,255,136,0.6)]"
                      : "ring-1 ring-border/80 hover:ring-accent-green/50"
                  )}
                  style={{
                    transform: `scale(${hoverZoom})`,
                    transformOrigin: "center",
                  }}
                >
                  {/* Pure Image card layer */}
                  <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center p-1">
                    <img
                      src={item.src}
                      alt={item.alt || `Photo ${index + 1}`}
                      loading={isActive ? "eager" : "lazy"}
                      decoding="async"
                      className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pure Navigation Controls (Left, Right) */}
      <div className="flex items-center justify-center gap-4 z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photo"
          className="p-3 rounded-full bg-card/90 border border-border text-ink hover:text-accent-green hover:border-accent-green/60 transition-all duration-200 cursor-pointer active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photo"
          className="p-3 rounded-full bg-card/90 border border-border text-ink hover:text-accent-green hover:border-accent-green/60 transition-all duration-200 cursor-pointer active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default OrbitalImageWheel
