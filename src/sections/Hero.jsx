// Hero section with particles, animated text, and magnetic buttons
// Ryan McCann – Portfolio Revamp

import { ChevronDown, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ParticleBackground from "../components/Particles";
import MagneticButton from "../components/MagneticButton";
import { customEasing } from "../constants/animations";

// Rotating taglines for typing effect
const taglines = [
    "ML Engineer",
    "RL Researcher",
    "Open-Source Builder",
];

// Letter animation component
function AnimatedLetters({ text, className }) {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: i * 0.04,
                        duration: 0.4,
                        ease: customEasing,
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

// Typing effect component
function TypewriterText({ words }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentIndex];
        const timeout = isDeleting ? 50 : 80;

        if (!isDeleting && displayText === currentWord) {
            // Pause at end of word
            const pauseTimeout = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(pauseTimeout);
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timer = setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentWord.slice(0, prev.length + 1)
            );
        }, timeout);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentIndex, words]);

    return (
        <span className="inline-flex items-center">
            <span className="text-blue-600 dark:text-blue-400">{displayText}</span>
            <span className="ml-1 animate-blink text-blue-600 dark:text-blue-400">|</span>
        </span>
    );
}

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-20 sm:py-0"
        >
            {/* Particle background */}
            <ParticleBackground />

            {/* Multiple animated background blobs for more dynamic feel */}
            <div
                className="absolute inset-0 -z-10 animate-blob
                    bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500
                    dark:from-purple-800 dark:via-indigo-900 dark:to-black
                    opacity-25 blur-3xl"
            />
            <div
                className="absolute -left-1/4 top-1/4 h-64 w-64 sm:h-96 sm:w-96 -z-10 animate-blob2
                    bg-gradient-to-br from-purple-500 to-pink-500
                    dark:from-blue-800 dark:to-purple-900
                    opacity-20 blur-3xl rounded-full"
            />
            <div
                className="absolute -right-1/4 bottom-1/4 h-56 w-56 sm:h-80 sm:w-80 -z-10 animate-blob3
                    bg-gradient-to-br from-cyan-400 to-blue-500
                    dark:from-indigo-800 dark:to-cyan-900
                    opacity-20 blur-3xl rounded-full"
            />

            {/* Content */}
            <div className="text-center max-w-4xl mx-auto">
                {/* Staggered heading reveal */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight font-display"
                >
                    <AnimatedLetters text="Hi, I'm " className="text-gray-900 dark:text-gray-50" />
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35, duration: 0.5, ease: customEasing }}
                        className="inline-block bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-gradient-text"
                    >
                        Ryan
                    </motion.span>
                </motion.h1>

                {/* Rotating tagline with typing effect */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: customEasing }}
                    className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-semibold"
                >
                    <TypewriterText words={taglines} />
                </motion.p>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.6, duration: 0.5, ease: customEasing }}
                    className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 px-2"
                >
                    Ph.D. ML engineer turning research prototypes into production‑grade, low‑latency systems.
                </motion.p>

                {/* Magnetic CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.5, ease: customEasing }}
                    className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row sm:flex-wrap"
                >
                    <MagneticButton strength={0.2}>
                        <a
                            href="#projects"
                            className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            See My Work
                        </a>
                    </MagneticButton>

                    <MagneticButton strength={0.2}>
                        <a
                            href="https://calendar.app.google/4bMPH4qCikwpEwpD7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border-2 border-green-600 bg-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-green-600 shadow-lg transition-all duration-200 hover:bg-green-50 hover:shadow-xl hover:-translate-y-0.5 dark:bg-transparent dark:hover:bg-green-900/20"
                        >
                            <CalendarClock size={16} className="sm:w-[18px] sm:h-[18px]" /> Book a Call
                        </a>
                    </MagneticButton>

                    <MagneticButton strength={0.2}>
                        <a
                            href="/pdfs/Ryan_McCann_Resume.pdf"
                            download="Ryan_McCann_Resume.pdf"
                            target="_blank"
                            className="inline-block rounded-lg border-2 border-blue-600 bg-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-blue-600 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5 dark:bg-transparent dark:hover:bg-blue-900/20"
                        >
                            Download CV
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 text-gray-500 transition hover:text-blue-600"
            >
                <ChevronDown size={28} className="sm:w-9 sm:h-9 animate-bounce" />
            </motion.a>
        </section>
    );
}
