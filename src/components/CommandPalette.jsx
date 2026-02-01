// src/components/CommandPalette.jsx
// Raycast/Linear-style command palette for instant navigation

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Home,
    FileText,
    Briefcase,
    GraduationCap,
    Mail,
    Github,
    Linkedin,
    Download,
    Moon,
    Sun,
    Command,
} from "lucide-react";

const commands = [
    { id: "home", label: "Go Home", icon: Home, action: "navigate", path: "/" },
    { id: "blog", label: "Read Blog", icon: FileText, action: "navigate", path: "/blog" },
    { id: "projects", label: "View Projects", icon: Briefcase, action: "scroll", target: "#projects" },
    { id: "resume", label: "Download Resume", icon: Download, action: "link", url: "https://github.com/ryanmccann1024/portfolio_website/blob/main/public/pdfs/Ryan_McCann_Resume_v4.pdf" },
    { id: "github", label: "Open GitHub", icon: Github, action: "link", url: "https://github.com/ryanmccann1024" },
    { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, action: "link", url: "https://www.linkedin.com/in/ryanjmccann/" },
    { id: "email", label: "Send Email", icon: Mail, action: "link", url: "mailto:ryanjohnmccann@gmail.com" },
    { id: "theme", label: "Toggle Theme", icon: Moon, action: "theme" },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const filteredCommands = useMemo(() => {
        if (!search) return commands;
        const lower = search.toLowerCase();
        return commands.filter(
            (cmd) =>
                cmd.label.toLowerCase().includes(lower) ||
                cmd.id.toLowerCase().includes(lower)
        );
    }, [search]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Open with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            // Close with Escape
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setSearch("");
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const executeCommand = (command) => {
        setIsOpen(false);

        switch (command.action) {
            case "navigate":
                navigate(command.path);
                break;
            case "scroll":
                const el = document.querySelector(command.target);
                el?.scrollIntoView({ behavior: "smooth" });
                break;
            case "link":
                window.open(command.url, "_blank");
                break;
            case "theme":
                document.documentElement.classList.toggle("dark");
                break;
        }
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredCommands.length - 1 ? prev + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredCommands.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    executeCommand(filteredCommands[selectedIndex]);
                }
                break;
        }
    };

    return (
        <>
            {/* Keyboard shortcut hint */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-gray-200 dark:border-slate-700 text-xs text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-lg"
            >
                <Command size={12} />
                <span>K</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Palette */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
                        >
                            <div className="mx-4 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-200 dark:border-slate-700">
                                {/* Search input */}
                                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 px-4 py-3">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a command or search..."
                                        className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
                                    />
                                    <kbd className="hidden sm:block px-2 py-1 rounded bg-gray-100 dark:bg-slate-800 text-xs text-gray-500 dark:text-gray-400">
                                        ESC
                                    </kbd>
                                </div>

                                {/* Commands list */}
                                <div className="max-h-80 overflow-y-auto p-2">
                                    {filteredCommands.length === 0 ? (
                                        <div className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                            No commands found
                                        </div>
                                    ) : (
                                        filteredCommands.map((command, index) => (
                                            <button
                                                key={command.id}
                                                onClick={() => executeCommand(command)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                                                    index === selectedIndex
                                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                                                }`}
                                            >
                                                <command.icon className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm font-medium">
                                                    {command.label}
                                                </span>
                                                {command.action === "link" && (
                                                    <span className="ml-auto text-xs text-gray-400">
                                                        ↗
                                                    </span>
                                                )}
                                            </button>
                                        ))
                                    )}
                                </div>

                                {/* Footer - hidden on mobile */}
                                <div className="hidden sm:flex items-center justify-between border-t border-gray-100 dark:border-slate-800 px-4 py-2 text-xs text-gray-400">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800">↑</kbd>
                                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800">↓</kbd>
                                            navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800">↵</kbd>
                                            select
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
