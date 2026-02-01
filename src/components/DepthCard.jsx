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

    // Custom easing for smooth, modern feel
    const smoothEasing = [0.16, 1, 0.3, 1];

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: smoothEasing }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
                    onClick={onClose}
                >
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: smoothEasing }}
                        className="absolute inset-0 bg-black/70"
                    />

                    {/* Modal container with gradient border */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 0.35, ease: smoothEasing }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-3xl"
                    >
                        {/* Gradient border glow */}
                        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 opacity-60 blur-sm" />
                        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-cyan-500/40" />

                        {/* Modal content */}
                        <div className="relative rounded-3xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/20 overflow-hidden">
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                            {/* Close button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: 0.1, duration: 0.2, ease: smoothEasing }}
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Scrollable content with fade edges */}
                            <div className="max-h-[85vh] modal-scroll">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.3, ease: smoothEasing }}
                                >
                                    {children}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
