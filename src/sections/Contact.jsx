// Contact section with magnetic social icons
// Ryan McCann – Portfolio Revamp

import { Mail, Linkedin, Github, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import { staggerContainer, staggerItem, customEasing } from "../constants/animations";

/* ── SOCIAL LINKS ─────────────────────────────────────── */
const socials = [
    {
        icon: CalendarClock,
        label: "15‑min Call",
        url: "https://calendar.app.google/4bMPH4qCikwpEwpD7",
        color: "bg-green-600 hover:bg-green-700 dark:bg-green-500/20 dark:hover:bg-green-500/40",
    },
    {
        icon: Mail,
        label: "Email",
        url: "mailto:ryanjohnmccann@gmail.com?subject=Project%20Inquiry&body=Hi%20Ryan,",
        color: "bg-red-500 hover:bg-red-600 dark:bg-red-500/20 dark:hover:bg-red-500/40",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ryanjmccann/",
        color: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500/20 dark:hover:bg-blue-500/40",
    },
    {
        icon: Github,
        label: "GitHub",
        url: "https://github.com/ryanmccann1024",
        color: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-500/20 dark:hover:bg-gray-500/40",
    },
];

/* ── COMPONENT ───────────────────────────────────────── */
export default function Contact() {
    return (
        <section id="contact" className="bg-gray-50 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-lg px-4 text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: customEasing }}
                    className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 font-display"
                >
                    Let's Connect
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: customEasing }}
                    className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-400"
                >
                    Ready to discuss optical networks, RL, or your next project? Pick a slot or drop me a note — I reply within one business day.
                </motion.p>

                {/* Social icon buttons with magnetic effect */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-12 flex justify-center gap-6"
                >
                    {socials.map(({ icon: Icon, label, url, color }) => (
                        <motion.div key={label} variants={staggerItem}>
                            <MagneticButton strength={0.4}>
                                <a
                                    href={url}
                                    target={url.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${color}`}
                                >
                                    <Icon size={24} />
                                </a>
                            </MagneticButton>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Email text link */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: customEasing }}
                    className="text-sm text-gray-500 dark:text-gray-400"
                >
                    or email directly at{" "}
                    <a
                        href="mailto:ryanjohnmccann@gmail.com"
                        className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition hover:decoration-blue-600 dark:text-blue-400"
                    >
                        ryanjohnmccann@gmail.com
                    </a>
                </motion.p>
            </div>
        </section>
    );
}
