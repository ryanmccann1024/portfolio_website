// src/sections/Skills.jsx
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {
    LanguagesIcon,
    CodeIcon,
    ServerCogIcon,
    Star,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */
const skillCategories = [
    /* 1 ─ Languages */
    {
        name: "Languages",
        icon: <LanguagesIcon className="mr-2 h-5 w-5"/>,
        items: [
            {
                skill: "Python",
                evidence: [
                    "Lead dev of PPO-based optical-network simulator ↓35 % blocking.",
                    "Instructor — Intro to Python + GPT summer course.",
                    "M.S. thesis defended with Python-heavy RL research.",
                ],
            },
            {
                skill: "TypeScript / JavaScript",
                evidence: [
                    "React + D3 dashboards for live RL metrics.",
                    "Refactored UMass Lowell network-design labs into TS stack.",
                ],
            },
            {
                skill: "Spanish (C1)",
                evidence: [
                    "Self-taught, business-ready without formal classes.",
                    "Collaborated with Colombian research partners entirely in Spanish.",
                ],
            },
            {
                skill: "French (B1)",
                evidence: ["Travel-ready conversational skills, self-study only."],
            },
        ],
    },

    /* 2 ─ Frameworks & AI */
    {
        name: "Frameworks & AI",
        icon: <CodeIcon className="mr-2 h-5 w-5"/>,
        items: [
            {
                skill: "React + Tailwind",
                evidence: [
                    "Built & deployed this portfolio in < 1 day using GPT co-pilot.",
                    "Mentor for new contributors on open-source simulator UI.",
                ],
            },
            {
                skill: "PyTorch / TensorFlow",
                evidence: [
                    "Berkeley Deep RL course (Summer ’25).",
                    "Implemented PPO & SAC for journal paper (sub. Jun ’25).",
                ],
            },
            {
                skill: "FastAPI",
                evidence: ["Designed plug-in REST API for simulator micro-services."],
            },
        ],
    },

    /* 3 ─ DevOps & HPC */
    {
        name: "DevOps & HPC",
        icon: <ServerCogIcon className="mr-2 h-5 w-5"/>,
        items: [
            {
                skill: "Docker & Podman",
                evidence: [
                    "Collaborating with Podman team on HPC features (Summer ’25).",
                    "Containerised CI pipeline — 40 % faster test turnaround.",
                ],
            },
            {
                skill: "Git / GitHub Actions",
                evidence: [
                    "CI/CD lead for simulator v6 (NSF POSE $300 k submission).",
                    "Manage 5-person team with code standards & review flow.",
                ],
            },
            {
                skill: "SLURM",
                evidence: [
                    "Optimised GPU queue jobs for Optuna sweeps.",
                    "Integrated Podman containers into SLURM workflow.",
                ],
            },
        ],
    },

    /* 4 ─ Achievements */
    {
        name: "Achievements",
        icon: <Star className="mr-2 h-5 w-5"/>,
        items: [
            {
                skill: "Scholarships & Awards",
                evidence: [
                    "Full fellowship for combined M.S. + Ph.D. at UMass Lowell.",
                    "John & Abigail Adams Scholarship — full tuition B.S. (Math & English advanced).",
                ],
            },
            {
                skill: "Leadership & Outreach",
                evidence: [
                    "Lead dev releasing Open-Source Optical Simulator v6.",
                    "Co-restructuring UMass Lowell network-design course (Fall ’25).",
                ],
            },
            {
                skill: "Rapid Prototyping",
                evidence: [
                    "Portfolio site built & deployed in < 24 hours.",
                    "Podman HPC feature set rollout with Red-Hat team.",
                ],
            },
        ],
    },
];

/* ─────────────────── COMPONENT ───────────────────────── */
export default function Skills() {
    const [open, setOpen] = useState({});

    const toggle = (skill) =>
        setOpen((prev) => ({...prev, [skill]: !prev[skill]}));

    return (
        <section id="skills" className="bg-white py-16 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-10 text-4xl font-extrabold tracking-tight dark:text-gray-50">
                    Skills &amp; Credibility
                </h2>

                {skillCategories.map(({name, icon, items}) => (
                    <div key={name} className="mb-10">
                        <h3
                            className="mb-4 flex items-center text-2xl font-bold
                         text-gray-900 dark:text-gray-50"
                        >
                            {icon}
                            {name}
                        </h3>

                        <div className="space-y-4">
                            {items.map(({skill, evidence}) => {
                                const isOpen = open[skill];
                                return (
                                    <div
                                        key={skill}
                                        className="group rounded-lg border border-gray-300
                               bg-blue-50/40 transition hover:bg-blue-100/60
                               dark:border-gray-600 dark:bg-slate-800/40
                               dark:hover:bg-slate-700"
                                    >
                                        {/* header row */}
                                        <button
                                            onClick={() => toggle(skill)}
                                            className="flex w-full items-center justify-between
                                 px-4 py-3 text-lg font-semibold
                                 text-blue-800 dark:text-blue-300"
                                        >
                                            {skill}
                                            {isOpen ? (
                                                <ChevronUp className="h-4 w-4"/>
                                            ) : (
                                                <ChevronDown className="h-4 w-4"/>
                                            )}
                                        </button>

                                        {/* animated evidence list */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: "auto", opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.15, ease: "easeOut"}}
                                                    className="overflow-hidden px-4 pb-4"
                                                >
                                                    <ul
                                                        className="list-disc pl-5 text-[1.05rem] font-semibold
                                       text-gray-700 dark:text-gray-200"
                                                    >
                                                        {evidence.map((e, idx) => (
                                                            <li key={idx} className="mb-1">
                                                                {e}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
