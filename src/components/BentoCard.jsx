// src/components/BentoCard.jsx
// Reusable bento card wrapper with tilt effect and hover animations

import { motion } from "framer-motion";
import useTilt from "../hooks/useTilt";

const sizeClasses = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-2 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x2": "col-span-2 row-span-2",
};

const mobileSizeClasses = {
    "1x1": "col-span-1",
    "2x1": "col-span-2 sm:col-span-2",
    "1x2": "col-span-1",
    "2x2": "col-span-2 sm:col-span-2",
};

export default function BentoCard({
    children,
    size = "1x1",
    className = "",
    index = 0,
    disableTilt = false,
}) {
    const tilt = useTilt(4); // Reduced from 6 to 3-4 degrees as per spec

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.1, // Stagger reveal 100ms between cards
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
                y: -4,
                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            }}
            style={disableTilt ? {} : tilt.style}
            onMouseMove={disableTilt ? undefined : tilt.onMouseMove}
            onMouseLeave={disableTilt ? undefined : tilt.onMouseLeave}
            className={`
                ${sizeClasses[size]}
                ${mobileSizeClasses[size]}
                relative overflow-hidden rounded-2xl
                border border-gray-200 dark:border-slate-700
                bg-white dark:bg-slate-800
                p-6
                shadow-sm transition-shadow duration-300
                ${className}
            `}
        >
            {children}
        </motion.div>
    );
}
