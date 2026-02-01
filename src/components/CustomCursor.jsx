// src/components/CustomCursor.jsx
// Custom cursor with magnetic effect and trailing particles

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trailParticles, setTrailParticles] = useState([]);
    const particleId = useRef(0);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Hide on mobile/touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);

            // Add trail particle occasionally
            if (Math.random() > 0.85) {
                const id = particleId.current++;
                setTrailParticles((prev) => [
                    ...prev.slice(-8),
                    { id, x: e.clientX, y: e.clientY },
                ]);

                // Remove particle after animation
                setTimeout(() => {
                    setTrailParticles((prev) => prev.filter((p) => p.id !== id));
                }, 600);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer") ||
                target.closest(".cursor-pointer")
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);
        document.addEventListener("mouseleave", () => setIsVisible(false));
        document.addEventListener("mouseenter", () => setIsVisible(true));

        // Hide default cursor
        document.body.style.cursor = "none";
        document.querySelectorAll("a, button").forEach((el) => {
            el.style.cursor = "none";
        });

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
            document.body.style.cursor = "";
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Trail particles */}
            <AnimatePresence>
                {trailParticles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0.6, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full bg-blue-500/50"
                        style={{
                            left: particle.x - 4,
                            top: particle.y - 4,
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Main cursor dot */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="relative -left-2 -top-2 w-4 h-4 rounded-full bg-white"
                />
            </motion.div>

            {/* Cursor ring */}
            <motion.div
                className="fixed pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 2 : 1,
                        opacity: isHovering ? 0.5 : 0.3,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative -left-5 -top-5 w-10 h-10 rounded-full border border-white mix-blend-difference"
                />
            </motion.div>
        </>
    );
}
