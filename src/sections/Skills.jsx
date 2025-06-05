// src/sections/Skills.jsx
const skillGroups = [
    {
        heading: "Languages",
        skills: [
            {name: "Python", level: 95},
            {name: "TypeScript", level: 80},
            {name: "JavaScript", level: 85},
            {name: "Bash", level: 75},
        ],
    },
    {
        heading: "Frameworks / Libraries",
        skills: [
            {name: "React", level: 90},
            {name: "Tailwind CSS", level: 85},
            {name: "D3.js", level: 70},
            {name: "FastAPI", level: 80},
        ],
    },
    {
        heading: "Tools & Platforms",
        skills: [
            {name: "Git & GitHub", level: 90},
            {name: "Docker", level: 75},
            {name: "SLURM / HPC", level: 70},
            {name: "Netlify / Vercel", level: 80},
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="bg-white py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-12 text-3xl font-bold tracking-tight">Skills</h2>

                <div className="grid gap-12 sm:grid-cols-2">
                    {skillGroups.map(({heading, skills}) => (
                        <div key={heading}>
                            <h3 className="mb-4 text-lg font-semibold">{heading}</h3>

                            <ul className="space-y-4">
                                {skills.map(({name, level}) => (
                                    <li key={name}>
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span>{name}</span>
                                            <span className="text-gray-500 dark:text-gray-400">
                        {level}%
                      </span>
                                        </div>

                                        {/* progress bar */}
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700">
                                            <div
                                                className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                                                style={{width: `${level}%`}}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
