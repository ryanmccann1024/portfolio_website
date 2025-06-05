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
                   from-blue-400 via-fuchsia-500 to-amber-400
                   opacity-30 blur-2xl"
            />

            {/* content */}
            <div className="text-center">
                <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                    Hi, I’m <span className="text-blue-600 dark:text-blue-400">Ryan</span>
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                    Python-savvy developer turning complex ideas into elegant web
                    experiences with React &amp; modern tooling.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="#projects"
                        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        See My Work
                    </a>
                    <a
                        href="/RyanM_Resume.pdf"
                        target="_blank"
                        className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800"
                    >
                        Download CV
                    </a>
                </div>
            </div>

            {/* small down-arrow hint */}
            <a
                href="#about"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-blue-600"
            >
                ↓
            </a>
        </section>
    );
}
