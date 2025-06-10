// Revamped About section – tighter brand message + remote-readiness cues
// Ryan McCann – June 2025

import {motion} from "framer-motion";
import {
    Award,
    Star,
    Globe,
    Users,
    Zap,
    Clock,
} from "lucide-react";

/* ── QUICK FACTS ───────────────────────────────────────── */
const facts = [
    {
        icon: Award,
        label: "Full Fellowship",
        detail: "M.S. + Ph.D. fully funded (3.7 GPA)",
    },

    {
        icon: Globe,
        label: "Spanish C1",
        detail: "Papers presented in Colombia",
    },
    {
        icon: Zap,
        label: "25 % Faster",
        detail: "RL‑routed optical networks",
    },
];

/* ── ABOUT COMPONENT ───────────────────────────────────── */
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
                    className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50"
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
                    Hey, I’m <strong>Ryan McCann</strong>, a machine‑learning engineer who turns research prototypes
                    into
                    production‑grade, low‑latency systems. Backed by a full fellowship, I’m completing a Ph.D. in
                    Computer
                    Engineering while leading <em>FUSION</em>, an open‑source optical‑network RL simulator with 10
                    GitHub stars
                    and an NSF POSE grant under review. I ship code with globally distributed teams: from implementing
                    Wi‑Fi
                    6 test cycles at Zebra Technologies to prototyping GPU‑aware scheduling for Red Hat’s Podman HPC
                    extensions. Fluent
                    in Spanish (C1) and happiest when a CI pipeline green‑checks under 5 minutes, I publish at IEEE
                    conferences, mentor junior devs, and believe in open knowledge. Off hours you’ll find me
                    teaching third‑graders math, contributing to sustainability projects, or hiking Colombia's
                    4,000‑footers.
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
                            className="flex items-center gap-4 rounded-lg border border-gray-200 bg-blue-50/40 px-4 py-5 transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800/40"
                        >
                            <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400"/>
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{label}</p>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{detail}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
