// src/components/ScrollAnimations.jsx
// Apple-style scroll animations - reveal, parallax, scale, sticky

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// Apple-style scroll-progress-based fade in
// Animates based on scroll position, not just entering viewport
export function ScrollFadeIn({ children, className = "", yOffset = 60 }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.8, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            style={{ opacity: smoothOpacity, y: smoothY }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Apple-style scroll-progress text reveal (word by word)
export function ScrollTextReveal({ text, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const words = text.split(" ");

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return (
                    <ScrollWord
                        key={i}
                        progress={scrollYProgress}
                        range={[start * 0.8, Math.min(end * 0.8 + 0.2, 1)]}
                    >
                        {word}
                    </ScrollWord>
                );
            })}
        </span>
    );
}

function ScrollWord({ children, progress, range }) {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [20, 0]);

    return (
        <motion.span
            style={{ opacity, y }}
            className="inline-block mr-[0.25em]"
        >
            {children}
        </motion.span>
    );
}

// Apple-style stagger based on scroll progress
export function ScrollStagger({ children, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const childCount = Array.isArray(children) ? children.length : 1;

    return (
        <div ref={ref} className={className}>
            {Array.isArray(children)
                ? children.map((child, i) => {
                      const start = (i / childCount) * 0.5;
                      const end = start + 0.5;
                      return (
                          <ScrollStaggerItem
                              key={i}
                              progress={scrollYProgress}
                              range={[start, end]}
                          >
                              {child}
                          </ScrollStaggerItem>
                      );
                  })
                : children}
        </div>
    );
}

function ScrollStaggerItem({ children, progress, range }) {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [40, 0]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

    return (
        <motion.div style={{ opacity: smoothOpacity, y: smoothY }} className="h-full">
            {children}
        </motion.div>
    );
}

// Legacy: Fade in when scrolled into view (pop-in style)
export function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 },
        none: { y: 0, x: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: directions[direction].y,
                x: directions[direction].x,
            }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                x: 0,
            } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Scale up when scrolled into view
export function ScaleIn({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Parallax effect based on scroll position
export function Parallax({ children, speed = 0.5, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const springY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div ref={ref} style={{ y: springY }} className={className}>
            {children}
        </motion.div>
    );
}

// Horizontal scroll section
export function HorizontalScroll({ children, className = "" }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={containerRef} className={`relative h-[300vh] ${className}`}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

// Text reveal animation (word by word)
export function TextReveal({ text, className = "", delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const words = text.split(" ");

    return (
        <motion.span ref={ref} className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.1,
                        ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Character by character reveal
export function CharReveal({ text, className = "", delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.span ref={ref} className={className}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.03,
                        ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Sticky scale section (like Apple product pages)
export function StickyScale({ children, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity, y }}
            className={`sticky top-0 ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Counter animation
export function Counter({ from = 0, to, duration = 2, className = "", suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const count = useSpring(from, {
        stiffness: 50,
        damping: 30,
    });

    if (isInView) {
        count.set(to);
    }

    return (
        <motion.span ref={ref} className={className}>
            <motion.span>
                {count.get().toFixed(0)}
            </motion.span>
            {suffix}
        </motion.span>
    );
}

// Staggered children animation
export function Stagger({ children, delay = 0, staggerDelay = 0.1, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div ref={ref} className={className}>
            {Array.isArray(children)
                ? children.map((child, i) => (
                      <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                              duration: 0.6,
                              delay: delay + i * staggerDelay,
                              ease: [0.21, 0.47, 0.32, 0.98],
                          }}
                      >
                          {child}
                      </motion.div>
                  ))
                : children}
        </motion.div>
    );
}

// Blur in animation
export function BlurIn({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{
                duration: 1,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// 3D tilt on scroll
export function TiltOnScroll({ children, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                scale,
                height: "100%",
                transformPerspective: 1000,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Magnetic hover effect
export function Magnetic({ children, className = "", strength = 0.3 }) {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = "translate(0, 0)";
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-200 ease-out ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Scroll progress indicator
export function ScrollIndicator({ className = "" }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            style={{ scaleX }}
            className={`fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50 ${className}`}
        />
    );
}
