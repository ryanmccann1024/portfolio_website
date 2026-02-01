// src/components/FloatingElements.jsx
// Floating 3D geometric shapes that respond to scroll and mouse

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

function FloatingShape({
    children,
    initialX,
    initialY,
    size,
    delay = 0,
    parallaxStrength = 0.5,
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll();

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -200 * parallaxStrength]
    );

    const rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 360 * parallaxStrength]
    );

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                x: initialX,
                y,
                top: initialY,
                rotate,
            }}
            className="absolute pointer-events-none"
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 6 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ width: size, height: size }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function FloatingElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient sphere */}
            <FloatingShape
                initialX="10%"
                initialY="20%"
                size={120}
                delay={0.2}
                parallaxStrength={0.3}
            >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl" />
            </FloatingShape>

            {/* Geometric ring */}
            <FloatingShape
                initialX="80%"
                initialY="30%"
                size={80}
                delay={0.4}
                parallaxStrength={0.5}
            >
                <div className="w-full h-full rounded-full border-2 border-cyan-400/30 dark:border-cyan-400/20" />
            </FloatingShape>

            {/* Small dot cluster */}
            <FloatingShape
                initialX="70%"
                initialY="60%"
                size={60}
                delay={0.6}
                parallaxStrength={0.7}
            >
                <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-purple-400/40" />
                    <div className="absolute top-4 right-0 w-2 h-2 rounded-full bg-blue-400/40" />
                    <div className="absolute bottom-0 left-4 w-4 h-4 rounded-full bg-cyan-400/30" />
                </div>
            </FloatingShape>

            {/* Gradient blur */}
            <FloatingShape
                initialX="15%"
                initialY="70%"
                size={150}
                delay={0.8}
                parallaxStrength={0.4}
            >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-400/10 to-blue-400/10 blur-2xl" />
            </FloatingShape>

            {/* Square outline */}
            <FloatingShape
                initialX="85%"
                initialY="75%"
                size={40}
                delay={1}
                parallaxStrength={0.6}
            >
                <div className="w-full h-full border border-gray-300/30 dark:border-gray-600/30 rotate-45" />
            </FloatingShape>
        </div>
    );
}
