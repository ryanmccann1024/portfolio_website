// Highlight Projects – clickable cards
// Ryan McCann – June 2025

import {GithubIcon, ExternalLinkIcon, PlayCircle} from "lucide-react";
import {motion} from "framer-motion";
import fusionImg from "../assets/projects/fusion.png";
import podmanImg from "../assets/projects/podman.png";
import reactImg from "../assets/projects/react.png";
import {useState, useEffect} from "react";
import Spinner from "../components/Spinner";

/* ── Flicker-Free Image Wrapper ───────────────────────────── */
function CardImage({src, alt}) {
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (loaded) {
            const timeout = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timeout);
        }
    }, [loaded]);

    return (
        <div className="relative h-48 w-full overflow-hidden">
            <img
                src={src}
                alt={alt}
                loading="eager"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
                style={{willChange: "opacity", backfaceVisibility: "hidden"}}
            />
            {!visible && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                    <Spinner small/>
                </div>
            )}
        </div>
    );
}

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
        status: "launched",
    },
    {
        title: "Podman HPC Extensions (upcoming)",
        img: podmanImg,
        tech: ["Go", "Podman", "HPC", "GPU", "SquashFS", "CI/CD"],
        blurb:
            "Collaborating with Red Hat’s Podman team (July 2025) to prototype GPU-aware scheduling and SquashFS image support for multi-TB scientific workloads. First design doc submitted; initial PR targeting fuse-overlayfs masking lands August 2025.",
        repo: "https://github.com/NERSC/podman-hpc",
        demo: null,
        status: "in-progress",
    },
    {
        title: "Scalable Blog w/ Notion CMS + GPT",
        img: reactImg,
        tech: [
            "React",
            "Notion API",
            "react-notion-x",
            "Framer Motion",
            "Tailwind",
            "Splitbee",
        ],
        blurb:
            "Launched this blog platform in < 1 week with zero CMS experience, guided by ChatGPT. Architecture designed in < 24 h. Notion handles content with instant sync, dark-mode support, dynamic routing, and animated UX. SEO & mobile-ready.",
        repo: "https://github.com/ryanmccann1024/portfolio_website",
        demo: null,
        status: "launched",
    },
];

/* ── COMPONENT ─────────────────────────────────────────── */
export default function Projects() {
    return (
        <section id="projects" className="bg-gray-50 py-24 dark:bg-slate-900">
            <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5}}
            >
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                        Highlight Projects
                    </h2>

                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map(
                            ({title, img, tech, blurb, repo, demo, status}) => {
                                const target = demo || repo;
                                const isClickable = Boolean(target);

                                return (
                                    <motion.article
                                        key={title}
                                        onClick={() =>
                                            isClickable && window.open(target, "_blank", "noopener")
                                        }
                                        role={isClickable ? "link" : undefined}
                                        tabIndex={isClickable ? 0 : undefined}
                                        className={`group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 ${
                                            !isClickable ? "cursor-default" : ""
                                        }`}
                                    >
                                        {/* screenshot */}
                                        <CardImage src={img} alt={`${title} screenshot`}/>

                                        {/* overlay play icon if demo */}
                                        {demo && (
                                            <PlayCircle
                                                className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition group-hover:opacity-90"
                                            />
                                        )}

                                        {/* status badge */}
                                        <span
                                            className="absolute right-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white"
                                        >
                                            {status}
                                        </span>

                                        {/* content */}
                                        <div className="p-6">
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                {title}
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                                                {blurb}
                                            </p>

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

                                            <div className="flex gap-4">
                                                {repo && (
                                                    <a
                                                        href={repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="GitHub repo"
                                                        className="text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                                        onClick={(e) => e.stopPropagation()}
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
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLinkIcon size={20}/>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            }
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
