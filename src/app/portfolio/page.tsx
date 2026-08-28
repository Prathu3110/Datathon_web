"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AuroraBars } from "@/components/unlumen-ui/aurora-bars";
import { OrbitalImageWheel } from "@/components/unlumen-ui/orbital-image-wheel";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------------------------------
   SECTION WAVES — lightweight SVG sine waves for section backgrounds
   ---------------------------------------------------------------- */
type WaveConfig = {
  cy: number;
  period: number;
  amplitude: number;
  color: string;
  opacity: number;
  duration: number;
  reversed: boolean;
  strokeWidth: number;
};

function generateWavePath(cy: number, period: number, amplitude: number): string {
  const totalWidth = 1440 + period * 2;
  const qP = period / 4;
  let d = `M 0,${cy}`;
  for (let x = 0; x <= totalWidth; x += period) {
    d += ` C ${x + qP},${cy - amplitude} ${x + qP},${cy - amplitude} ${x + period / 2},${cy}`;
    d += ` C ${x + 3 * qP},${cy + amplitude} ${x + 3 * qP},${cy + amplitude} ${x + period},${cy}`;
  }
  return d;
}

const WAVE_PRESETS: Record<string, WaveConfig[]> = {
  cool: [
    { cy: 120, period: 800, amplitude: 35, color: "#00e5ff", opacity: 0.1, duration: 14, reversed: false, strokeWidth: 1.2 },
    { cy: 280, period: 1000, amplitude: 50, color: "#00ff88", opacity: 0.07, duration: 18, reversed: true, strokeWidth: 1 },
    { cy: 400, period: 700, amplitude: 28, color: "#bf5fff", opacity: 0.06, duration: 11, reversed: false, strokeWidth: 1 },
  ],
  warm: [
    { cy: 100, period: 900, amplitude: 40, color: "#bf5fff", opacity: 0.08, duration: 16, reversed: true, strokeWidth: 1.2 },
    { cy: 300, period: 750, amplitude: 30, color: "#ccff00", opacity: 0.06, duration: 12, reversed: false, strokeWidth: 1 },
    { cy: 450, period: 1100, amplitude: 45, color: "#00e5ff", opacity: 0.05, duration: 20, reversed: true, strokeWidth: 1 },
  ],
  subtle: [
    { cy: 200, period: 1000, amplitude: 30, color: "#00ff88", opacity: 0.06, duration: 20, reversed: false, strokeWidth: 1 },
    { cy: 350, period: 850, amplitude: 25, color: "#00e5ff", opacity: 0.05, duration: 15, reversed: true, strokeWidth: 0.8 },
  ],
  light: [
    { cy: 150, period: 900, amplitude: 32, color: "#00e5ff", opacity: 0.05, duration: 16, reversed: false, strokeWidth: 0.8 },
    { cy: 350, period: 750, amplitude: 28, color: "#bf5fff", opacity: 0.04, duration: 13, reversed: true, strokeWidth: 0.6 },
    { cy: 250, period: 1100, amplitude: 40, color: "#00ff88", opacity: 0.035, duration: 22, reversed: false, strokeWidth: 0.6 },
  ],
};

function SectionWaves({ preset = "cool" }: { preset?: "cool" | "warm" | "subtle" | "light" }) {
  const waves = WAVE_PRESETS[preset];
  return (
    <div className="section-waves" aria-hidden="true">
      <svg viewBox="0 0 1440 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {waves.map((wave, i) => (
          <g key={i}>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from={wave.reversed ? `-${wave.period} 0` : "0 0"}
              to={wave.reversed ? "0 0" : `-${wave.period} 0`}
              dur={`${wave.duration}s`}
              repeatCount="indefinite"
            />
            <path
              d={generateWavePath(wave.cy, wave.period, wave.amplitude)}
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
  );
}

/* ----------------------------------------------------------------
   SPLIT TEXT — renders text as individual character spans for GSAP
   ---------------------------------------------------------------- */
