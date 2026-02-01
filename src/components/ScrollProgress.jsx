// src/components/ScrollProgress.jsx
// Smooth scroll progress indicator at the top of the page

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-gray-900 dark:bg-white origin-left z-[60]"
            style={{ scaleX }}
        />
    );
}
