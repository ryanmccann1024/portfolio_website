// src/sections/Projects.jsx
import {GithubIcon, ExternalLinkIcon, PlayCircle} from "lucide-react";
import {motion} from "framer-motion";

/* ── PROJECT DATA ───────────────────────────────────────── */
const projects = [
    {
        title: "Optical Simulator v6",
        img: "/assets/sim6.png",
        tech: ["Python", "React", "FastAPI", "Tailwind"],
        blurb:
            "Next-gen elastic-optical network simulator; plug-in RL agents & live dashboards. Targeting $300 k NSF POSE grant.",
        repo: "https://github.com/ryan/simulator-v6",
        demo: null,
    },
    {
        title: "Podman HPC Extensions",
        img: "/assets/podman_hpc.png",
        tech: ["Go", "Podman", "SLURM"],
        blurb:
            "Collaborating with Red Hat to add GPU-aware container runtime for HPC clusters; CI parity with Docker.",
        repo: "https://github.com/containers/podman",
        demo: null,
    },
    {
        title: "RL Traffic Visualizer",
        img: "/assets/rlviz.png",
        tech: ["TypeScript", "D3.js", "WebSockets"],
        blurb:
            "Real-time React dashboard that explains PPO path choices with animated spectrum maps.",
        repo: "https://github.com/ryan/rl-traffic-viz",
        demo: "https://rlviz-demo.netlify.app",
    },
    {
        title: "Portfolio Site (this)",
        img: "/assets/portfolio.png",
        tech: ["React", "Tailwind", "GitHub Actions"],
        blurb:
            "Built & deployed in < 24 h with GPT co-pilot; dark-mode, framer-motion, auto-deploy via Pages.",
        repo: "https://github.com/ryan/portfolio_website",
        demo: "https://ryan.github.io/portfolio_website/",
    },
];

/* ── CARD VARIANT ──────────────────────────────────────── */
const cardVariant = {
    hidden: {opacity: 0, y: 40},
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: {delay: i * 0.1, duration: 0.4, ease: "easeOut"},
    }),
};

/* ── COMPONENT ─────────────────────────────────────────── */
export default function Projects() {
    return (
        <section id="projects" className="bg-gray-50 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="mb-12 text-4xl font-extrabold tracking-tight
                       text-gray-900 dark:text-gray-50">
                    Highlight Projects
                </h2>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(
                        ({title, img, tech, blurb, repo, demo}, i) => (
                            <motion.article
                                key={title}
                                custom={i}
                                variants={cardVariant}
                                initial="hidden"
                                whileInView="show"
                                viewport={{once: true, amount: 0.3}}
                                className="group relative overflow-hidden rounded-xl border
                           border-gray-200 bg-white shadow-sm transition
                           hover:-translate-y-1 hover:shadow-lg
                           dark:border-slate-700 dark:bg-slate-800"
                            >
                                {/* screenshot */}
                                <img
                                    src={img}
                                    alt={`${title} screenshot`}
                                    className="h-48 w-full object-cover
                             transition duration-300 group-hover:scale-105"
                                />

                                {/* overlay play icon if demo */}
                                {demo && (
                                    <PlayCircle
                                        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2
                               text-white opacity-0 transition group-hover:opacity-90"
                                    />
                                )}

                                {/* content */}
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold
                                 text-gray-900 dark:text-gray-100">
                                        {title}
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                                        {blurb}
                                    </p>

                                    {/* tech pills */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {tech.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full border border-blue-600/30 bg-blue-50 px-2 py-0.5
                                   text-xs font-medium text-blue-700
                                   dark:border-blue-400/30 dark:bg-blue-900/40 dark:text-blue-300"
                                            >
                        {t}
                      </span>
                                        ))}
                                    </div>

                                    {/* action icons */}
                                    <div className="flex gap-4">
                                        {repo && (
                                            <a
                                                href={repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="GitHub repo"
                                                className="text-gray-600 transition hover:text-blue-600
                                   dark:text-gray-300 dark:hover:text-blue-400"
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
                                                className="text-gray-600 transition hover:text-blue-600
                                   dark:text-gray-300 dark:hover:text-blue-400"
                                            >
                                                <ExternalLinkIcon size={20}/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
