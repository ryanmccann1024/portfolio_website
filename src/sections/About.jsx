// About section with 3D tilt cards and enhanced animations
// Ryan McCann – Portfolio Revamp

import { motion } from "framer-motion";
import { Award, Globe, Zap } from "lucide-react";
import useTilt from "../hooks/useTilt";
import { staggerContainer, staggerItem, customEasing } from "../constants/animations";

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
        label: "25% Faster",
        detail: "RL‑routed optical networks",
    },
];

/* ── TILT CARD COMPONENT ────────────────────────────────── */
function TiltCard({ icon: Icon, label, detail }) {
    const tilt = useTilt(5);

    return (
        <div
            style={tilt.style}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/80 to-white px-5 py-6 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-600 dark:from-slate-800/80 dark:to-slate-800"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{label}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{detail}</p>
            </div>
        </div>
    );
}

/* ── ABOUT COMPONENT ───────────────────────────────────── */
export default function About() {
    return (
        <section id="about" className="bg-white py-24 dark:bg-slate-800">
            <div className="mx-auto max-w-4xl px-4">
                {/* Heading with blur-to-sharp */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: customEasing }}
                    className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 font-display"
                >
                    About Me
                </motion.h2>

                {/* Content grid with avatar placeholder and narrative */}
                <div className="mb-12 grid gap-8 md:grid-cols-[auto_1fr]">
                    {/* Avatar placeholder - add your stylized avatar here */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: customEasing }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-5xl font-bold text-white shadow-lg md:mx-0 md:h-40 md:w-40"
                    >
                        RM
                    </motion.div>

                    {/* Narrative - broken into scannable chunks */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: customEasing }}
                        className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                    >
                        <p className="mb-4">
                            Hey, I'm <strong className="text-gray-900 dark:text-white">Ryan McCann</strong> – a machine‑learning engineer who turns research prototypes into production‑grade, low‑latency systems.
                        </p>
                        <p className="mb-4">
                            Backed by a full fellowship, I'm completing a Ph.D. in Computer Engineering while leading <em className="text-blue-600 dark:text-blue-400">FUSION</em>, an open‑source optical‑network RL simulator with 10+ GitHub stars and an NSF POSE grant under review.
                        </p>
                        <p className="mb-0 text-base text-gray-600 dark:text-gray-400">
                            Off hours you'll find me teaching third‑graders math, contributing to sustainability projects, or hiking Colombia's highlands.
                        </p>
                    </motion.div>
                </div>

                {/* Quick-facts grid with stagger */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {facts.map(({ icon, label, detail }) => (
                        <motion.div key={label} variants={staggerItem}>
                            <TiltCard icon={icon} label={label} detail={detail} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
