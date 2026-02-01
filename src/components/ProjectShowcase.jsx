// src/components/ProjectShowcase.jsx
// Stunning project cards with browser mockups and case-study expansion

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github } from "lucide-react";
import DepthCard from "./DepthCard";
import { ScrollFadeIn, ScrollTextReveal, ScrollStagger, TiltOnScroll } from "./ScrollAnimations";
import fusionImg from "../assets/projects/fusion.png";
import podmanImg from "../assets/projects/podman.png";
import reactImg from "../assets/projects/react.png";

const projects = [
    {
        id: "fusion",
        title: "FUSION",
        subtitle: "Open-Source Optical Network Simulator",
        description: "Co-maintainer of an optical network simulator used by researchers at 4+ institutions and industry collaborators like AT&T and Red Hat",
        image: fusionImg,
        color: "purple",
        tech: ["Python", "GitHub Actions", "CI/CD", "RL"],
        stats: [
            { label: "Commits", value: "3,000+" },
            { label: "Stars", value: "13" },
            { label: "Forks", value: "7" },
        ],
        status: "launched",
        links: {
            github: "https://github.com/SDNNetSim/FUSION",
        },
        fullStory: {
            problem: "Optical network research lacked a standardized, open-source environment for testing reinforcement learning algorithms. Researchers had to build custom simulators from scratch.",
            solution: "Co-maintain FUSION's CI pipeline (~2,000 automated tests), keeping the main branch stable. Integrated RL agents with usable APIs/configs and documented issues by reproducing problems on macOS and Linux.",
            impact: [
                "Stable CI for dozens of researchers at 4+ institutions",
                "Industry collaborators include AT&T and Red Hat",
                "Co-authored IEEE-published paper",
                "NSF POSE commercialization proposal with MIT mentorship",
            ],
            technical: "Python-based simulator with GitHub Actions CI, RL integration via Gymnasium, cross-platform testing on macOS and Linux.",
        },
    },
    {
        id: "podman",
        title: "Podman",
        subtitle: "Open-Source Contributor (Red Hat Ecosystem)",
        description: "Implemented no-session exec mode in Go, delivering 2.7x faster exec with integration tests passing CI on Fedora, Windows, and macOS",
        image: podmanImg,
        color: "blue",
        tech: ["Go", "Linux", "Containers", "CI/CD"],
        stats: [
            { label: "Exec Speedup", value: "2.7x" },
            { label: "Platforms", value: "3" },
            { label: "New Tests", value: "2" },
        ],
        status: "launched",
        links: {
            github: "https://github.com/containers/podman",
        },
        fullStory: {
            problem: "Podman had a performance issue with exec operations that needed investigation and optimization.",
            solution: "Investigated and reproduced the exec performance issue by benchmarking with hyperfine, inspecting logs, and tracing behavior on Linux. Implemented a no-session exec mode in Go.",
            impact: [
                "2.7x faster exec operations",
                "Two new integration tests added",
                "Tests pass CI on Fedora, Windows, and macOS",
            ],
            technical: "Go implementation, Linux tracing and debugging, hyperfine benchmarking, cross-platform CI validation.",
        },
    },
    {
        id: "portfolio",
        title: "This Portfolio",
        subtitle: "React + Notion CMS",
        description: "Built with React, Tailwind, and Framer Motion. Blog syncs from Notion API with full dark mode support.",
        image: reactImg,
        color: "green",
        tech: ["React", "Tailwind", "Framer Motion"],
        stats: [
            { label: "Lighthouse", value: "95+" },
            { label: "Dark Mode", value: "Yes" },
            { label: "CMS", value: "Notion" },
        ],
        status: "launched",
        links: {
            github: "https://github.com/ryanmccann1024/portfolio_website",
            live: "/",
        },
        fullStory: {
            problem: "Needed a portfolio that showcases technical skills while being easy to update with blog content.",
            solution: "React SPA with Notion as a headless CMS for the blog, Framer Motion for scroll animations, and a terminal-inspired design.",
            impact: [
                "Blog posts sync instantly from Notion",
                "Full dark mode support",
                "95+ Lighthouse scores across the board",
            ],
            technical: "Vite for builds, react-notion-x for rendering, Apple-style scroll animations with Framer Motion.",
        },
    },
];

function BrowserMockup({ image, title, isHovered }) {
    return (
        <div className="relative rounded-lg overflow-hidden bg-slate-900 shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-2">
                    <div className="bg-slate-700 rounded px-3 py-1 text-xs text-gray-400 font-mono truncate">
                        {title.toLowerCase().replace(/\s+/g, "-")}.dev
                    </div>
                </div>
            </div>

            {/* Screenshot with hover zoom */}
            <motion.div
                className="aspect-video overflow-hidden"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-top"
                />
            </motion.div>
        </div>
    );
}

function ExpandedProjectContent({ project }) {
    return (
        <div className="p-5 sm:p-6 md:p-10">
            {/* Header - centered */}
            <div className="mb-6 sm:mb-8 text-center">
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">
                    {project.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display">
                    {project.title}
                </h2>
            </div>

            {/* Screenshot */}
            <div className="mb-6 sm:mb-8">
                <BrowserMockup image={project.image} title={project.title} isHovered={false} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Problem & Solution */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-1 sm:mb-2">
                        Problem
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.fullStory.problem}
                    </p>
                </div>
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-1 sm:mb-2">
                        Solution
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.fullStory.solution}
                    </p>
                </div>
            </div>

            {/* Impact */}
            <div className="mb-6 sm:mb-8">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2 sm:mb-3">
                    Impact
                </h3>
                <ul className="space-y-2">
                    {project.fullStory.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tech + Links row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                </div>
                <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
                >
                    <Github size={14} className="sm:w-4 sm:h-4" />
                    GitHub
                </a>
            </div>
        </div>
    );
}

export function ProjectCard({ project, index }) {
    return (
        <DepthCard
            glowColor={project.color}
            className="group h-full"
            expandedContent={<ExpandedProjectContent project={project} />}
        >
            <div className="p-4 sm:p-5 lg:p-6 h-full flex flex-col">
                {/* Browser mockup */}
                <div className="mb-3 sm:mb-4">
                    <BrowserMockup image={project.image} title={project.title} />
                </div>

                {/* Title and subtitle */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-display mb-1">
                    {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                    {project.subtitle}
                </p>

                {/* Tech tags - pushed to bottom */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 rounded"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </DepthCard>
    );
}

export default function ProjectShowcase() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="py-16 sm:py-24 lg:py-32 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section header with parallax */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="mb-10 sm:mb-16 lg:mb-20 text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white font-display">
                        <ScrollTextReveal text="Projects that ship" />
                    </h2>
                </motion.div>

                {/* Project grid with stagger */}
                <ScrollStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
                    {projects.map((project, i) => (
                        <TiltOnScroll key={project.id}>
                            <ProjectCard project={project} index={i} />
                        </TiltOnScroll>
                    ))}
                </ScrollStagger>
            </div>
        </section>
    );
}

export { projects };
