// src/sections/About.jsx
export default function About() {
    return (
        <section
            id="about"
            className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
        >
            {/* heading */}
            <h2 className="mb-8 text-3xl font-bold tracking-tight">About Me</h2>

            {/* narrative */}
            <p className="mb-12 text-gray-700 dark:text-gray-300">
                I’m a Python-first developer who thrives on turning research-grade ideas
                into production-ready solutions. Recently I’ve been translating my deep
                reinforcement-learning expertise into React-driven front-ends so teams
                can <em>see</em> and trust the intelligence behind the code. Outside of
                work I mentor students, contribute to open-source optical-network
                simulators, and chase perfect espresso shots.
            </p>

            {/* quick-facts grid */}
            <div className="grid gap-6 sm:grid-cols-3">
                {/* Years of experience */}
                <div
                    className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="block text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            5+
          </span>
                    <span className="mt-1 block text-sm font-medium text-gray-600 dark:text-gray-400">
            Years Coding
          </span>
                </div>

                {/* Key technologies */}
                <div
                    className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="block text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            12
          </span>
                    <span className="mt-1 block text-sm font-medium text-gray-600 dark:text-gray-400">
            Core Techs
          </span>
                </div>

                {/* Projects delivered */}
                <div
                    className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="block text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            25+
          </span>
                    <span className="mt-1 block text-sm font-medium text-gray-600 dark:text-gray-400">
            Projects Ship­ped
          </span>
                </div>
            </div>
        </section>
    );
}
