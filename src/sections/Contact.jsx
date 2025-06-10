// Updated Contact section – adds 15‑min calendar CTA, consistent styling, a11y focus ring
// Replace abc-def-ghi with your actual Google Calendar booking link.
// Ryan McCann – June 2025

import {Mail, Linkedin, Github, CalendarClock} from "lucide-react";
import {motion} from "framer-motion";

/* ── SOCIAL LINKS ─────────────────────────────────────── */
const socials = [
    {
        icon: CalendarClock,
        label: "15‑min Call",
        url: "https://calendar.app.google/abc-def-ghi", // <- paste real link
    },
    {
        icon: Mail,
        label: "Email",
        url: "mailto:ryanjohnmccann@gmail.com?subject=Project%20Inquiry&body=Hi%20Ryan,",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ryanjmccann/",
    },
    {
        icon: Github,
        label: "GitHub",
        url: "https://github.com/ryanmccann1024",
    },
];

/* ── COMPONENT ───────────────────────────────────────── */
export default function Contact() {
    return (
        <section id="contact" className="bg-gray-50 py-24 dark:bg-slate-700">
            <div className="mx-auto max-w-lg px-4 text-center">
                {/* heading */}
                <motion.h2
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4}}
                    className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50"
                >
                    Let’s Connect
                </motion.h2>

                {/* subtitle */}
                <motion.p
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.1}}
                    className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                >
                    Ready to discuss optical networks, RL, or remote‑team strategy? Pick a slot or drop me a note, I
                    reply within one business day.
                </motion.p>

                {/* social icon buttons */}
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.2}}
                    className="mb-12 flex justify-center gap-8"
                >
                    {socials.map(({icon: Icon, label, url}) => (
                        <a
                            key={label}
                            href={url}
                            target={url.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="rounded-full p-3 transition hover:scale-110 bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/40"
                        >
                            <Icon size={28}/>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
