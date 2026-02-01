// src/components/AboutSection.jsx
// Clean about section matching projects style

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import DepthCard from "./DepthCard";
import { ScrollFadeIn, ScrollTextReveal, ScrollStagger, TiltOnScroll } from "./ScrollAnimations";

const experience = [
    {
        title: "Open-Source Collaborator",
        company: "Podman (Red Hat Ecosystem)",
        period: "Nov. 2025",
        icon: "🔴",
        color: "red",
        bullets: [
            "Implemented core runtime features in Golang, including a no-session exec mode that reduced execution overhead by 2.7×",
            "Added cross-platform integration tests (Fedora, Windows, macOS) and collaborated with Red Hat engineers via upstream reviews",
        ],
    },
    {
        title: "Research Engineer",
        company: "University of Massachusetts Lowell",
        period: "Sept. 2022 – Present",
        icon: "🎓",
        color: "blue",
        bullets: [
            "Co-maintainer of FUSION, an open-source simulation platform used by AT&T, Red Hat, and MIT",
            "Owned CI/CD reliability with 2,000+ automated tests and built Python-based experiment pipelines",
            "Integrated and benchmarked RL agents, published in peer-reviewed IEEE paper",
        ],
    },
    {
        title: "Firmware Validation Intern",
        company: "Zebra Technologies",
        period: "Jan. – Sept. 2022",
        icon: "📡",
        color: "purple",
        bullets: [
            "Built Python-based automation for Wi-Fi 6 firmware on Linux",
            "Integrated 15+ test suites into Jenkins CI pipelines to reduce manual validation",
        ],
    },
    {
        title: "Data Scientist Intern",
        company: "Nference",
        period: "Summers 2019 & 2020",
        icon: "🧬",
        color: "green",
        bullets: [
            "Maintained production NLP/ML codebase by fixing 30+ unit tests and Python data pipelines",
            "Improved reliability of downstream ML workflows for 100+ developers",
        ],
    },
];

const education = [
    {
        degree: "M.S.E. in Computer Engineering",
        school: "University of Massachusetts Lowell",
        year: "2023",
        highlight: "Full Scholarship",
        detail: "Focus: Machine and Reinforcement Learning, Data Intensive Computing",
        icon: "🎓",
    },
    {
        degree: "B.S.E. in Computer Engineering",
        school: "University of Massachusetts Lowell",
        year: "2022",
        highlight: "3.9 GPA, Magna Cum Laude",
        detail: "National Honors College",
        icon: "📚",
    },
];

const skills = {
    "AI & ML": ["Python", "GenAI (OpenAI API)", "PyTorch", "ML/RL"],
    "Backend": ["FastAPI", "REST APIs", "Firebase", "Stripe"],
    "DevOps": ["CI/CD", "GitHub Actions", "Jenkins", "Docker/Podman"],
    "Systems": ["Linux", "macOS", "Go", "Bash"],
};

