// src/components/SkillBars.jsx
// Animated skill progress bars with ASCII-style display

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const skills = [
    { name: "Python", level: 95 },
    { name: "PyTorch", level: 90 },
    { name: "RL", level: 85 },
    { name: "Go", level: 70 },
    { name: "React", level: 75 },
];

function SkillBar({ name, level, animate }) {
    const totalBlocks = 10;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    return (
        <div className="flex items-center gap-3 font-mono text-sm">
            <span className="w-16 text-gray-700 dark:text-gray-300 text-right">
                {name}
            </span>
            <div className="flex-1 flex items-center gap-1">
                <span className="text-terminal-green">[</span>
                <div className="flex gap-px">
                    {Array.from({ length: totalBlocks }).map((_, i) => (
                        <span
                            key={i}
                            className={`w-3 h-3 transition-all duration-75 ${
                                animate && i < filledBlocks
                                    ? "bg-terminal-green"
                                    : "bg-gray-200 dark:bg-slate-600"
                            }`}
                            style={{
                                transitionDelay: animate ? `${i * 80}ms` : "0ms",
                            }}
                        />
                    ))}
                </div>
                <span className="text-terminal-green">]</span>
            </div>
        </div>
    );
}

export default function SkillBars() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => setAnimate(true), 100);
            return () => clearTimeout(timeout);
        }
    }, [isInView]);

    return (
        <div ref={ref} className="space-y-2">
            {skills.map((skill) => (
                <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    animate={animate}
                />
            ))}
        </div>
    );
}
