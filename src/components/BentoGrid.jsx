// src/components/BentoGrid.jsx
// Main bento grid container with all card content

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Mountain, BookOpen, Leaf, GithubIcon, ArrowRight } from "lucide-react";
import BentoCard from "./BentoCard";
import { TerminalPrompt, TerminalOutput, TerminalMenu, TerminalTyping } from "./TerminalText";
import SkillBars from "./SkillBars";
import TimelineHorizontal from "./TimelineHorizontal";
import ParticleBackground from "./Particles";

// Project data (extracted from original Projects section)
const projects = [
    {
        title: "FUSION",
        description: "Open-source optical-network RL simulator",
        tech: "Python, PyTorch, RL",
        status: "launched",
        url: "https://github.com/SDNNetSim/FUSION",
    },
    {
        title: "Podman HPC",
        description: "GPU-aware scheduling extensions",
        tech: "Go, HPC, Containers",
        status: "in-progress",
        url: "https://github.com/NERSC/podman-hpc",
    },
    {
        title: "Portfolio",
        description: "This site - React + Notion CMS",
        tech: "React, Tailwind, Motion",
        status: "launched",
        url: "https://github.com/ryanmccann1024/portfolio_website",
    },
];

// Contact links (no calendar)
const contactLinks = [
    {
        label: "Email",
        href: "mailto:ryanjohnmccann@gmail.com?subject=Project%20Inquiry&body=Hi%20Ryan,",
        external: false,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ryanjmccann/",
        external: true,
    },
    {
        label: "GitHub",
        href: "https://github.com/ryanmccann1024",
        external: true,
    },
];

// Beyond code interests
const interests = [
    { icon: Mountain, label: "Colombia", detail: "Hiking" },
    { icon: BookOpen, label: "Teaching", detail: "3rd Grade Math" },
    { icon: Leaf, label: "Sustainability", detail: "Student Org Founder" },
];

// Spanish typing phrases
const spanishPhrases = [
    "Hablo espanol con fluidez",
    "Presentaciones en IEEE LatAm",
];

// Typewriter for Hero taglines
function HeroTypewriter({ words }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentIndex];
        const timeout = isDeleting ? 50 : 80;

        if (!isDeleting && displayText === currentWord) {
            const pauseTimeout = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(pauseTimeout);
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timer = setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentWord.slice(0, prev.length + 1)
            );
        }, timeout);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentIndex, words]);

    return (
        <span className="inline-flex items-center">
            <span className="text-blue-600 dark:text-blue-400">{displayText}</span>
            <span className="ml-1 animate-blink text-blue-600 dark:text-blue-400">|</span>
        </span>
    );
}

// Spanish language typing effect
function SpanishTypewriter() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = spanishPhrases[currentIndex];
        const timeout = isDeleting ? 40 : 60;

        if (!isDeleting && displayText === currentPhrase) {
            const pauseTimeout = setTimeout(() => setIsDeleting(true), 3000);
            return () => clearTimeout(pauseTimeout);
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % spanishPhrases.length);
            return;
        }

        const timer = setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentPhrase.slice(0, prev.length + 1)
            );
        }, timeout);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentIndex]);

    return (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
            "{displayText}"
            <span className="terminal-cursor inline-block w-1.5 h-3 bg-terminal-green ml-0.5 align-middle" />
        </span>
    );
}