function SplitHeading({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag className={`${className} split-heading`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}

/* ----------------------------------------------------------------
   DATA
   ---------------------------------------------------------------- */
const MARQUEE_WORDS = [
  "Big Data Analytics",
  "Cloud Computing",
  "Machine Learning",
  "Data Visualization",
  "Artificial Intelligence",
  "PySpark",
  "Deep Learning",
  "IoT",
  "Agentic AI",
  "Cybersecurity",
  "Edge Computing",
  "Quantum Computing",
];

const STATS = [
  { value: 2018, suffix: "", label: "Established", desc: "Pioneering BDA education at SRM IST Ramapuram since inception" },
  { value: 12, suffix: "+", label: "Faculty Members", desc: "Researchers and educators specializing in AI, Big Data, and Cloud" },
  { value: 9, suffix: "+", label: "Research Papers", desc: "Published in IEEE, IETE, and international journals in 2026 alone" },
  { value: 3, suffix: "", label: "Consultancy Projects", desc: "Industry collaborations with Altimate Systems, Thinkcove, and more" },
  { value: 100, suffix: "%", label: "Placement Support", desc: "Students placed at Deloitte, IIT Madras internships, and top firms" },
  { value: 25, suffix: "+", label: "Student Projects", desc: "Showcased at the AIECDI Centre of Excellence inauguration" },
];

const ACHIEVEMENTS = [
  {
    tag: "student",
    title: "AWS National Hackathon — Second Runner-Up",
    desc: "Team ZenMasters secured the Second Runner-Up position in AI for Bharat at the National Level AWS Hackathon, winning a cash prize and national recognition for their AI solution.",
    highlight: "Prize: ₹1,00,000",
    accent: "cobalt",
  },
  {
    tag: "student",
    title: "Origin Hackathon — Track Winners",
    desc: "Team Tech Comrades emerged as Track Winners at the Origin Hackathon by SIMATS Engineering College and secured a prestigious internship opportunity.",
    highlight: "Internship secured",
    accent: "amber",
  },
  {
    tag: "faculty",
    title: "NPTEL Discipline Star & Certifications",
    desc: "Faculty earned Topper, Gold, Silver, and Elite certifications across Deep Learning, Edge Computing, Distributed Systems, and Data Analytics with Python. Ms. J. Arthy recognized as NPTEL Discipline Star.",
    highlight: "Top performers recognized nationally",
    accent: "cobalt",
  },
  {
    tag: "student",
    title: "Deloitte — Dream Placement Offer",
    desc: "N. D. Jaya Sudha secured a Dream Offer from Deloitte during the 2026 placement season, marking a significant milestone for the department.",
    highlight: "CTC: ₹7.6 LPA",
    accent: "amber",
  },
  {
    tag: "student",
    title: "IIT Madras Research Internship",
    desc: "Keerthana Ranganathan secured a research internship at IIT Madras, reflecting outstanding dedication and academic excellence.",
    highlight: "Stipend: ₹15,000/month",
    accent: "cobalt",
  },
  {
    tag: "student",
    title: "IIT Bombay Campus Ambassador",
    desc: "Jwalitha was selected as Campus Ambassador for E-Cell, IIT Bombay — a testament to leadership, innovation, and commitment to excellence.",
    highlight: "National recognition",
    accent: "amber",
  },
];

const FACULTY = [
  { name: "Dr. A. Umamageswari", role: "Head of Department", article: "Harnessing Big Data Analytics for a Sustainable Future" },
  { name: "Dr. J. Sutha", role: "Professor, CSE-BDA&CC", article: "AI-Driven Cloud Computing: The New Digital Frontier" },
  { name: "Dr. D. Rajalakshmi", role: "Associate Professor", article: "The Next Decade of Big Data Analytics: Challenges and Opportunities" },
  { name: "Dr. M.S. Minu", role: "Assistant Professor", article: "Big Data Analytics: A World of Career Opportunities" },
  { name: "Ms. T. Archana", role: "Assistant Professor", article: "Agentic AI: The Next Revolution in Big Data and Data Science" },
  { name: "Dr. Saravanan C.", role: "Assistant Professor", article: "Agentic AI & LLMs: From Intelligent Conversations to Autonomous Actions" },
  { name: "Ms. J. Arthy", role: "Assistant Professor", article: "Big Data Analytics for Global Heatwave Prediction and Climate Intelligence" },
  { name: "Dr. S. Deepa", role: "Assistant Professor", article: "Embracing Innovation in Higher Education: Preparing Students for the Future" },
  { name: "Dr. P.C. Sarah Prithvika", role: "Assistant Professor", article: "Artificial Intelligence in Cloud Security: Transforming Cyber Defense" },
];

const STUDENTS = [
  {
    name: "Aswathi S",
    year: "II BDA C",
    quote:
      "AI gives instant, polished answers, making life easier but removing much of that journey. We should be careful not to lose the curiosity, critical thinking, and human connections that once shaped our learning.",
  },
  {
    name: "Dhananjay Bara",
    year: "II BDA C",
    quote:
      "Understanding your data first is far more important than picking a popular technology. It leads to better scalability, fewer bugs, and less technical debt.",
  },
  {
    name: "C H Naga Pujitha",
    year: "IV BDA B",
    quote:
      "AI agents are one of the fastest-growing trends. Unlike traditional chatbots, they can plan, make decisions, and complete tasks with minimal human input — making human oversight essential.",
  },
  {
    name: "P Devadharshini",
    year: "IV BDA A",
    quote:
      "PySpark performs in-memory computation, enabling faster data processing and real-time analytics. It offers built-in support for SQL, machine learning, streaming, and graph processing.",
  },
];

const ALUMNI = [
  {
    name: "P Mohan",
    initials: "PM",
    batch: "2022–2026",
    role: "Network Administrator at Daphne Infotech",
    about: "More than a place to study — SRM is where I built my career, lifelong friendships, and valuable life lessons.",
  },
  {
    name: "Vibhuvan B",
    initials: "VB",
    batch: "2022–2026",
    role: "Junior Research Fellow at SRM IST",
    about:
      "Graduated with a CGPA of 9.68. Published IEEE conference paper on internet traffic forecasting and developed an ML model for skin cancer prediction. Now researching AI-based ancient Tamil script conversion.",
  },
];

const TIMELINE = [
  {
    date: "April 22, 2026",
    title: "AI Excellence Centre for Data Innovation",
    desc: "AIECDI inaugurated with distinguished academic leaders and industry experts. Featured newsletters DATA NOVA and CLOUD MATRIX, showcase of 25+ student projects in Agentic AI and hardware.",
  },
  {
    date: "May 6, 2026",
    title: "MoU with Central Institute of Classical Tamil",
    desc: "Partnership with CICT, Chennai under the Ministry of Education to foster collaborative research, student internships, faculty exchange, and AI-based digital archive solutions.",
  },
  {
    date: "June 24, 2026",
    title: "Faculty Industrial Visit — Symbiotic Pvt. Ltd.",
    desc: "Faculty explored emerging technologies including AI, AR, VR, Animation, and HTML-based interactive solutions — bridging academic learning with real-world applications.",
  },
  {
    date: "July 22–24, 2026",
    title: "3-Day IoT and Robotics Workshop",
    desc: "Hands-on workshop for school students at the Tech Block Data Science Lab, reaching 9th to 11th graders with practical exposure to IoT and robotics.",
  },
];

const GALLERY_IMAGES = [
  { src: "/gallery/IMG_1.jpeg", alt: "Faculty team at Hackcelerate'26", label: "Hackcelerate'26", subtitle: "Faculty Team at the National Hackathon" },
  { src: "/gallery/IMG_4.jpeg", alt: "Keynote speaker at Hackcelerate podium", label: "Keynote Address", subtitle: "National Level 24-Hour Hackathon" },
  { src: "/gallery/IMG_3.jpeg", alt: "Award ceremony with winners on red carpet", label: "Award Ceremony", subtitle: "Winners Receiving Recognition" },
  { src: "/gallery/IMG_12.jpeg", alt: "Datathon'24 event highlights collage", label: "Datathon'24", subtitle: "Highlights from Previous Edition" },
  { src: "/gallery/IMG_5.jpeg", alt: "Panel of dignitaries at the event", label: "Distinguished Panel", subtitle: "Guest Speakers at Hackcelerate'26" },
  { src: "/gallery/IMG_7.jpeg", alt: "Students and faculty group photo", label: "Team Spirit", subtitle: "Students & Faculty at Hackcelerate" },
  { src: "/gallery/IMG_10.jpeg", alt: "Hackcelerate'26 prize winners collage", label: "Winners Gallery", subtitle: "Hackcelerate'26 Prize Winners" },
  { src: "/gallery/IMG_8.jpeg", alt: "Large department group photo", label: "Department Family", subtitle: "Annual Department Group Photo" },
  { src: "/gallery/IMG_13.jpeg", alt: "Datathon'24 winners with prize cheques", label: "Champions", subtitle: "Datathon'24 Prize Winners" },
  { src: "/gallery/IMG_6.jpeg", alt: "Memento presentation to guest", label: "Recognition", subtitle: "Memento Presentation Ceremony" },
  { src: "/gallery/IMG_9.jpeg", alt: "Faculty members in colorful attire", label: "Faculty Pride", subtitle: "Department Faculty Members" },
  { src: "/gallery/IMG_11.jpeg", alt: "Interactive workshop session with students", label: "Workshop Session", subtitle: "Interactive Learning in Progress" },
  { src: "/gallery/IMG_14.jpeg", alt: "Datathon'24 awards and countdown moments", label: "Countdown", subtitle: "24-Hour Hackathon Moments" },
  { src: "/gallery/IMG_15.jpeg", alt: "Inauguration ceremony with dignitaries on stage", label: "Inauguration", subtitle: "Event Inauguration Ceremony" },
  { src: "/gallery/IMG_2.jpeg", alt: "Students audience at event", label: "Full House", subtitle: "Packed Audience at the Event" },
];

const RESEARCH = [
  { type: "paper", faculty: "Dr. A. Umamageswari", title: "Design and Analysis of a Compact Boost Nine Level Switched Capacitor Inverter", journal: "Electrical Engineering" },
  { type: "paper", faculty: "Ms. J. Arthy", title: "Low Power Quality Improvement Using PI and PSO Controlled DSTATCOM", journal: "GMSARN International Journal" },
  { type: "paper", faculty: "Ms. T. Archana", title: "Dengue Fever Prediction Empowered by Radial Basis Function Networks", journal: "Journal of Computer Science" },
  { type: "paper", faculty: "Dr. M.S. Minu", title: "A Machine Learning Driven Framework for Accurate Brain Image Registration", journal: "Intl. Journal of Advanced CS & Applications" },
  { type: "paper", faculty: "Dr. G. Sumathi", title: "Deep Learning Synergy: CNNs and Transformers for Epidemic Outbreak Forecasting", journal: "Journal of Computer Science" },
  { type: "consult", faculty: "Dr. A. Umamageswari", title: "ERP Development and Website Creation for Altimate Systems", journal: "₹50,000" },
  { type: "consult", faculty: "Dr. J. Sutha", title: "Design and Development of Workflow Management System — Thinkcove Technologies", journal: "₹25,000" },
  { type: "consult", faculty: "Dr. S. Deepa", title: "ERP Development and Website Creation — Saravana Packs", journal: "₹45,000" },
];

/* ----------------------------------------------------------------
   COMPONENT
   ---------------------------------------------------------------- */
export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------- Particle network ---------- */
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(Math.floor((w * h) / 12000), 100);
    const maxDist = 140;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
      });
    }

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const particleColors = ["rgba(0,229,255,0.4)", "rgba(0,255,136,0.35)", "rgba(191,95,255,0.3)", "rgba(30,77,140,0.4)"];
      for (let pi = 0; pi < particles.length; pi++) {
        const p = particles[pi];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          p.x += (dx / d) * 1.5;
          p.y += (dy / d) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColors[pi % particleColors.length];
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineColors = ["0,229,255", "0,255,136", "191,95,255", "30,77,140"];
            ctx.strokeStyle = `rgba(${lineColors[(i + j) % lineColors.length]},${0.12 * (1 - d / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // mouse glow
      if (mouse.x > 0) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        g.addColorStop(0, "rgba(0,229,255,0.06)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ---------- GSAP scroll animations ---------- */
  useEffect(() => {
    const cleanup = initParticles();

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Generic reveals — set initial state then animate on scroll
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.set(el, { y: 50, opacity: 0 });
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
          });
        });

        // Reveal from left
        gsap.utils.toArray<HTMLElement>("[data-reveal-left]").forEach((el) => {
          gsap.set(el, { x: -60, opacity: 0 });
          gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          });
        });

        // Stagger children
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
          gsap.set(Array.from(container.children), { y: 40, opacity: 0 });
          gsap.to(Array.from(container.children), {
            scrollTrigger: { trigger: container, start: "top 82%" },
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
          });
        });

        // Horizontal scroll for stats
        const statsTrack = document.querySelector<HTMLElement>(".stats-track");
        const statsSection = document.querySelector<HTMLElement>(".stats-section");
        if (statsTrack && statsSection) {
          gsap.to(statsTrack, {
            x: () => -(statsTrack.scrollWidth - window.innerWidth + 80),
            ease: "none",
            scrollTrigger: {
              trigger: statsSection,
              start: "top top",
              end: () => "+=" + statsTrack.scrollWidth,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });
        }

        // Parallax text
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.5");
          gsap.to(el, {
            y: speed * 80,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // Faculty cards stagger
        gsap.set(".faculty-card", { y: 30, opacity: 0 });
        gsap.to(".faculty-card", {
          scrollTrigger: { trigger: ".faculty-grid", start: "top 80%" },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: { amount: 0.6, from: "start" },
          ease: "power2.out",
        });

        // Timeline items
        gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
          gsap.set(item, { x: -30, opacity: 0 });
          gsap.to(item, {
            scrollTrigger: { trigger: item, start: "top 85%" },
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.05,
            ease: "power2.out",
          });
          const dot = item.querySelector(".timeline-dot");
          if (dot) {
            gsap.set(dot, { scale: 0 });
            gsap.to(dot, {
              scrollTrigger: { trigger: item, start: "top 85%" },
              scale: 1,
              duration: 0.4,
              delay: 0.2 + i * 0.05,
              ease: "back.out(2)",
            });
          }
        });

        // Section eyebrow accent lines — animate width on scroll
        gsap.utils.toArray<HTMLElement>(".pf-eyebrow::before").forEach((el) => {
          // This targets pseudo elements — instead, animate the parent
        });
        gsap.utils.toArray<HTMLElement>(".pf-eyebrow").forEach((el) => {
          gsap.set(el, { x: -20, opacity: 0 });
          gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        // Achievement cards — scale up from slightly smaller
        gsap.utils.toArray<HTMLElement>(".achieve-card").forEach((card, i) => {
          gsap.set(card, { scale: 0.92, opacity: 0 });
          gsap.to(card, {
            scrollTrigger: { trigger: card, start: "top 88%" },
            scale: 1,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.06,
            ease: "power2.out",
          });
        });

        // Alumni cards slide from sides
        gsap.utils.toArray<HTMLElement>(".alumni-card").forEach((card, i) => {
          gsap.set(card, { x: i % 2 === 0 ? -40 : 40, opacity: 0 });
          gsap.to(card, {
            scrollTrigger: { trigger: card, start: "top 85%" },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        });

        // Research cards stagger
        gsap.utils.toArray<HTMLElement>(".research-card").forEach((card, i) => {
          gsap.set(card, { y: 30, opacity: 0 });
          gsap.to(card, {
            scrollTrigger: { trigger: card, start: "top 90%" },
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.04,
            ease: "power2.out",
          });
        });

        // Student cards stagger from bottom
        gsap.utils.toArray<HTMLElement>(".student-card").forEach((card, i) => {
          gsap.set(card, { y: 50, opacity: 0, rotateX: 4 });
          gsap.to(card, {
            scrollTrigger: { trigger: card, start: "top 88%" },
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
          });
        });

        // Contact section — special entrance
        const contactTitle = document.querySelector<HTMLElement>(".contact-title");
        if (contactTitle) {
          gsap.set(contactTitle, { y: 40, opacity: 0, scale: 0.95 });
          gsap.to(contactTitle, {
            scrollTrigger: { trigger: contactTitle, start: "top 85%" },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          });
        }

        // Split heading character reveals
        gsap.utils.toArray<HTMLElement>(".split-heading").forEach((heading) => {
          const chars = heading.querySelectorAll<HTMLElement>(".split-char");
          gsap.set(chars, { y: 60, opacity: 0, rotateX: -40 });
          gsap.to(chars, {
            scrollTrigger: { trigger: heading, start: "top 85%" },
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: "power3.out",
          });
        });

        // 3D tilt on hover for tilt-enabled cards
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: x * 12,
              rotateX: -y * 12,
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 800,
            });
          };
          const onLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.6,
              ease: "elastic.out(1,0.5)",
            });
          };
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
        });

        // Timeline line draw animation
        const timelineEl = document.querySelector<HTMLElement>(".timeline");
        if (timelineEl) {
          gsap.set(timelineEl, { "--line-progress": "0%" } as any);
          gsap.to(timelineEl, {
            "--line-progress": "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineEl,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          } as any);
        }

        // Magnetic buttons
        const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
        magnetics.forEach((btn) => {
          const onMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3 });
          };
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
          };
          btn.addEventListener("mousemove", onMove);
          btn.addEventListener("mouseleave", onLeave);
        });

        // Floating gradient orbs — animate parallax
        gsap.utils.toArray<HTMLElement>(".section-orb").forEach((orb) => {
          gsap.to(orb, {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: orb.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    });

    // Counter animation (works regardless of motion pref)
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.counter || "0", 10);
          const dur = 2200;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = Math.floor(eased * target).toString();
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => counterObserver.observe(c));

    return () => {
      cleanup?.();
      mm.revert();
      counterObserver.disconnect();
    };
  }, [initParticles]);

  /* ---------- RENDER ---------- */
  return (
    <div ref={containerRef}>
      {/* ==================== HERO ==================== */}
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-gradient" />

        <div className="hero-content">
          <p className="hero-line hero-institution pf-label">
            SRM Institute of Science and Technology — Ramapuram
          </p>
          <h1 className="hero-line hero-title pf-display" data-speed="-0.15">
            Computer Science &amp; Engineering
          </h1>
          <p className="hero-line hero-spec">
            Big Data Analytics &amp; Cloud Computing
          </p>
          <p className="hero-line hero-tagline pf-serif-italic hero-typewriter">
            Where data meets decision — research, build, deploy.
          </p>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>

        <div className="hero-aurora">
          <AuroraBars
            barCount={32}
            colors={["#00ff88", "#00e5ff", "#bf5fff", "#1e4d8c", "#12151f00"]}
            maxHeightRatio={0.92}
            minHeightRatio={0.15}
            speed={1.3}
            gap={2}
            blur={3}
            background="transparent"
          />
        </div>
      </section>

      {/* ==================== MARQUEE ==================== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span className="marquee-item" key={i}>
              {w}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ==================== ABOUT ==================== */}
      <section className="pf-section pf-section--light">
        <SectionWaves preset="light" />
        <div className="section-orb section-orb--cobalt" />
        <div className="pf-container about-grid">
          <div className="about-text" data-reveal-left>
            <div className="pf-eyebrow pf-label">About the Department</div>
            <SplitHeading text="Shaping data-driven minds since 2018" className="pf-heading" />
            <p className="pf-body">
              The Department of Computer Science and Engineering with
              specialization in Big Data Analytics was established at SRM
              Institute of Science and Technology, Ramapuram with the objective
              of delivering quality education and nurturing students to excel
              in the data-driven world.
            </p>
            <p className="pf-body">
              Students learn principles, tools, and techniques to model
              real-world problems, analyze them, and discover useful
              information — proposing solutions that support decision-making
              through data visualization. The program equips graduates with
              programming, statistical skills, mathematical reasoning, machine
              learning, knowledge discovery, and visualization expertise.
            </p>
          </div>

          <div className="about-visual" data-reveal>
            <div className="about-disciplines" aria-label="Core disciplines">
              <span className="about-disc-tag">Machine Learning</span>
              <span className="about-disc-tag">Cloud Architecture</span>
              <span className="about-disc-tag">Data Visualization</span>
              <span className="about-disc-tag">Artificial Intelligence</span>
              <span className="about-disc-tag">Edge Computing</span>
              <span className="about-disc-tag">Deep Learning</span>
              <span className="about-disc-tag">Cybersecurity</span>
              <span className="about-disc-tag">IoT Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VISION / MISSION ==================== */}
      <section className="pf-section pf-section--dark">
        <SectionWaves preset="cool" />
        <div className="pf-container">
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label">Charter</div>
            <h2 className="pf-heading">Vision &amp; Mission</h2>
          </div>

          <div className="vm-grid" data-stagger>
            <div className="vm-card">
              <h3 className="pf-heading">Vision</h3>
              <p className="pf-body">
                To become a world-class department in imparting high-quality
                knowledge and providing students a unique learning and research
                experience in Computer Science and Engineering.
              </p>
            </div>
            <div className="vm-card vm-card--mission">
              <h3 className="pf-heading">Mission</h3>
              <ul>
                <li>
                  Impart knowledge in cutting-edge CSE technologies on par with
                  industrial standards
                </li>
                <li>
                  Collaborate with renowned institutions to uplift innovative
                  research and development
                </li>
                <li>
                  Demonstrate strong communication skills and the ability to
                  design computing systems in multidisciplinary teams
                </li>
                <li>
                  Instill societal, safety, cultural, environmental, and ethical
                  responsibilities in all professional activities
                </li>
                <li>
                  Produce successful graduates with commitment to lifelong
                  learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS (horizontal scroll) ==================== */}
      <section className="stats-section pf-section--dark">
        <div className="stats-track">
          {/* intro card */}
          <div className="stat-card" style={{ paddingRight: "4rem" }}>
            <div className="pf-eyebrow pf-label pf-eyebrow--amber">
              Department at a Glance
            </div>
            <h2
              className="pf-display"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem" }}
            >
              By the Numbers
            </h2>
            <p
              className="pf-body"
              style={{ color: "var(--p-text-muted-dark)", maxWidth: 360 }}
            >
              Key milestones and figures that define our department&apos;s
              growth, research output, and commitment to excellence.
            </p>
          </div>

          {STATS.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-number">
                <span data-counter={s.value}>0</span>
                {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
              </div>
              <div className="stat-label">{s.label}</div>
              <p className="stat-desc pf-body">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ACHIEVEMENTS ==================== */}
      <section className="pf-section pf-section--light">
        <div className="section-orb section-orb--amber" />
        <div className="pf-container">
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label">Track Record</div>
            <SplitHeading text="Achievements & Milestones" className="pf-heading" />
            <p className="pf-body">
              Recognition earned by our faculty and students through hackathons,
              certifications, and career placements.
            </p>
          </div>

          <div className="achieve-grid" data-stagger>
            {ACHIEVEMENTS.map((a, i) => (
              <div className="achieve-card" key={i} data-tilt>
                <div
                  className={`achieve-card-accent achieve-card-accent--${a.accent}`}
                />
                <span
                  className={`achieve-tag achieve-tag--${a.tag}`}
                >
                  {a.tag}
                </span>
                <h3>{a.title}</h3>
                <p className="pf-body">{a.desc}</p>
                <span className="achieve-highlight">{a.highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EVENT GALLERY ==================== */}
      <div className="gallery-wheel-wrapper">
        <OrbitalImageWheel
          images={GALLERY_IMAGES}
          turns={3}
          blur={3}
          dim={35}
          brightnessBoost={25}
          focusSpread={0.4}
          scaleEffect={0.05}
          scrollSensitivity={0.45}
          itemWidth={240}
          itemHeight={320}
          cropRatio={0.7}
          scrollLength={500}
          captionOffset={10}
          showCaption={true}
          subtitleDirection="top"
          subtitleSpeed={1.2}
          className="gallery-wheel"
        />
      </div>

      {/* ==================== FACULTY ==================== */}
      <section className="pf-section pf-section--dark" style={{ padding: "5rem 0" }}>
        <div className="pf-container" style={{ padding: "0 2rem", marginBottom: "2rem" }}>
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label">Faculty Voice</div>
            <SplitHeading text="Faculty Spotlight" className="pf-heading" />
            <p>
              Our faculty contribute original research and thought leadership
              across AI, Big Data, and Cloud Computing.
            </p>
          </div>
        </div>

        <div className="pf-container--wide">
          <div className="faculty-grid">
            {FACULTY.map((f, i) => (
              <div className="faculty-card" key={i}>
                <h3>{f.name}</h3>
                <div className="faculty-role">{f.role}</div>
                <div className="faculty-article pf-serif-italic">
                  {f.article}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STUDENT VOICES ==================== */}
      <section className="pf-section pf-section--warm">
        <SectionWaves preset="light" />
        <div className="pf-container">
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label pf-eyebrow--amber">
              From the Lab
            </div>
            <h2 className="pf-heading">Student Perspectives</h2>
            <p className="pf-body">
              Perspectives on technology, learning, and the future — straight
              from the department.
            </p>
          </div>

          <div className="student-grid" data-stagger>
            {STUDENTS.map((s, i) => (
              <div className="student-card" key={i}>
                <blockquote className="pf-body">{s.quote}</blockquote>
                <cite>
                  {s.name}
                  <span>{s.year}</span>
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ALUMNI ==================== */}
      <section className="pf-section pf-section--mid">
        <SectionWaves preset="warm" />
        <div className="pf-container">
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label">After Graduation</div>
            <h2 className="pf-heading">Alumni Network</h2>
          </div>

          <div className="alumni-grid" data-stagger>
            {ALUMNI.map((a, i) => (
              <div className="alumni-card" key={i}>
                <div className="alumni-avatar">{a.initials}</div>
                <div className="alumni-info">
                  <h3>{a.name}</h3>
                  <div className="alumni-batch">{a.batch}</div>
                  <div className="alumni-role">{a.role}</div>
                  <p className="alumni-about pf-body">{a.about}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRY ==================== */}
      <section className="pf-section pf-section--light">
        <SectionWaves preset="light" />
        <div className="pf-container">
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label">Industry Connect</div>
            <h2 className="pf-heading">
              Industry Interaction &amp; Milestones
            </h2>
            <p className="pf-body">
              Building bridges between academia and industry through visits,
              partnerships, and centres of excellence.
            </p>
          </div>

          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
                <div className="timeline-date">{t.date}</div>
                <h3>{t.title}</h3>
                <p className="pf-body">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RESEARCH ==================== */}
      <section className="pf-section pf-section--dark" style={{ padding: "5rem 0" }}>
        <SectionWaves preset="warm" />
        <div className="pf-container" style={{ padding: "0 2rem", marginBottom: "2rem" }}>
          <div className="section-header" data-reveal>
            <div className="pf-eyebrow pf-label pf-eyebrow--amber">
              Research Corner
            </div>
            <SplitHeading text="Research & Innovation" className="pf-heading" />
            <p>
              Faculty publications and consultancy projects driving real-world
              impact.
            </p>
          </div>
        </div>

        <div className="pf-container--wide">
          <div className="research-grid" data-stagger>
            {RESEARCH.map((r, i) => (
              <div className="research-card" key={i}>
                <span
                  className={`research-type ${r.type === "consult" ? "research-type--consult" : ""}`}
                >
                  {r.type === "paper" ? "Publication" : "Consultancy"}
                </span>
                <h4>{r.title}</h4>
                <p className="research-meta">
                  <strong>{r.faculty}</strong>
                  <br />
                  {r.type === "paper" ? r.journal : `Amount: ${r.journal}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section className="pf-section pf-section--dark">
        <SectionWaves preset="subtle" />
        <div className="pf-container">
          <div className="contact-grid">
            <div data-reveal>
              <div className="pf-eyebrow pf-label">Get in Touch</div>
              <h2 className="pf-display contact-title">
                SRM Institute of Science &amp; Technology
              </h2>
              <p
                className="pf-body"
                style={{ color: "var(--p-text-muted-dark)", marginBottom: "2rem", maxWidth: 440 }}
              >
                Ramapuram Campus — Department of CSE with specialization in Big
                Data Analytics &amp; Cloud Computing
              </p>
            </div>

            <div className="contact-links" data-stagger>
              <a
                href="tel:18001021525"
                className="contact-link"
              >
                <span className="contact-link-icon">&#9742;</span>
                1800 102 1525 (Toll Free)
              </a>
              <a
                href="mailto:helpdesk@srmrmp.edu.in"
                className="contact-link"
              >
                <span className="contact-link-icon">&#9993;</span>
                helpdesk@srmrmp.edu.in
              </a>
              <a
                href="https://www.srmrmp.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">&#9672;</span>
                www.srmrmp.edu.in
              </a>
              <div className="contact-link">
                <span className="contact-link-icon">&#9906;</span>
                Bharathi Salai, Ramapuram, Chennai — 600 089
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER BAR ==================== */}
      <footer className="footer-bar" style={{ background: "var(--p-navy)" }}>
        <span>
          Department of CSE — Big Data Analytics &amp; Cloud Computing
        </span>
        <span>SRM IST Ramapuram &middot; 2026</span>
      </footer>
    </div>
  );
}
