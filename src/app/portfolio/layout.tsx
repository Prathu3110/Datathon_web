import { Fraunces, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./portfolio.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["700", "800"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CSE — Big Data Analytics & Cloud Computing | SRM IST Ramapuram",
  description:
    "Department of Computer Science & Engineering with specialization in Big Data Analytics & Cloud Computing at SRM Institute of Science and Technology, Ramapuram.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fraunces.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} portfolio-root`}>
      {children}
    </div>
  );
}
