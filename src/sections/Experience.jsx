// src/sections/Experience.jsx
import {BriefcaseIcon} from "lucide-react";

const experiences = [
    {
        role: "Research Engineer (Optical Networks)",
        company: "OpenWave Labs",
        period: "2023 – Present",
        bullets: [
            "Designed RL-based disaster-aware routing (↓35 % blocking prob.)",
            "Led refactor of 20k-LOC simulator → modular plugin architecture",
            "Mentored 2 interns; project accepted to IEEE JSAC ’25",
        ],
    },
    {
        role: "Graduate Research Assistant",
        company: "University of XYZ",
        period: "2021 – 2023",
        bullets: [
            "Published 3 papers on SD-EON resiliency & deep RL",
            "Optimised PPO hyperparams via Optuna; cut training time 40 %",
        ],
    },
    {
        role: "Freelance Full-Stack Developer",
        company: "Various Clients",
        period: "2019 – 2021",
        bullets: [
            "Delivered 10+ React dashboards with Flask/FastAPI back-ends",
            "Automated CI/CD on GitHub Actions & Netlify",
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="mx-auto max-w-4xl px-4 py-24">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">Experience</h2>

            <ol className="relative border-l border-gray-300 dark:border-slate-600">
                {experiences.map(({role, company, period, bullets}, idx) => (
                    <li key={idx} className="mb-12 ml-4">
                        {/* timeline dot */}
                        <span
                            className="absolute -left-2.5 flex h-5 w-5 items-center justify-center
                         rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900"
                        >
              <BriefcaseIcon size={12} color="white"/>
            </span>

                        {/* header line */}
                        <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                            <h3 className="text-lg font-semibold">{role}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                @{company}
              </span>
                        </div>
                        <time className="mb-3 block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {period}
                        </time>

                        {/* bullet list */}
                        <ul className="mb-4 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                            {bullets.map((b, i) => (
                                <li key={i} className="mb-1">
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </section>
    );
}