export default function BentoGrid() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="bento-grid">
                {/* Hero Card (2x2) */}
                <BentoCard
                    size="2x2"
                    index={0}
                    className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-900"
                >
                    {/* Particles contained within card */}
                    <div className="absolute inset-0 overflow-hidden">
                        <ParticleBackground />
                    </div>

                    <div className="relative z-10">
                        {/* Terminal prompt */}
                        <div className="font-mono text-sm mb-4">
                            <span className="text-terminal-green">$ </span>
                            <span className="text-gray-600 dark:text-gray-400">whoami</span>
                        </div>

                        {/* Name and avatar */}
                        <div className="flex items-center gap-4 mb-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white shadow-lg"
                            >
                                RM
                            </motion.div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-display">
                                    Ryan McCann
                                </h1>
                                <p className="text-lg font-medium">
                                    <HeroTypewriter words={["ML Engineer", "RL Researcher", "Open-Source Builder"]} />
                                </p>
                            </div>
                        </div>

                        {/* Tagline */}
                        <p className="text-base text-gray-700 dark:text-gray-300 max-w-md">
                            Ph.D. ML engineer turning research prototypes into production-grade, low-latency systems.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href="#projects-card"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-blue-700 hover:shadow-lg"
                            >
                                See My Work
                            </a>
                            <a
                                href="/pdfs/Ryan_McCann_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-600 shadow transition-all hover:bg-blue-50 hover:shadow-lg dark:bg-transparent dark:hover:bg-blue-900/20"
                            >
                                Download CV
                            </a>
                        </div>
                    </div>
                </BentoCard>

                {/* Projects Card (1x2) */}
                <BentoCard
                    size="1x2"
                    index={1}
                    className="flex flex-col"
                    id="projects-card"
                >
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-4">
                        Projects
                    </h2>

                    <div className="flex-1 space-y-3">
                        {projects.map((project) => (
                            <a
                                key={project.title}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 rounded-lg border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {project.title}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            project.status === "launched"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                    {project.description}
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                    {project.tech}
                                </p>
                            </a>
                        ))}
                    </div>

                    <a
                        href="https://github.com/ryanmccann1024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-4"
                    >
                        View All <ArrowRight size={14} />
                    </a>
                </BentoCard>

                {/* Skills Card (1x1) */}
                <BentoCard size="1x1" index={2}>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-3">
                        Skills
                    </h2>
                    <SkillBars />
                </BentoCard>

                {/* Experience Card (1x1) */}
                <BentoCard size="1x1" index={3}>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-3">
                        Experience
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                AI Researcher
                            </h3>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                @UMass Lowell
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                2022 - Present
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                                + 2 Internships
                            </span>
                        </div>

                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li className="flex items-start gap-1.5">
                                <span className="text-blue-500 mt-1">-</span>
                                25% efficiency boost via RL
                            </li>
                            <li className="flex items-start gap-1.5">
                                <span className="text-blue-500 mt-1">-</span>
                                3 IEEE publications
                            </li>
                        </ul>
                    </div>
                </BentoCard>

                {/* Education Card (2x1) */}
                <BentoCard size="2x1" index={4}>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-4">
                        Education
                    </h2>
                    <TimelineHorizontal />
                </BentoCard>

                {/* Beyond Code Card (2x1) - No terminal aesthetic */}
                <BentoCard
                    size="2x1"
                    index={5}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-800"
                >
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-4">
                        Beyond Code
                    </h2>

                    <div className="grid grid-cols-3 gap-4">
                        {interests.map(({ icon: Icon, label, detail }) => (
                            <div key={label} className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center mb-2">
                                    <Icon className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                                </div>
                                <p className="font-medium text-sm text-gray-900 dark:text-white">
                                    {label}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Languages Card (1x1) */}
                <BentoCard size="1x1" index={6}>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-3">
                        Languages
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                English
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                Native
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Spanish
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                                C1
                            </span>
                        </div>

                        <div className="pt-2">
                            <SpanishTypewriter />
                        </div>
                    </div>
                </BentoCard>

                {/* Contact Card (1x1) */}
                <BentoCard size="1x1" index={7}>
                    <div className="font-mono text-sm mb-3">
                        <span className="text-terminal-green">$ </span>
                        <span className="text-gray-600 dark:text-gray-400">connect</span>
                    </div>

                    <TerminalMenu items={contactLinks} />

                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                        Reply within 1 business day
                    </p>
                </BentoCard>
            </div>
        </div>
    );
}