function ExperienceModal() {
    const colorMap = {
        red: "from-red-500 to-orange-500",
        blue: "from-blue-500 to-cyan-500",
        purple: "from-purple-500 to-pink-500",
        green: "from-emerald-500 to-teal-500",
    };
    const dotColorMap = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        green: "bg-emerald-500",
    };

    return (
        <div className="p-8 md:p-12">
            {/* Header with gradient */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display mb-2">
                    Experience
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Building systems that scale
                </p>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 opacity-20 dark:opacity-30" />

                <div className="space-y-8">
                    {experience.map((job, i) => (
                        <div key={i} className="relative flex gap-6 group">
                            {/* Timeline dot */}
                            <div className="relative z-10 flex-shrink-0">
                                <div className={`w-10 h-10 rounded-xl ${dotColorMap[job.color]} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-lg shadow-lg shadow-${job.color}-500/20`}>
                                    {job.icon}
                                </div>
                            </div>

                            {/* Content card */}
                            <div className="flex-1 pb-2">
                                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20">
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {job.title}
                                            </h3>
                                            <p className={`text-sm font-medium bg-gradient-to-r ${colorMap[job.color]} bg-clip-text text-transparent`}>
                                                {job.company}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full">
                                            {job.period}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {job.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dotColorMap[job.color]} flex-shrink-0`} />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EducationModal() {
    return (
        <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display mb-2">
                    Education
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    University of Massachusetts Lowell
                </p>
            </div>

            {/* Education cards */}
            <div className="space-y-6">
                {education.map((edu, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800/80 dark:to-slate-800/40 border border-gray-200/50 dark:border-slate-700/50"
                    >
                        {/* Accent gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />

                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                                    {edu.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {edu.degree}
                                        </h3>
                                        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg shadow-emerald-500/20">
                                            {edu.year}
                                        </span>
                                    </div>

                                    {/* Highlight badge */}
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {edu.highlight}
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {edu.detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SkillsModal() {
    const categoryIcons = {
        "AI & ML": "🤖",
        "Backend": "⚡",
        "DevOps": "🔧",
        "Systems": "💻",
    };
    const categoryColors = {
        "AI & ML": "from-violet-500 to-purple-500",
        "Backend": "from-blue-500 to-cyan-500",
        "DevOps": "from-orange-500 to-amber-500",
        "Systems": "from-emerald-500 to-teal-500",
    };
    const categoryBgColors = {
        "AI & ML": "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/20",
        "Backend": "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20",
        "DevOps": "bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/20",
        "Systems": "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20",
    };

    return (
        <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display mb-2">
                    Skills
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Tools and technologies I work with
                </p>
            </div>

            {/* Skills grid */}
            <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items]) => (
                    <div
                        key={category}
                        className={`p-5 rounded-2xl border ${categoryBgColors[category]} transition-all duration-300 hover:scale-[1.02]`}
                    >
                        {/* Category header */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl">{categoryIcons[category]}</span>
                            <h3 className={`text-sm font-bold uppercase tracking-wide bg-gradient-to-r ${categoryColors[category]} bg-clip-text text-transparent`}>
                                {category}
                            </h3>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium border border-gray-200/50 dark:border-slate-600/50 shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const cards = [
    {
        id: "experience",
        icon: Briefcase,
        title: "Experience",
        color: "blue",
        bullets: [
            "Podman contributor (Red Hat)",
            "2.7× faster exec in Go",
            "CI pipelines for 4+ institutions",
        ],
        modal: <ExperienceModal />,
    },
    {
        id: "education",
        icon: GraduationCap,
        title: "Education",
        color: "purple",
        bullets: [
            "M.S.E. Computer Engineering",
            "Full scholarship recipient",
            "3.9 GPA, Magna Cum Laude",
        ],
        modal: <EducationModal />,
    },
    {
        id: "skills",
        icon: Code,
        title: "Skills",
        color: "green",
        bullets: [
            "Python, GenAI, PyTorch, ML/RL",
            "Linux, Docker/Podman, CI/CD",
            "FastAPI, REST APIs, Go",
        ],
        modal: <SkillsModal />,
    },
];

export default function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="py-32 bg-gray-50 dark:bg-slate-900/50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section header */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white font-display">
                        <ScrollTextReveal text="About Me" />
                    </h2>
                </motion.div>

                {/* Cards grid - same as projects */}
                <ScrollStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                    {cards.map((card) => (
                        <TiltOnScroll key={card.id}>
                            <DepthCard
                                glowColor={card.color}
                                className="h-full"
                                expandedContent={card.modal}
                            >
                                <div className="p-6 h-full flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display mb-4">
                                        {card.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {card.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                    card.color === "blue" ? "bg-blue-500" :
                                                    card.color === "purple" ? "bg-purple-500" :
                                                    "bg-emerald-500"
                                                }`} />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </DepthCard>
                        </TiltOnScroll>
                    ))}
                </ScrollStagger>
            </div>
        </section>
    );
}
