"use client"

import { useState } from "react"
import { MotionConfig } from "framer-motion"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ChallengeIndex } from "@/components/challenge-index"
import { SectionDivider } from "@/components/section-divider"
import { SectionInterstitial } from "@/components/section-interstitial"
import { ChallengeSection } from "@/components/challenge-section"
import { ChallengeDetail } from "@/components/challenge-detail"
import { OpenChallenge } from "@/components/open-challenge"
import { AboutSection } from "@/components/about-section"
import { Gallery } from "@/components/gallery"
import { Register } from "@/components/register"
import { LogoStrip } from "@/components/logo-strip"
import { SiteFooter } from "@/components/site-footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { CustomCursor } from "@/components/custom-cursor"
import { BackgroundWaves } from "@/components/background-waves"
import { bdaChallenges, roboticsChallenges, pad2 } from "@/lib/challenges"

export default function Page() {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null)

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <BackgroundWaves />
        <Nav />
        <Hero />
        <ChallengeIndex />

        <SectionDivider
          id="bda-cc"
          kicker="Part One"
          lines={["BDA", "&", "CC"]}
          supporting={
            <>
              Big Data Analytics
              <br />
              &amp; Cloud Computing
            </>
          }
          count={`${pad2(bdaChallenges.length)} Challenges`}
        />

        {bdaChallenges.map((challenge, index) => (
          <ChallengeSection
            key={challenge.id}
            challenge={challenge}
            reversed={index % 2 === 1}
            onView={setActiveChallenge}
          />
        ))}

        <SectionInterstitial />

        <SectionDivider
          id="robotics"
          kicker="Part Two"
          size="large"
          lines={["ROBOTICS"]}
          align="right"
          supporting={
            <>
              Autonomous Systems
              <br />
              Precision Agriculture
              <br />
              Inspection Robotics
              <br />
              Human-Robot Interaction
            </>
          }
          count={`${pad2(roboticsChallenges.length)} Challenges`}
        />

        {roboticsChallenges.map((challenge, index) => (
          <ChallengeSection
            key={challenge.id}
            challenge={challenge}
            reversed={index % 2 === 1}
            onView={setActiveChallenge}
          />
        ))}

        <OpenChallenge />
        <AboutSection />
        <Gallery />
        <LogoStrip />
        <Register />

        {/* ── University Rankings & Accreditation Banner ── */}
        <section aria-label="University accreditation and world rankings" className="rankings-banner-section">
          <img
            src="/rankings-banner-updated.jpg"
            alt="University accreditation and world rankings — NAAC A++, NIRF Ranked 11th University, QS, THE, Shanghai Ranking, Nature Index, GreenMetric"
            loading="lazy"
            decoding="async"
            className="rankings-banner-img"
          />
        </section>

        <SiteFooter />

        <ChallengeDetail challengeId={activeChallenge} onClose={() => setActiveChallenge(null)} />

        <ScrollProgress />
        <CustomCursor />
      </main>
    </MotionConfig>
  )
}
