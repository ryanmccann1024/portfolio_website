// Revamped Projects section – outcome-first blurbs and clearer status tags
// Ryan McCann – June 2025

import {GithubIcon, ExternalLinkIcon, PlayCircle} from "lucide-react";
import {motion} from "framer-motion";
import fusionImg from "../assets/images/fusion.png";
import podmanImg from "../assets/images/podman.png";
import reactImg from "../assets/images/react.png";

/* ── PROJECT DATA ───────────────────────────────────────── */
const projects = [
    {
        title: "FUSION – Optical-Network RL Simulator",
        img: fusionImg,
        tech: [
            "Python",
            "Reinforcement Learning",
            "PyTorch",
            "Gymnasium",
            "Optical Networks",
            "Slurm",
        ],
        blurb:
            "Authored FUSION, an open-source optical-network simulator that accelerates RL research. Now 10+ ★ on GitHub, 5 forks, under NSF POSE review for a $300 k grant (decision by 2026). Features crosstalk-aware grooming and SDN/EON APIs.",
        repo: "https://github.com/SDNNetSim/FUSION",
        demo: null,
        status: "launched", // custom field for badge
    },
    {
        title: "Podman HPC Extensions (upcoming)",
        img: podmanImg,
        tech: [
            "Go",
            "Podman",
            "HPC",
            "GPU",
            "SquashFS",
            "CI/CD",
        ],
        blurb:
            "Collaborating with Red Hat’s Podman team (July 2025) to prototype GPU-aware scheduling and SquashFS image support for multi-TB scientific workloads. First design doc submitted; initial PR targeting fuse-overlayfs masking lands August 2025.",
        repo: "https://github.com/NERSC/podman-hpc",
        demo: null,
        status: "in-progress",
    },
    {
        title: "Personal Portfolio (this site)",
        img: reactImg,
        tech: [
            "React",
            "Vite",
            "Tailwind",
            "Framer Motion",
            "Lighthouse 99/100",
        ],
        blurb:
            "Designed + built in 24 h: responsive, animated portfolio scoring 99 Performance / 100 Accessibility on Lighthouse. Demonstrates modern React stack with motion-first UX.",
        repo: "https://github.com/ryanmccann1024/portfolio_website",
        demo: null,
        status: "launched",
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
                <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                    Highlight Projects
                </h2>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(({title, img, tech, blurb, repo, demo, status}, i) => (
                        <motion.article
                            key={title}
                            custom={i}
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, amount: 0.3}}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                        >
                            {/* screenshot */}
                            <img
                                src={img}
                                alt={`${title} screenshot`}
                                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                            {/* overlay play icon if demo */}
                            {demo && (
                                <PlayCircle
                                    className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition group-hover:opacity-90"/>
                            )}

                            {/* status badge */}
                            <span
                                className="absolute right-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                {status}
              </span>

                            {/* content */}
                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {title}
                                </h3>
                                <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">{blurb}</p>

                                {/* tech pills */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {tech.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full border border-blue-600/30 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-400/30 dark:bg-blue-900/40 dark:text-blue-300"
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
                                            className="text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
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
                                            className="text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            <ExternalLinkIcon size={20}/>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}