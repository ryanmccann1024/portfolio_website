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
        period: "Sept 2025 - Present",
        bullets: [
            "Investigated and reproduced exec performance issue using hyperfine benchmarking and Linux tracing",
            "Implemented no-session exec mode in Go, delivering 2.7× faster exec",
            "Added two new integration tests passing CI on Fedora, Windows, and macOS",
        ],
    },
    {
        title: "Research Engineer",
        company: "University of Massachusetts Lowell",
        period: "Sept 2022 - Present",
        bullets: [
            "Maintained FUSION's CI pipeline (~2,000 automated tests) for researchers at 4+ institutions",
            "Documented and resolved 7+ issues by reproducing problems on macOS and Linux",
            "Co-authored IEEE-published paper and NSF POSE commercialization proposal",
        ],
    },
    {
        title: "Firmware Validation Intern",
        company: "Zebra Technologies",
        period: "Jan - Sept 2022",
        bullets: [
            "Built 15+ Python test suites and Jenkins pipelines for Wi-Fi 6 firmware",
            "Helped cut ~150 recurring validation failures using log-based debugging",
        ],
    },
    {
        title: "Data Scientist Intern",
        company: "Nference",
        period: "Summers 2019 & 2020",
        bullets: [
            "Fixed 30+ unit tests and Python data pipelines in production NLP codebase",
            "Documented root causes and coordinated fixes with downstream teams",
        ],
    },
];

const education = [
    {
        degree: "M.S.E. in Computer Engineering",
        school: "University of Massachusetts Lowell",
        year: "2023",
        highlight: "Full Scholarship",
        detail: "Focus: operating systems, Linux kernel development, and computer networking",
    },
    {
        degree: "B.S.E. in Computer Engineering",
        school: "University of Massachusetts Lowell",
        year: "2022",
        highlight: "3.9 GPA, Magna Cum Laude",
        detail: "Fedora package maintainer, founder of Open-Source Club",
    },
];

const skills = {
    "Systems & OS": ["Linux", "macOS", "POSIX shell", "Podman", "TCP/IP"],
    "Programming": ["Python", "C", "C++", "Bash", "Go"],
    "Debugging": ["Log analysis", "Benchmarking", "CI/CD", "Git"],
};

function ExperienceModal() {
    return (
        <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-8 text-center">
                Experience
            </h2>
            <div className="space-y-8">
                {experience.map((job, i) => (
                    <div key={i} className="border-l-2 border-gray-200 dark:border-slate-700 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {job.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                            {job.company}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            {job.period}
                        </p>
                        <ul className="space-y-1.5">
                            {job.bullets.map((bullet, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function EducationModal() {
    return (
        <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-8 text-center">
                Education
            </h2>
            <div className="space-y-6">
                {education.map((edu, i) => (
                    <div key={i} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {edu.degree}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {edu.school} · {edu.year}
                                </p>
                            </div>
                            <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full whitespace-nowrap">
                                {edu.highlight}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{edu.detail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SkillsModal() {
    return (
        <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-8 text-center">
                Skills
            </h2>
            <div className="space-y-6">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
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
            "Python, C/C++, Go, Bash",
            "Linux, Podman, CI/CD",
            "Benchmarking & debugging",
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
