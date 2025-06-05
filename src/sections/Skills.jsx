// src/sections/Skills.jsx
const skillGroups = {
    Languages: ["Python", "TypeScript", "JavaScript", "Bash"],
    Frameworks: ["React", "Tailwind CSS", "D3.js", "FastAPI"],
    Tools: ["Git/GitHub", "Docker", "SLURM", "Netlify", "Vercel"],
};

export default function Skills() {
    return (
        <section id="skills" className="bg-white py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-12 text-3xl font-bold tracking-tight">Skills</h2>

                <div className="space-y-10">
                    {Object.entries(skillGroups).map(([group, skills]) => (
                        <div key={group}>
                            <h3 className="mb-4 text-lg font-semibold">{group}</h3>

                            <div className="flex flex-wrap gap-3">
                                {skills.map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-full border border-blue-600/30
                               bg-blue-50 px-3 py-1 text-sm text-blue-700
                               dark:border-blue-400/30 dark:bg-blue-900/30 dark:text-blue-300"
                                    >
                    {s}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
