// src/components/ContactSection.jsx
// Clean contact section matching site style

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { ScrollTextReveal, ScrollStagger, TiltOnScroll } from "./ScrollAnimations";

const contacts = [
    {
        icon: Github,
        label: "GitHub",
        value: "@ryanmccann1024",
        href: "https://github.com/ryanmccann1024",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "ryanjmccann",
        href: "https://www.linkedin.com/in/ryanjmccann/",
    },
    {
        icon: Mail,
        label: "Email",
        value: "ryanjohnmccann@gmail.com",
        href: "mailto:ryanjohnmccann@gmail.com",
    },
];

export default function ContactSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="py-16 sm:py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="mb-10 sm:mb-16 lg:mb-20 text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white font-display">
                        <ScrollTextReveal text="Let's Connect" />
                    </h2>
                </motion.div>

                {/* Contact cards */}
                <ScrollStagger className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
                    {contacts.map((contact) => (
                        <TiltOnScroll key={contact.label}>
                            <a
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block h-full p-4 sm:p-5 lg:p-6 bg-white dark:bg-slate-800/80 border border-gray-200/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3 sm:mb-4">
                                    <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" />
                                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                                    {contact.label}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-all">
                                    {contact.value}
                                </p>
                            </a>
                        </TiltOnScroll>
                    ))}
                </ScrollStagger>
            </div>
        </section>
    );
}
