import {ChevronDown} from "lucide-react";
import {motion} from "framer-motion";

// src/sections/Hero.jsx
export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        >
            {/* animated background blob */}
            <div
                className="absolute inset-0 -z-10 animate-blob bg-gradient-to-br
                   from-blue-600 via-indigo-600 to-cyan-500
                   opacity-30 blur-2xl"
            />

            {/* content */}
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="text-center"
            >
                <h1 className="mb-6 text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                    Hi, I’m <span className="text-blue-600">Ryan</span>
                </h1>
                <p className="mx-auto mb-12 max-w-2xl text-xl md:text-2xl font-medium text-gray-700">
                    Python-savvy developer turning complex ideas into elegant web
                    experiences with React &amp; modern tooling.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="#projects"
                        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow hover:bg-blue-700
                        transition-colors duration-200"
                    >
                        See My Work
                    </a>
                    <a
                        href="/pdfs/Ryan_McCann_Resume_v4.pdf"
                        download="Ryan_McCann_Resume.pdf"
                        target="_blank"
                        className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                        Download CV
                    </a>
                </div>
            </motion.div>

            {/* small down-arrow hint */}
            <a
                href="#about"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 transition
                         hover:text-blue-600"
            >
                <ChevronDown size={36} className="animate-bounce"/>
            </a>
        </section>
    );
}
