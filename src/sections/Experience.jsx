// src/sections/Experience.jsx
import {motion} from "framer-motion";
import {
    Briefcase,
    GraduationCap,
    Code2,
    School,
} from "lucide-react";

const experience = [
    {
        title: "AI Researcher",
        org: "University of Massachusetts Lowell",
        period: "Sept. 2022 – Present",
        icon: Briefcase,
        bullets: [
            "Integrated reinforcement learning into an open-source optical network simulator, improving network efficiency by 25% in dynamic scenarios.",
            "Managed large-scale experiments using Slurm HPC clusters across distributed nodes.",
            "Led a team of 5 developers; oversaw 80+ pull requests in a project with 2,000+ commits.",
            "Published research at 3 international IEEE conferences (200+ attendees).",
            "Preparing journal submission on interpretable deep RL for optical routing (IEEE, Summer 2025).",
            "Attended and presented at IEEE Latin American Conference on Communications (Colombia) where I networked " +
            "with professionals in Spanish only."
        ]
    },
    {
        title: "Firmware Validation Engineer Intern",
        org: "Zebra Technologies",
        period: "Jan. – Aug. 2022",
        icon: Briefcase,
        bullets: [
            "Designed and deployed automated firmware validation in Jenkins; reduced build failures by over 150 instances.",
            "Created a Python-based API parser to streamline Wi-Fi 6 compliance testing in under 3 months.",
            "Presented technical proposals directly to the Chief Product Officer as part of a company innovation challenge."
        ]
    },
    {
        title: "Data Scientist Intern",
        org: "Nference",
        period: "Summer 2019 & 2020",
        icon: Briefcase,
        bullets: [
            "Engineered NLP functions used by 100+ internal devs to enhance text analytics workflows.",
            "Integrated MongoDB to reduce data pipeline latency across production systems."
        ]
    },
];

const education = [
    {
        title: "Ph.D. in Computer Engineering (Part-Time)",
        org: "University of Massachusetts Lowell",
        period: "2024 – Expected 2028",
        icon: GraduationCap,
        bullets: [
            "Full fellowship recipient (covers M.S. + Ph.D. with stipend and benefits).",
            "Passed Ph.D. qualifier: Survey on reinforcement learning applications for failure-aware optical networking.",
            "Research focus: disaster-aware reinforcement learning for elastic optical networks.",
            "Proactively revisiting foundational topics through self-paced online courses, including Stanford RL, Berkeley Deep RL, and MIT OCW (probability & linear algebra), to deepen understanding beyond formal degree requirements.",
            "Redesigned the Network Design course to integrate recent AI advances, including applications of ChatGPT and large language models.",
            "Co-authored two papers published at IEEE-sanctioned conferences, including a FUSION presentation on RL-based optical networks.",
            "Currently collaborating with faculty to design a new course on Python best practices and applied artificial intelligence for engineering students."
        ]
    },
    {
        title: "M.S.E. in Computer Engineering",
        org: "University of Massachusetts Lowell",
        period: "2022 – 2023",
        icon: GraduationCap,
        bullets: [
            "Successfully defended thesis: Q-learning-based routing strategies significantly improved network resilience.",
            "3.7 GPA; taught 200+ students core Internet protocols across all five layers (as TA and guest lecturer).",
            "Assisted in the successful publication of two research papers alongside faculty collaborators.",
            <>
                Founded the lab’s first{' '}
                <a
                    href="#projects"
                    className="text-blue-600 underline"
                >
                    open-source optical network simulator
                </a>{' '}
                in Python, integrating AI-driven components and custom modeling tools.
            </>,
            "Pushed beyond degree requirements: fulfilled all Computer Engineering core courses while also taking advanced Computer Science electives to expand technical breadth.",
            "Hands-on research and coursework with HTTP, DNS, OpenFlow, routing protocols, and network performance evaluation."
        ]
    },
    {
        title: "B.S.E. in Computer Engineering",
        org: "University of Massachusetts Lowell",
        period: "2018 – 2022",
        icon: School,
        bullets: [
            "3.9 GPA | Magna Cum Laude | Honors College | Top 12% (Tau Beta Pi inductee).",
            "Top 1% in Circuit Theory 1 Course (perfect score; class average 55–70).",
            "John & Abigail Adams Scholarship (covered books for 4 years) + MA High Demand Scholarship (debt offset).",
            <>
                Founded UML’s first open-source club; hosted a{' '}
                <a
                    href="https://www.youtube.com/watch?v=215-9_kxJh4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    Red Hat kickoff
                </a>{' '}
                event focused on Fedora and open-source collaboration.
            </>,
            <>
                Capstone: Built a student-friendly Fedora distribution; featured in{' '}
                <a
                    href="https://www.uml.edu/engineering/research/engineering-solutions/es-spring-summer-2022/ece-students-develop-friendly-fedora.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    UML Engineering Magazine
                </a>
                .
            </>,
            "Founded Council on Food Quality; worked with Dean Kohl to improve campus dining; ran info systems at a local food pantry.",
            <>
                Completed graduate-level coursework during undergrad in{' '}
                <strong>Software Engineering</strong> and{' '}
                <strong>Verilog & VHDL Synthesis and Design</strong>. See full course list on{' '}
                <a
                    href="https://www.linkedin.com/in/ryanjmccann/details/courses/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    LinkedIn
                </a>
                .
            </>
        ]

    }
];

const variant = {
    hidden: {opacity: 0, y: 40},
    show: {
        opacity: 1,
        y: 0,
        transition: {ease: "easeOut", duration: 0.4},
    },
};

export default function Experience() {
    return (
        <section
            id="experience & education"
            className="bg-white py-24 dark:bg-slate-700"
        >
            <div className="mx-auto max-w-4xl px-4">
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
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {title}
                                </h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">@{org}</span>
                            </div>
                            <time
                                className="mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                {period}
                            </time>
                            <ul className="list-disc pl-5 text-base font-medium text-gray-800 dark:text-gray-200">
                                {bullets.map((b, j) => (
                                    <li key={j} className="mb-1">
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </ol>

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
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {title}
                                </h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">@{org}</span>
                            </div>
                            <time
                                className="mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                {period}
                            </time>
                            <ul className="list-disc pl-5 text-base font-medium text-gray-800 dark:text-gray-200">
                                {bullets.map((b, j) => (
                                    <li key={j} className="mb-1">
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
