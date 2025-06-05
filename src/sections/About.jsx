// src/sections/About.jsx
import {motion} from "framer-motion";
import {
    Award,
    Briefcase,
    Globe,
    Zap,
    ScrollText,
    Users,
} from "lucide-react";

const facts = [
    {
        icon: Award,
        label: "Full Fellow­ship",
        detail: "M.S. & Ph.D. fully funded",
    },
    {
        icon: Briefcase,
        label: "5+ Years",
        detail: "Hands-on coding & research",
    },
    {
        icon: ScrollText,
        label: "3 Publications",
        detail: "IEEE & Elsevier Optical Net.",
    },
    {
        icon: Globe,
        label: "Spanish C1",
        detail: "Self-taught, work-ready",
    },
    {
        icon: Users,
        label: "Team Lead",
        detail: "5 devs • OSS simulator v6",
    },
    {
        icon: Zap,
        label: "35 % Boost",
        detail: "Disaster RL resilience gain",
    },
];

export default function About() {
    return (
        <section id="about" className="bg-white py-24 dark:bg-slate-700">
            <div className="mx-auto max-w-4xl px-4">
                {/* heading */}
                <motion.h2
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4}}
                    className="mb-8 text-4xl font-extrabold tracking-tight
                     text-gray-900 dark:text-gray-50"
                >
                    About Me
                </motion.h2>

                {/* narrative */}
                <motion.p
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.1}}
                    className="mb-12 text-lg leading-relaxed text-gray-800 dark:text-gray-200"
                >
                    I’m a Python-first researcher who turns cutting-edge reinforcement-learning
                    ideas into production-ready optical-network tools. I lead the open-source
                    <em>Optical Simulator v6</em> project, collaborate with the Podman HPC team,
                    and hold a full fellowship to pursue combined M.S./Ph.D. studies at UMass
                    Lowell. When I’m not coding, I sharpen my Spanish (C1) and French on Duolingo,
                    or binge MIT & Berkeley open courses to stay ahead of the curve.
                </motion.p>

                {/* quick-facts grid */}
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.2}}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {facts.map(({icon: Icon, label, detail}) => (
                        <div
                            key={label}
                            className="flex items-center gap-4 rounded-lg border border-gray-200
                         bg-blue-50/40 px-4 py-5 transition
                         hover:shadow-md dark:border-slate-700 dark:bg-slate-800/40"
                        >
                            <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400"/>
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {label}
                                </p>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
