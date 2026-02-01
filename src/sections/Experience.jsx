// Experience & Education section with enhanced timeline animations
// Ryan McCann – Portfolio Revamp

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, School, Award, Book } from "lucide-react";
import { timelineItem, staggerContainer, customEasing } from "../constants/animations";

/***** EXPERIENCE DATA *****/
const experience = [
    {
        title: "AI Researcher",
        org: "University of Massachusetts Lowell",
        period: "Sept. 2022 – Present",
        icon: Briefcase,
        bullets: [
            "Integrated reinforcement learning into an open-source optical-network simulator, boosting dynamic efficiency by 25%.",
            "Managed 80+ PRs across a 2,000-commit code base while coordinating a 5-person team via GitHub Actions & JIRA.",
            "Published 3 IEEE conference papers; journal submission on interpretable deep RL for optical routing in progress.",
            "Presented research in Spanish at IEEE Latin-American Comms 2024, demonstrating bilingual remote-ready skills.",
        ],
    },
    {
        title: "Firmware Validation Engineer Intern",
        org: "Zebra Technologies",
        period: "Jan – Aug 2022",
        icon: Briefcase,
        bullets: [
            "Built Jenkins-driven automated firmware tests, cutting build failures by >150 per quarter.",
            "Created a Python API parser that certified Wi-Fi 6 compliance on 10+ mobile printer models.",
            "Pitched new validation workflow directly to the CPO.",
        ],
    },
    {
        title: "Data Scientist Intern",
        org: "nference",
        period: "Summers 2019 & 2020",
        icon: Briefcase,
        bullets: [
            "Developed Python pipelines to compute similarity across 300+ drugs and their tolerance distributions.",
            "Queried large-scale Gene Expression APIs; reduced data-prep latency via MongoDB caching.",
            "Squashed 30 unit-test bugs to stabilise a mission-critical NLP library for 100+ internal devs.",
        ],
    },
];

/***** EDUCATION DATA *****/
const education = [
    {
        title: "Ph.D. in Computer Engineering (part-time)",
        org: "University of Massachusetts Lowell",
        period: "2024 – Expected 2028",
        icon: GraduationCap,
        bullets: [
            "Full fellowship – covers M.S. + Ph.D. stipend & benefits; 3.7 GPA.",
            "Research: disaster-aware RL for elastic optical networks.",
            "Redesigned Network Design course to include LLM-assisted routing labs.",
            "Organising-committee member for 2025 Optical-AI Workshop.",
        ],
    },
    {
        title: "M.S.E. in Computer Engineering (accelerated)",
        org: "University of Massachusetts Lowell",
        period: "2022 – 2023 (18 months)",
        icon: GraduationCap,
        bullets: [
            "Thesis: Q-learning routing improved optical-network routing by 18%.",
            "Founded lab's first open-source optical-network simulator – now 10+ GitHub stars.",
            "Completed degree 6 months early while TA-ing core Internet-protocols course.",
        ],
    },
    {
        title: "B.S.E. in Computer Engineering, Magna Cum Laude",
        org: "University of Massachusetts Lowell",
        period: "2018 – 2022",
        icon: School,
        bullets: [
            "3.9 GPA | Honors College | Tau Beta Pi & IEEE student-chapter member.",
            "Capstone: built student-friendly Fedora distro – featured in UML Engineering Magazine.",
            "Founded Student Volunteers for Sustainability; mentored 20 third-graders via Project LEARN.",
        ],
    },
];

/***** SCHOLARSHIPS DATA *****/
const scholarships = [
    {
        label: "John and Abigail Adams Scholarship",
        detail: "Freed budget for all undergraduate books purchased.",
    },
    {
        label: "Massachusetts High Demand Scholarship",
        detail: "Offset undergraduate debt.",
    },
];

/***** CONTINUOUS LEARNING *****/
const continuousLearning = [
    "Stanford CS234 (Reinforcement Learning)",
    "Berkeley Deep RL Bootcamp",
    "MIT OCW Probability & Linear Algebra",
];

/***** TIMELINE ITEM COMPONENT *****/
function TimelineEntry({ title, org, period, bullets, icon: Icon, index }) {
    return (
        <motion.li
            variants={timelineItem}
            custom={index}
            className="mb-10 ml-6 last:mb-0"
        >
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-800">
                <Icon size={12} className="text-white" />
            </span>
            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">
                    {title}
                </h3>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    @{org}
                </span>
            </div>
            <time className="mb-3 block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {period}
            </time>
            <ul className="list-none space-y-2 text-base text-gray-600 dark:text-gray-300">
                {bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </motion.li>
    );
}

export default function ExperienceSection() {
    return (
        <section id="experience" className="bg-white py-24 dark:bg-slate-800">
            <div className="mx-auto max-w-4xl px-4">
                {/* -------- EXPERIENCE -------- */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: customEasing }}
                    className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 font-display"
                >
                    Experience
                </motion.h2>

                <motion.ol
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative border-l-2 border-gray-200 dark:border-slate-600"
                >
                    {experience.map((item, i) => (
                        <TimelineEntry key={i} {...item} index={i} />
                    ))}
                </motion.ol>

                {/* -------- EDUCATION -------- */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: customEasing }}
                    className="mb-12 mt-20 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 font-display"
                >
                    Education
                </motion.h2>

                <motion.ol
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative border-l-2 border-gray-200 dark:border-slate-600"
                >
                    {education.map((item, i) => (
                        <TimelineEntry key={i} {...item} index={i} />
                    ))}
                </motion.ol>

                {/* -------- SCHOLARSHIPS & AWARDS -------- */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: customEasing }}
                    className="mt-16"
                >
                    <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50 font-display">
                        Scholarships & Awards
                    </h3>
                    <div className="flex flex-col gap-4">
                        {scholarships.map(({ label, detail }) => (
                            <div
                                key={label}
                                className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm dark:border-emerald-700/30 dark:from-emerald-900/20 dark:to-slate-800"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-800/50">
                                    <Award size={18} className="text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-emerald-800 dark:text-emerald-200">{label}</p>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300">{detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* -------- CONTINUOUS LEARNING -------- */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: customEasing }}
                    className="mt-12"
                >
                    <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50 font-display">
                        Continuous Learning
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {continuousLearning.map((course) => (
                            <li
                                key={course}
                                className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-50 to-white px-4 py-3 text-sm font-medium text-purple-800 shadow-sm transition hover:shadow-md dark:from-purple-900/30 dark:to-slate-800 dark:text-purple-200"
                            >
                                <Book size={16} className="flex-shrink-0 text-purple-600 dark:text-purple-400" />
                                {course}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
