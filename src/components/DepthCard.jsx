// src/components/DepthCard.jsx
// 3D depth card with parallax layers and expand-to-detail functionality

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export default function DepthCard({
    children,
    className = "",
    expandedContent,
    glowColor = "blue",
    disabled = false,
}) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Mouse position for 3D effect
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Spring physics for smooth movement
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

    // Parallax for inner elements
    const translateX = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);
    const translateY = useSpring(useTransform(mouseY, [0, 1], [-10, 10]), springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current || disabled) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
        setIsHovered(false);
    };

    const glowColors = {
        blue: "from-blue-500/20 via-cyan-500/10",
        purple: "from-purple-500/20 via-pink-500/10",
        green: "from-emerald-500/20 via-teal-500/10",
        orange: "from-orange-500/20 via-amber-500/10",
    };

    return (
        <>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={() => expandedContent && setIsExpanded(true)}
                style={{
                    rotateX: disabled ? 0 : rotateX,
                    rotateY: disabled ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                    transformPerspective: 1200,
                }}
                whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                    relative overflow-hidden rounded-2xl
                    bg-white dark:bg-slate-800/80
                    backdrop-blur-sm
                    border border-gray-200/50 dark:border-slate-700/50
                    shadow-lg dark:shadow-2xl dark:shadow-black/20
                    ${expandedContent ? "cursor-pointer" : ""}
                    ${className}
                `}
            >
                {/* Animated gradient glow on hover */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${glowColors[glowColor]} to-transparent opacity-0 transition-opacity duration-500`}
                    style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Parallax content wrapper */}
                <motion.div
                    style={{
                        x: disabled ? 0 : translateX,
                        y: disabled ? 0 : translateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative z-10 h-full"
                >
                    {children}
                </motion.div>

                {/* Shine effect on hover */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        background: "radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.08), transparent 40%)",
                    }}
                />

            </motion.div>

            {/* Expanded overlay */}
            {expandedContent && (
                <ExpandedView
                    isOpen={isExpanded}
                    onClose={() => setIsExpanded(false)}
                >
                    {expandedContent}
                </ExpandedView>
            )}
        </>
    );
}

function ExpandedView({ isOpen, onClose, children }) {
    // Prevent body scroll when modal is open & handle Escape key
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const handleEscape = (e) => {
                if (e.key === "Escape") onClose();
            };
            window.addEventListener("keydown", handleEscape);
            return () => {
                document.body.style.overflow = "";
                window.removeEventListener("keydown", handleEscape);
            };
        }
    }, [isOpen, onClose]);

    // Use portal to render modal at document body level
    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
