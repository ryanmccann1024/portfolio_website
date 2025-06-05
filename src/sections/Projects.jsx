// src/sections/Projects.jsx
import {GithubIcon, ExternalLinkIcon} from "lucide-react";

const projects = [
    {
        title: "Disaster-Aware SD-EON Simulator",
        description:
            "Open-source tool that models correlated fiber failures and optimizes routing with PPO. Adopted by 3 research labs.",
        img: "/assets/sdeon.png",      // adjust path to your screenshot
        tech: ["Python", "React", "Tailwind", "PPO", "Optical"],
        github: "https://github.com/ryan/sdeon-simulator",
        demo: null,
    },
    {
        title: "RL-Driven Traffic Visualizer",
        description:
            "Real-time React dashboard that explains RL agent decisions for telecom networks.",
        img: "/assets/rlviz.png",
        tech: ["TypeScript", "D3.js", "FastAPI"],
        github: "https://github.com/ryan/rl-traffic-viz",
        demo: "https://rlviz-demo.netlify.app",
    },
    // ➜ Add more project objects here
];

export default function Projects() {
    return (
        <section id="projects" className="bg-gray-50 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="mb-12 text-3xl font-bold tracking-tight">Projects</h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(
                        ({title, description, img, tech, github, demo}, idx) => (
                            <article
                                key={idx}
                                className="group relative overflow-hidden rounded-xl border border-gray-200
                           bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md
                           dark:border-slate-700 dark:bg-slate-800"
                            >
                                {/* Screenshot */}
                                <img
                                    src={img}
                                    alt={`${title} screenshot`}
                                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                                />

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                                    <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                                        {description}
                                    </p>

                                    {/* Tech pills */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {tech.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium
                                   text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                                            >
                        {t}
                      </span>
                                        ))}
                                    </div>

                                    {/* Action icons */}
                                    <div className="flex gap-4">
                                        {github && (
                                            <a
                                                href={github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="GitHub repo"
                                                className="text-gray-600 hover:text-blue-600
                                   dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                                            >
                                                <GithubIcon size={20}/>
                                            </a>
                                        )}
                                        {demo && (
                                            <a
                                                href={demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Live demo"
                                                className="text-gray-600 hover:text-blue-600
                                   dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                                            >
                                                <ExternalLinkIcon size={20}/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
