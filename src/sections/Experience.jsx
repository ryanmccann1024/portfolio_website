// Experience & Education section with Scholarships & Continuous Learning
// Ryan McCann – June 2025

import {motion} from "framer-motion";
import {Briefcase, GraduationCap, School, Award, Book} from "lucide-react";

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
            "Published 3 IEEE conference papers; journal submission on interpretable deep RL for optical routing in progress (Summer 2025).",
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
            "Developed Python pipelines to compute similarity across 300+ drugs and their tolerance distributions, used by medical doctors for treatment decisions.",
            "Queried large-scale Gene Expression APIs; reduced data-prep latency via MongoDB caching.",
            "Squashed 30 unit-test bugs to stabilise a mission-critical NLP library for 100+ internal devs.",
            "Thrived in a high-growth start-up.",
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
            "Research: disaster-aware RL for elastic optical networks; passed qualifier with survey on RL-guided failure mitigation.",
            "Redesigned Network Design course to include LLM-assisted routing labs; teaching assistant for 200+ students.",
            "Co-authored 2 IEEE papers; organising-committee member for 2025 Optical-AI Workshop.",
        ],
    },
    {
        title: "M.S.E. in Computer Engineering (accelerated)",
        org: "University of Massachusetts Lowell",
        period: "2022 – 2023 (18 months)",
        icon: GraduationCap,
        bullets: [
            "Thesis: Q-learning routing improved optical-network routing by 18 %.",
            "Founded lab’s first open-source optical-network simulator (Python) – now 10+ GitHub stars.",
            "Completed degree 6 months early while TA-ing core Internet-protocols course.",
            "Advanced electives: Reinforcement Learning, Linux Kernel Development, Verilog/VHDL synthesis.",
        ],
    },
    {
        title: "B.S.E. in Computer Engineering, Magna Cum Laude",
        org: "University of Massachusetts Lowell",
        period: "2018 – 2022",
        icon: School,
        bullets: [
            "3.9 GPA | Honors College | Tau Beta Pi & IEEE student-chapter member.",
            "Capstone: built student-friendly Fedora distro – featured in UML Engineering Magazine (Spring 2022).",
            "Led Microprocessor Systems Design lab of 2 peers.",
            "Founded Student Volunteers for Sustainability; secured Dean-level backing for campus food-quality initiative; promoted from food-pantry bagger to keyholder managing inventory at Central Food Ministry.",
            "Volunteered as math tutor for Project LEARN, mentoring 20 third-graders remotely during COVID-19.",
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

/***** ANIMATION VARIANT *****/
const variant = {
    hidden: {opacity: 0, y: 40},
    show: {opacity: 1, y: 0, transition: {ease: 'easeOut', duration: 0.4}},
};

export default function ExperienceSection() {
    return (
        <section id="experience" className="bg-white py-24 dark:bg-slate-700">
            <div className="mx-auto max-w-4xl px-4">

                {/* -------- EXPERIENCE -------- */}
                <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                    Experience
                </h2>
                <ol className="relative border-l border-gray-300 dark:border-slate-600">
                    {experience.map(({title, org, period, bullets, icon: Icon}, i) => (
                        <motion.li
                            key={i}
                            variants={variant}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, amount: 0.3}}
                            className="mb-12 ml-6"
                        >
              <span
                  className="absolute -left-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white dark:ring-white">
                <Icon size={12} className="text-white"/>
              </span>
                            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">@{org}</span>
                            </div>
                            <time
                                className="mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                {period}
                            </time>
                            <ul className="list-disc pl-5 text-base font-medium text-gray-800 dark:text-gray-200">
                                {bullets.map((b, j) => (
                                    <li key={j} className="mb-1">{b}</li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </ol>

                {/* -------- EDUCATION -------- */}
                <h2 className="mb-12 mt-20 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                    Education
                </h2>
                <ol className="relative border-l border-gray-300 dark:border-slate-600">
                    {education.map(({title, org, period, bullets, icon: Icon}, i) => (
                        <motion.li
                            key={i}
                            variants={variant}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, amount: 0.3}}
                            className="mb-12 ml-6"
                        >
              <span
                  className="absolute -left-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white dark:ring-white">
                <Icon size={12} className="text-white"/>
              </span>
                            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">@{org}</span>
                            </div>
                            <time
                                className="mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                {period}
                            </time>
                            <ul className="list-disc pl-5 text-base font-medium text-gray-800 dark:text-gray-200">
                                {bullets.map((b, j) => (
                                    <li key={j} className="mb-1">{b}</li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </ol>

                {/* -------- SCHOLARSHIPS & AWARDS -------- */}
                <motion.div
                    variants={variant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true, amount: 0.3}}
                    className="mt-12"
                >
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-50">
                        Scholarships & Awards
                    </h3>
                    <div className="flex flex-col gap-4">
                        {scholarships.map(({label, detail}) => (
                            <div
                                key={label}
                                className="flex items-start gap-3 rounded-lg border border-emerald-300/40 bg-emerald-50 px-4 py-3 dark:border-emerald-600/30 dark:bg-emerald-900/20"
                            >
                                <Award size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"/>
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
                    variants={variant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true, amount: 0.3}}
                    className="mt-16"
                >
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-50">
                        Continuous Learning
                    </h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {continuousLearning.map((course) => (
                            <li
                                key={course}
                                className="flex items-center gap-2 rounded-md bg-purple-600/10 px-3 py-2 text-sm font-medium text-purple-800 dark:bg-purple-500/20 dark:text-purple-200"
                            >
                                <Book size={16} className="shrink-0"/>
                                {course}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
