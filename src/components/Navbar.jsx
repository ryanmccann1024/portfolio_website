// src/components/Navbar.jsx
// Minimal, premium navbar with smooth animations

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    // Theme toggle
    const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [dark, setDark] = useState(
        document.documentElement.classList.contains("dark") || prefersDark
    );

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (y) => {
            setScrolled(y > 20);
        });
        return () => unsubscribe();
    }, [scrollY]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const close = () => setOpen(false);

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <nav className="mx-auto max-w-6xl px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            onClick={close}
                            className="text-lg font-bold tracking-tight text-gray-900 dark:text-white font-display hover:opacity-70 transition-opacity"
                        >
                            RM
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-8">
                            <NavLink
                                to="/blog"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    }`
                                }
                            >
                                Blog
                            </NavLink>
                            <a
                                href="https://github.com/ryanmccann1024/portfolio_website/blob/main/public/pdfs/Ryan_McCann_Resume_v4.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Resume
                            </a>

                            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

                            <div className="flex items-center gap-4">
                                <a
                                    href="https://github.com/ryanmccann1024"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <Github size={18} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ryanjmccann/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <Linkedin size={18} />
                                </a>
                                <a
                                    href="mailto:ryanjohnmccann@gmail.com"
                                    aria-label="Email"
                                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <Mail size={18} />
                                </a>
                            </div>

                            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />

                            <button
                                onClick={() => setDark((d) => !d)}
                                aria-label="Toggle theme"
                                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                {dark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                onClick={() => setDark((d) => !d)}
                                aria-label="Toggle theme"
                                className="p-2 text-gray-500 dark:text-gray-400"
                            >
                                {dark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button
                                onClick={() => setOpen(true)}
                                aria-label="Open menu"
                                className="p-2 text-gray-500 dark:text-gray-400"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-2xl md:hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Menu
                                </span>
                                <button
                                    onClick={close}
                                    aria-label="Close menu"
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="p-4 space-y-2">
                                <NavLink
                                    to="/blog"
                                    onClick={close}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                                        }`
                                    }
                                >
                                    Blog
                                </NavLink>
                                <a
                                    href="https://github.com/ryanmccann1024/portfolio_website/blob/main/public/pdfs/Ryan_McCann_Resume_v4.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Resume
                                </a>
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
