// src/components/HeroSection.jsx
// Clean two-column hero with interactive terminal

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Interactive Terminal with initial content
function InteractiveTerminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: "command", content: "cat about.txt" },
        { type: "output", content: "Software Engineer\nProduct Builder\nOSS Enthusiast" },
        { type: "command", content: "echo $FOCUS" },
        { type: "output", content: '"Shipping code, one commit at a time"' },
    ]);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    const commands = {
        help: () => "Commands: about, skills, links, clear",
        about: () => "Software Engineer. Product Builder. OSS Enthusiast.",
        skills: () => "Python · C++ · Linux · Git",
        links: () => "github.com/ryanmccann1024\nlinkedin.com/in/ryanjmccann",
        clear: () => null,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.toLowerCase().trim();
        setHistory(prev => [...prev, { type: "command", content: input }]);

        if (cmd === "clear") {
            setHistory([]);
        } else if (commands[cmd]) {
            const output = commands[cmd]();
            if (output) {
                setHistory(prev => [...prev, { type: "output", content: output }]);
            }
        } else {
            setHistory(prev => [...prev, { type: "error", content: `command not found: ${cmd}` }]);
        }

        setInput("");
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div
            className="bg-[#1e1e2e] rounded-xl overflow-hidden border border-[#313244] shadow-2xl w-[480px]"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-[#313244]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
                    <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                    <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
                </div>
                <span className="flex-1 text-center text-xs text-[#6c7086] font-mono">~/ryan</span>
            </div>

            {/* Content */}
            <div ref={terminalRef} className="p-4 font-mono text-sm leading-relaxed h-[280px] overflow-y-auto">
                {history.map((item, i) => (
                    <div key={i} className="mb-2">
                        {item.type === "command" && (
                            <div>
                                <span className="text-[#a6e3a1]">❯ </span>
                                <span className="text-[#cdd6f4]">{item.content}</span>
                            </div>
                        )}
                        {item.type === "output" && (
                            <div className="text-[#89b4fa] whitespace-pre-wrap">{item.content}</div>
                        )}
                        {item.type === "error" && (
                            <div className="text-[#f38ba8]">{item.content}</div>
                        )}
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-[#a6e3a1]">❯ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent text-[#cdd6f4] outline-none ml-1 placeholder:text-[#6c7086]"
                        placeholder="type 'help' for commands"
                        spellCheck={false}
                    />
                </form>
            </div>
        </div>
    );
}

export default function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    return (
        <section ref={containerRef} className="relative min-h-[140vh]">
            <motion.div
                style={{ opacity, y }}
                className="sticky top-0 min-h-screen flex items-center"
            >
                <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                        {/* Left - Text */}
                        <div className="flex-1 max-w-2xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight leading-[1.1]"
                            >
                                I'm Ryan
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
                            >
                                Software engineer who loves<br />
                                <span className="text-emerald-500 dark:text-emerald-400 font-medium">
                                    open source
                                </span>.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="flex items-center gap-4"
                            >
                                <a
                                    href="#projects"
                                    className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-base font-semibold hover:opacity-90 transition"
                                >
                                    View Projects
                                </a>
                                <a
                                    href="https://github.com/ryanmccann1024/portfolio_website/blob/main/public/pdfs/Ryan_McCann_Resume_v4.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-base font-semibold hover:opacity-90 transition"
                                >
                                    Resume
                                </a>
                            </motion.div>

                        </div>

                        {/* Right - Terminal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="flex-shrink-0"
                        >
                            <InteractiveTerminal />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                </motion.div>
            </motion.div>
        </section>
    );
}
