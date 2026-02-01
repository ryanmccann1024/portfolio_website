// src/components/TimelineHorizontal.jsx
// Horizontal education timeline with ASCII connectors (desktop) / vertical (mobile)

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const educationItems = [
    {
        degree: "B.S.E.",
        field: "Computer Engineering",
        year: "2018-2022",
        highlight: "3.9 GPA",
        detail: "Magna Cum Laude",
    },
    {
        degree: "M.S.E.",
        field: "Computer Engineering",
        year: "2022-2023",
        highlight: "18 mos",
        detail: "Accelerated",
    },
    {
        degree: "Ph.D.",
        field: "Computer Engineering",
        year: "2024-2028",
        highlight: "Fellowship",
        detail: "Full Funding",
    },
];

function TimelineItem({ item, index, animate }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animate ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="flex flex-col items-center text-center"
        >
            <div className="w-3 h-3 rounded-full bg-terminal-green mb-2" />
            <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                {item.degree}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {item.year}
            </span>
            <span className="text-sm font-medium text-terminal-green">
                {item.highlight}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
                {item.detail}
            </span>
        </motion.div>
    );
}

function TimelineMobileItem({ item, index, animate, isLast }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={animate ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="flex items-start gap-4"
        >
            <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-terminal-green" />
                {!isLast && (
                    <div className="w-px h-12 bg-gray-300 dark:bg-slate-600" />
                )}
            </div>
            <div className="pb-4">
                <span className="font-display font-bold text-base text-gray-900 dark:text-white">
                    {item.degree}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {item.year}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-medium text-terminal-green">
                        {item.highlight}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        {item.detail}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function TimelineHorizontal() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref}>
            {/* Desktop: horizontal layout */}
            <div className="hidden sm:block">
                <div className="relative">
                    {/* ASCII connector line */}
                    <div className="absolute top-[6px] left-[10%] right-[10%] flex items-center justify-center">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-px w-full bg-gray-300 dark:bg-slate-600 origin-left"
                        />
                    </div>
                    {/* Timeline items */}
                    <div className="relative flex justify-between">
                        {educationItems.map((item, i) => (
                            <TimelineItem
                                key={item.degree}
                                item={item}
                                index={i}
                                animate={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile: vertical layout */}
            <div className="sm:hidden">
                {educationItems.map((item, i) => (
                    <TimelineMobileItem
                        key={item.degree}
                        item={item}
                        index={i}
                        animate={isInView}
                        isLast={i === educationItems.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}
