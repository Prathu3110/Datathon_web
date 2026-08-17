export type AccentColor = "red" | "blue" | "green" | "yellow"

export type Track = "BDA & CC" | "Robotics" | "Open"

export interface Challenge {
  id: string
  number: string
  title: string
  domain: string
  track: Track
  accent: AccentColor
  illustration: string
  summary: string
  tags: string[]
  problem: string
  lookingFor: string[]
}

export const challenges: Challenge[] = [
  {
    id: "enterprise-knowledge-discovery",
    number: "01",
    title: "Enterprise Knowledge Discovery",
    domain: "Enterprise AI · Knowledge Management",
    track: "BDA & CC",
    accent: "red",
    illustration: "knowledge-discovery",
    summary:
      "Organizational knowledge is scattered across wikis, tickets, PDFs, and chat threads — making it slow for employees to find trustworthy answers when they need them.",
    tags: ["Search", "RAG", "NLP", "Enterprise Data"],
    problem:
      "Large organizations accumulate knowledge across countless disconnected systems — document repositories, wikis, emails, chat logs, and ticketing systems. Employees waste significant time searching for accurate, up-to-date information, often duplicating work or making decisions on outdated data. Build a system that can discover, index, and surface enterprise knowledge from heterogeneous sources, providing accurate, context-aware answers with traceable citations back to source documents.",
    lookingFor: [
      "An architecture that can ingest and normalize knowledge from multiple heterogeneous sources",
      "Retrieval that returns accurate, relevant, and traceable answers with citations",
      "A thoughtful approach to keeping the knowledge base current as source documents change",
      "A usable interface for querying and exploring organizational knowledge",
    ],
  },
  {
    id: "api-change-impact-analysis",
    number: "02",
    title: "API Change Impact Analysis",
    domain: "Software Engineering · API Management",
    track: "BDA & CC",
    accent: "blue",
    illustration: "api-impact",
    summary:
      "A single API change can silently break dozens of downstream consumers. Teams need visibility into what will actually be affected before they ship.",
    tags: ["API Governance", "Dependency Graphs", "DevTools"],
    problem:
      "Modern systems are built from large networks of interdependent APIs. When an API is modified — a field renamed, a parameter deprecated, a schema tightened — it can silently break downstream consumers that were never explicitly tracked. Teams frequently discover these breakages only after they reach production. Build a solution that analyzes API specifications and usage patterns to detect breaking and non-breaking changes, and maps the impact of a proposed change across dependent services before it is deployed.",
    lookingFor: [
      "Reliable detection of breaking vs. non-breaking API changes",
      "A dependency graph that maps consumers to the APIs they rely on",
      "Clear, actionable impact reports for engineering teams",
      "A workflow that fits naturally into existing CI/CD and review processes",
    ],
  },
  {
    id: "software-release-readiness",
    number: "03",
    title: "Software Release Readiness Assessment",
    domain: "DevOps · Software Quality Engineering",
    track: "BDA & CC",
    accent: "green",
    illustration: "release-readiness",
    summary:
      "Deciding whether a build is truly ready to ship means weighing test coverage, open defects, and code churn — usually done by gut feel instead of data.",
    tags: ["DevOps", "Quality Metrics", "CI/CD"],
    problem:
      "Release decisions are often made under time pressure with incomplete visibility into a build's actual quality — test coverage gaps, unresolved defects, code churn, and historical release outcomes are rarely combined into a single, defensible signal. Build a system that aggregates signals from testing, defect tracking, and version control to produce a data-driven readiness assessment for a software release, along with a clear rationale for the recommendation.",
    lookingFor: [
      "Aggregation of meaningful quality signals from multiple engineering data sources",
      "A transparent, explainable readiness score rather than an opaque black box",
      "Sensible handling of incomplete or noisy historical data",
      "A dashboard that helps release managers make faster, better-informed decisions",
    ],
  },
  {
    id: "intelligent-procurement-analytics",
    number: "04",
    title: "Intelligent Procurement Analytics",
    domain: "Enterprise Resource Planning · Procurement",
    track: "BDA & CC",
    accent: "yellow",
    illustration: "procurement-analytics",
    summary:
      "Procurement teams compare vendor quotations, delivery timelines, and pricing trends manually — a process ripe for automation and smarter negotiation.",
    tags: ["ERP", "Analytics", "Vendor Management"],
    problem:
      "Procurement teams handle large volumes of vendor quotations, purchase orders, and delivery records, but comparing vendors on price, quality, and reliability is typically done manually and inconsistently. Build an analytics solution that ingests procurement data to compare vendor quotations, flag pricing anomalies, forecast delivery risk, and recommend optimal purchasing decisions grounded in historical performance.",
    lookingFor: [
      "Structured extraction and normalization of quotation and purchase order data",
      "Meaningful vendor comparison across price, quality, and delivery reliability",
      "Anomaly detection for unusual pricing or terms",
      "Clear, actionable recommendations for procurement decision-makers",
    ],
  },
  {
    id: "cybersecurity-threat-investigation",
    number: "05",
    title: "Cybersecurity Threat Investigation",
    domain: "Cybersecurity · Security Operations",
    track: "BDA & CC",
    accent: "red",
    illustration: "threat-investigation",
    summary:
      "Security analysts drown in alert noise. Investigating a genuine threat means manually correlating logs across systems that were never designed to talk to each other.",
    tags: ["SecOps", "Threat Intelligence", "Log Analysis"],
    problem:
      "Security operations teams are overwhelmed by high volumes of alerts generated across firewalls, endpoints, and applications, with only a small fraction representing genuine threats. Investigating an incident requires manually correlating logs from disparate systems — a slow, error-prone process. Build a system that ingests security logs and alerts, correlates related events into coherent incidents, prioritizes them by severity, and assists analysts in investigating and responding to genuine threats faster.",
    lookingFor: [
      "Effective correlation of related alerts into a single coherent incident",
      "Sensible prioritization that reduces noise and surfaces real threats",
      "An investigative workflow that assists rather than replaces the analyst",
      "Consideration of explainability — analysts need to trust the system's reasoning",
    ],
  },
  {
    id: "sustainable-cloud-computing",
    number: "06",
    title: "Sustainable Cloud Computing",
    domain: "Cloud Computing · Green Computing",
    track: "BDA & CC",
    accent: "green",
    illustration: "sustainable-cloud",
    summary:
      "Cloud infrastructure is often provisioned for peak demand and left running — a huge, invisible source of wasted energy and unnecessary emissions.",
    tags: ["Cloud", "Sustainability", "FinOps"],
    problem:
      "Cloud resources are frequently over-provisioned or left idle, resulting in unnecessary energy consumption, carbon emissions, and cost. Organizations rarely have visibility into the environmental impact of their workloads or actionable ways to reduce it. Build a system that monitors cloud resource utilization, estimates the associated energy and carbon footprint, and recommends optimizations — right-sizing, scheduling, or workload placement — that reduce environmental impact without compromising performance.",
    lookingFor: [
      "Meaningful modeling of energy consumption and carbon footprint from usage data",
      "Practical, low-risk optimization recommendations",
      "A clear before/after view of environmental and cost impact",
      "Awareness of the trade-off between sustainability and performance",
    ],
  },
  {
    id: "supply-chain-risk-intelligence",
    number: "07",
    title: "Supply Chain Risk Intelligence",
    domain: "Supply Chain · Predictive Analytics",
    track: "BDA & CC",
    accent: "blue",
    illustration: "supply-chain-risk",
    summary:
      "Disruptions rarely announce themselves. Weather, geopolitics, and vendor instability quietly build up risk long before a shipment actually fails.",
    tags: ["Logistics", "Predictive Analytics", "Risk Modeling"],
    problem:
      "Supply chains are exposed to a wide range of disruption risks — weather events, geopolitical instability, supplier financial health, and logistics bottlenecks — that are rarely monitored together. By the time a disruption is visible, it is often too late to mitigate. Build a system that ingests supply chain, logistics, and external risk signals to predict potential disruptions before they occur and recommend mitigation strategies to maintain continuity.",
    lookingFor: [
      "Integration of internal supply chain data with relevant external risk signals",
      "Predictive modeling that flags disruption risk with meaningful lead time",
      "Practical mitigation recommendations, not just risk scores",
      "A clear, monitorable view of risk across the supply chain",
    ],
  },
  {
    id: "digital-product-feedback-intelligence",
    number: "08",
    title: "Digital Product Feedback Intelligence",
    domain: "Product Analytics · Artificial Intelligence",
    track: "BDA & CC",
    accent: "yellow",
    illustration: "feedback-intelligence",
    summary:
      "Reviews, ratings, and support tickets are full of signal — but reading all of it, tagged and prioritized, is more than any product team can keep up with.",
    tags: ["NLP", "Sentiment Analysis", "Product Analytics"],
    problem:
      "Digital products generate continuous feedback through reviews, ratings, support tickets, and social mentions, but product teams struggle to synthesize this volume into clear, prioritized action. Build a system that aggregates feedback across channels, extracts sentiment and themes, and surfaces prioritized, actionable insights that help product teams understand what to fix and what to build next.",
    lookingFor: [
      "Robust aggregation of feedback from multiple channels and formats",
      "Accurate sentiment and theme extraction beyond simple keyword matching",
      "Clear prioritization that connects feedback volume and severity to action",
      "A digestible view for product teams to act on, not just a data dump",
    ],
  },
  {
    id: "selective-pesticide-spraying",
    number: "09",
    title: "Selective Pesticide Spraying",
    domain: "Agricultural Robotics · Precision Agriculture · Computer Vision",
    track: "Robotics",
    accent: "green",
    illustration: "pesticide-spraying",
    summary:
      "Blanket spraying wastes chemicals and harms healthy crops. A robot that sees which plants are actually affected can treat only what needs treating.",
    tags: ["Computer Vision", "Agri-Robotics", "Precision Spraying"],
    problem:
      "Traditional pesticide application sprays entire fields uniformly, wasting chemicals, increasing cost, and harming healthy plants and surrounding ecosystems. Build a robotic system that can navigate a field or crop row, identify plants affected by pests or disease using computer vision, and selectively apply pesticide only where it is needed — minimizing chemical usage while maintaining treatment effectiveness.",
    lookingFor: [
      "Reliable detection and localization of affected plants versus healthy ones",
      "Precise, selective actuation of the spraying mechanism",
      "Sound navigation across rows or field sections",
      "Consideration of chemical savings and treatment accuracy as a measurable outcome",
    ],
  },
  {
    id: "pipe-inspection-defect-localization",
    number: "10",
    title: "Pipe Inspection with Defect Localization",
    domain: "Inspection Robotics · Infrastructure Monitoring · Autonomous Navigation",
    track: "Robotics",
    accent: "blue",
    illustration: "pipe-inspection",
    summary:
      "Pipeline failures are expensive and dangerous to find manually. An autonomous inspector can travel the line and flag exactly where damage is forming.",
    tags: ["Autonomous Navigation", "Defect Detection", "Infrastructure"],
    problem:
      "Manual pipeline inspection is slow, costly, and often hazardous, yet undetected cracks, corrosion, and blockages can lead to expensive failures and safety incidents. Build a robotic system capable of autonomously navigating through pipe networks, detecting defects such as cracks, corrosion, or blockages, and accurately localizing them along the pipeline for maintenance teams to act on.",
    lookingFor: [
      "Autonomous navigation through constrained, pipe-like environments",
      "Accurate detection and classification of common defect types",
      "Precise localization of defects relative to a known reference point",
      "A clear inspection report that maintenance teams can act on directly",
    ],
  },
  {
    id: "autonomous-retrieval-dropped-objects",
    number: "11",
    title: "Autonomous Retrieval of Dropped Objects",
    domain: "Assistive Robotics · Healthcare Technology · Human-Robot Interaction",
    track: "Robotics",
    accent: "red",
    illustration: "object-retrieval",
    summary:
      "Individuals with limited mobility often struggle to retrieve objects that fall to the floor, creating dependency on others for simple tasks. Build an assistive robotic system that can detect a dropped object, navigate to it, safely grasp or retrieve it, and return it to the person — with an interaction design that feels safe, intuitive, and dignified for the end user.",
    lookingFor: [
      "Reliable object detection and localization in everyday indoor environments",
      "Safe, effective retrieval and manipulation of varied object types",
      "Thoughtful navigation back to the user, accounting for safety",
      "A human-robot interaction design that prioritizes user comfort and dignity",
    ],
  },
  {
    id: "open-challenge",
    number: "12",
    title: "Open Challenge",
    domain: "Open Domain · Any Track",
    track: "Open",
    accent: "yellow",
    illustration: "open-canvas",
    summary:
      "Students are free to choose their own project title and domain apart from these problem statements. No domain. No title. Your canvas.",
    tags: ["Open Domain", "Innovation", "Free Choice"],
    problem:
      "This is your open canvas. Define your own problem, propose your own solution, and build something that matters to you. The only constraint is that it must demonstrate technical depth, real-world relevance, and a clear impact story.",
    lookingFor: [
      "A clearly defined problem statement of your own choosing",
      "A solution with demonstrable technical depth",
      "A compelling narrative for real-world relevance and impact",
      "Originality and ambition in scope",
    ],
  },
]

export const bdaChallenges = challenges.filter((c) => c.track === "BDA & CC")
export const roboticsChallenges = challenges.filter((c) => c.track === "Robotics")
export const openChallenges = challenges.filter((c) => c.track === "Open")

export const accentColorMap: Record<AccentColor, { text: string; bg: string; border: string }> = {
  red: { text: "text-accent-red", bg: "bg-accent-red", border: "border-accent-red" },
  blue: { text: "text-accent-blue", bg: "bg-accent-blue", border: "border-accent-blue" },
  green: { text: "text-accent-green", bg: "bg-accent-green", border: "border-accent-green" },
  yellow: { text: "text-accent-yellow", bg: "bg-accent-yellow", border: "border-accent-yellow" },
}
