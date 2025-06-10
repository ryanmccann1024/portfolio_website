// Updated Hero section with Google Calendar “Book 15‑min Call” CTA
// Replace YOUR_CALENDAR_LINK with the actual link you generate (see instructions in chat)

import {ChevronDown, CalendarClock} from "lucide-react";
import {motion} from "framer-motion";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        >
            {/* animated background blob */}
            <div
                className="absolute inset-0 -z-10 animate-blob
             bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500           /* light */
             dark:bg-gradient-to-br dark:from-purple-800 dark:via-indigo-900 dark:to-black  /* dark */
             opacity-30 blur-2xl"
            />


            {/* content */}
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="text-center"
            >
                <h1 className="mb-6 text-6xl font-extrabold leading-tight tracking-tight md:text-7xl">
                    Hi, I’m <span className="text-blue-600">Ryan</span>
                </h1>
                <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-gray-700 md:text-2xl">
                    Ph.D. ML engineer turning research prototypes into production‑grade, low‑latency systems, available
                    remote in EU or USA‑friendly hours.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="#projects"
                        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-700"
                    >
                        See My Work
                    </a>
                    <a
                        href="https://calendar.app.google/4bMPH4qCikwpEwpD7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-green-600 px-8 py-3 font-semibold text-green-600 transition-colors duration-200 hover:bg-green-50"
                    >
                        <CalendarClock size={18}/> Book 15‑min Call
                    </a>
                    <a
                        href="/pdfs/Ryan_McCann_Resume_v4.pdf"
                        download="Ryan_McCann_Resume.pdf"
                        target="_blank"
                        className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
                    >
                        Download CV
                    </a>
                </div>
            </motion.div>

            {/* small down-arrow hint */}
            <a
                href="#about"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 transition hover:text-blue-600"
            >
                <ChevronDown size={36} className="animate-bounce"/>
            </a>
        </section>
    );
}
