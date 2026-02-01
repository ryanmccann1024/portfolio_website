// Projects section with modal details and enhanced animations
// Ryan McCann – Portfolio Revamp

import { GithubIcon, ExternalLinkIcon, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import fusionImg from "../assets/projects/fusion.png";
import podmanImg from "../assets/projects/podman.png";
import reactImg from "../assets/projects/react.png";
import Spinner from "../components/Spinner";
import DepthCard from "../components/DepthCard";
import { staggerContainer, staggerItem, customEasing } from "../constants/animations";

/* ── Flicker-Free Image Wrapper ───────────────────────────── */
function CardImage({ src, alt, className = "" }) {
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (loaded) {
            const timeout = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timeout);
        }
    }, [loaded]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="eager"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`h-full w-full object-cover transition duration-500 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ willChange: "opacity, transform", backfaceVisibility: "hidden" }}
            />
            {!visible && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                    <Spinner small />
                </div>
            )}
        </div>
    );
}

/* ── PROJECT DATA ───────────────────────────────────────── */
const projects = [
    {
        title: "FUSION – Optical-Network RL Simulator",
        shortTitle: "FUSION",
        img: fusionImg,
        tech: ["Python", "Reinforcement Learning", "PyTorch", "Gymnasium", "Optical Networks", "Slurm"],
        blurb: "Open-source optical-network simulator that accelerates RL research. 10+ ★ on GitHub, under NSF POSE review for $300k grant.",
        fullDescription: "Authored FUSION, an open-source optical-network simulator that accelerates RL research. Now 10+ ★ on GitHub, 5 forks, under NSF POSE review for a $300k grant (decision by 2026). Features crosstalk-aware grooming and SDN/EON APIs.",
        highlights: [
            "10+ stars on GitHub, 5 forks",
            "Under NSF POSE review for $300k grant",
            "Used by researchers at 4+ institutions (AT&T, Red Hat, MIT)",
            "2,000+ automated tests in CI/CD pipeline",
            "Published in peer-reviewed IEEE paper",
            "Features crosstalk-aware grooming and SDN/EON APIs",
        ],
        repo: "https://github.com/SDNNetSim/FUSION",
        demo: null,
        status: "launched",
        color: "blue",
    },
    {
        title: "Podman HPC Extensions (upcoming)",
        shortTitle: "Podman HPC",
        img: podmanImg,
        tech: ["Go", "Podman", "HPC", "GPU", "SquashFS", "CI/CD"],
        blurb: "Collaborating with Red Hat's Podman team to prototype GPU-aware scheduling and SquashFS image support.",
        fullDescription: "Collaborating with Red Hat's Podman team to prototype GPU-aware scheduling and SquashFS image support for multi-TB scientific workloads. First design doc submitted; initial PR targeting fuse-overlayfs masking.",
        highlights: [
            "GPU-aware scheduling for HPC workloads",
            "SquashFS image support for multi-TB scientific data",
            "Collaborating directly with Red Hat engineers",
            "Cross-platform integration tests (Fedora, Windows, macOS)",
            "Targeting production container runtime improvements",
        ],
        repo: "https://github.com/NERSC/podman-hpc",
        demo: null,
        status: "in-progress",
        color: "orange",
    },
    {
        title: "AI Resume Builder",
        shortTitle: "AI Resume Builder",
        img: reactImg,
        tech: ["React", "OpenAI API", "Firebase", "Stripe", "Vercel"],
        blurb: "Production GenAI app for role-specific resumes and cover letters via guided prompt flows.",
        fullDescription: "Built and shipped a production GenAI application using the OpenAI API to generate structured, role-specific resumes and cover letters via guided prompt flows. Implemented end-to-end production infrastructure with robust handling of API failures and latency.",
        highlights: [
            "Production GenAI app using OpenAI API",
            "Firebase auth and data storage",
            "Stripe billing (checkout and webhooks)",
            "Deployed on Vercel",
            "Robust handling of API failures and latency",
            "Guided prompt flows for structured output",
        ],
        repo: "https://github.com/ryanmccann1024/portfolio_website",
        demo: null,
        status: "launched",
        color: "purple",
    },
];

/* ── PROJECT MODAL CONTENT ─────────────────────────────── */
function ProjectModal({ project }) {
    const statusBgColors = {
        launched: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        "in-progress": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };

    return (
        <div className="p-0">
            {/* Hero image */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <CardImage src={project.img} alt={project.title} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />

                {/* Status badge */}
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${statusBgColors[project.status]}`}>
                    {project.status.replace("-", " ")}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 -mt-8 relative">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-display mb-3">
                    {project.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.fullDescription}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Highlights
                    </h3>
                    <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech stack */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    {project.repo && (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                            <GithubIcon size={18} />
                            View on GitHub
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors"
                        >
                            <ExternalLinkIcon size={18} />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── PROJECT CARD PREVIEW ─────────────────────────────── */
function ProjectCardContent({ project }) {
    const statusColors = {
        launched: "bg-emerald-500",
        "in-progress": "bg-amber-500",
    };

    return (
        <div className="h-full flex flex-col">
            {/* Image */}
            <div className="relative h-40 overflow-hidden rounded-t-2xl -mx-[1px] -mt-[1px]">
                <CardImage src={project.img} alt={project.title} className="h-full w-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Status badge */}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide text-white shadow-lg ${statusColors[project.status]}`}>
                    {project.status.replace("-", " ")}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-2">
                    {project.shortTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {project.blurb}
                </p>

                {/* Tech preview */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-gray-500 dark:text-gray-400">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── PROJECTS COMPONENT ─────────────────────────────────── */
export default function Projects() {
    const colorMap = {
        blue: "blue",
        orange: "orange",
        purple: "purple",
    };

    return (
        <section id="projects" className="bg-gray-50 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-6xl px-4">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: customEasing }}
                    className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 font-display"
                >
                    Highlight Projects
                </motion.h2>

                {/* Staggered project grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <motion.div key={project.title} variants={staggerItem}>
                            <DepthCard
                                glowColor={colorMap[project.color]}
                                className="h-full"
                                expandedContent={<ProjectModal project={project} />}
                            >
                                <ProjectCardContent project={project} />
                            </DepthCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
