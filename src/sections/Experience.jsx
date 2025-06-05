// src/sections/Experience.jsx
import {motion} from "framer-motion";
import {
    Briefcase,
    Code2,
    GraduationCap,
    School,
} from "lucide-react";

/* ─── TIMELINE DATA ───────────────────────────────────── */
const timeline = [
    {
        role: "Lead Developer • Optical Simulator v6",
        org: "NSF POSE Submission",
        period: "2024 – Present",
        icon: Code2,
        bullets: [
            "Managing 5-person team; targeting $300 k POSE grant.",
            "Modular rewrite with Podman HPC CI (summer ’25 release).",
        ],
    },
    {
        role: "AI Researcher",
        org: "UMass Lowell",
        period: "2022 – Present",
        icon: Briefcase,
        bullets: [
            "Integrated RL into optical simulator → 25 % fewer blocked requests.",
            "Journal paper on deep-RL routing (submit Jun ’25).",
        ],
    },
    {
        role: "Ph.D. Scholar (full fellowship)",
        org: "UMass Lowell",
        period: "2024 – Present",
        icon: GraduationCap,
        bullets: [
            "Full academic scholarship (combined M.S./Ph.D.).",
            "Focus: disaster-aware deep RL for elastic optical networks.",
        ],
    },
    {
        role: "M.S. ECE (Thesis Defended)",
        org: "UMass Lowell",
        period: "2022 – 2023",
        icon: GraduationCap,
        bullets: [
            "Thesis: PPO-based disaster routing → 35 % resilience boost.",
            "Graduated with High Distinction.",
        ],
    },
    {
        role: "Firmware Validation Intern",
        org: "Zebra Technologies",
        period: "2022",
        icon: Briefcase,
        bullets: [
            "Built 15 + Jenkins suites — 150 + build failures prevented.",
            "Python Wi-Fi 6 parser slashed cert cycle time.",
        ],
    },
    {
        role: "B.S. ECE (magna cum laude)",
        org: "UMass Lowell",
        period: "2018 – 2022",
        icon: School,
        bullets: [
            "John & Abigail Adams Scholarship — full tuition.",
            "Capstone: SDN-driven metro-core optical topology.",
        ],
    },
];

/* ─── ANIMATION VARIANT ───────────────────────────────── */
const variant = {
    hidden: {opacity: 0, y: 40},
    show: {opacity: 1, y: 0, transition: {ease: "easeOut", duration: 0.4}},
};

/* ─── COMPONENT ───────────────────────────────────────── */
export default function Experience() {
    return (
        <section
            id="experience & education"
            className="bg-white py-24 dark:bg-slate-700"
        >
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-12 text-4xl font-extrabold tracking-tight
                       text-gray-900 dark:text-gray-50">
                    Experience & Education
                </h2>

                <ol className="relative border-l border-gray-300 dark:border-slate-600">
                    {timeline.map(({role, org, period, bullets, icon: Icon}, i) => (
                        <motion.li
                            key={i}
                            variants={variant}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, amount: 0.3}}
                            className="mb-12 ml-6"
                        >
                            {/* dot + icon */}
                            <span
                                className="absolute -left-2.5 flex h-6 w-6 items-center justify-center
                           rounded-full bg-blue-600 ring-2 ring-white dark:ring-white"
                            >
                <Icon size={12} className="text-white"/>
              </span>

                            {/* header */}
                            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {role}
                                </h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                  @{org}
                </span>
                            </div>

                            <time className="mb-3 block text-xs font-semibold uppercase tracking-wide
                               text-gray-600 dark:text-gray-400">
                                {period}
                            </time>

                            {/* bullets */}
                            <ul className="list-disc pl-5 text-base font-medium
                             text-gray-800 dark:text-gray-200">
                                {bullets.map((b, j) => (
                                    <li key={j} className="mb-1">{b}</li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
