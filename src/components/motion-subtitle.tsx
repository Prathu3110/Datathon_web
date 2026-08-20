"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MotionSubtitleProps {
  text: string;
  direction?: "top" | "bottom";
  speed?: number;
  stagger?: number;
  className?: string;
}

/**
 * Animated subtitle that reveals characters one-by-one with a slide motion.
 */
export function MotionSubtitle({
  text,
  direction = "top",
  speed = 1,
  stagger = 0.018,
  className,
}: MotionSubtitleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prevTextRef = useRef<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (prevTextRef.current === text) return;
    prevTextRef.current = text;

    // Clear old content
    container.innerHTML = "";

    // Build char spans
    const chars = text.split("");
    const spans: HTMLSpanElement[] = chars.map((char) => {
      const outer = document.createElement("span");
      outer.style.overflow = "hidden";
      outer.style.display = "inline-block";
      outer.style.verticalAlign = "bottom";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = char === " " ? "\u00a0" : char;

      const fromY = direction === "top" ? "-100%" : "100%";
      inner.style.transform = `translateY(${fromY})`;
      inner.style.opacity = "0";
      inner.style.transition = `transform ${0.38 / speed}s cubic-bezier(0.16,1,0.3,1), opacity ${0.28 / speed}s ease`;

      outer.appendChild(inner);
      container.appendChild(outer);
      return inner;
    });

    // Stagger reveal
    spans.forEach((span, i) => {
      setTimeout(
        () => {
          span.style.transform = "translateY(0%)";
          span.style.opacity = "1";
        },
        i * (stagger * 1000),
      );
    });
  }, [text, direction, speed, stagger]);

  return (
    <span ref={containerRef} aria-label={text} className={cn(className)} />
  );
}
