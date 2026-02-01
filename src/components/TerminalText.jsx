// src/components/TerminalText.jsx
// Terminal-style text with blinking cursor and optional typing effect

import { useState, useEffect } from "react";

export function TerminalPrompt({ command, children }) {
    return (
        <div className="font-mono text-sm">
            <span className="text-terminal-green dark:text-terminal-green">$ </span>
            <span className="text-gray-600 dark:text-gray-400">{command}</span>
            {children && (
                <div className="mt-1 text-gray-800 dark:text-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
}

export function TerminalTyping({ text, speed = 80, delay = 0 }) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                    setIsTypingComplete(true);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, delay]);

    return (
        <span className="font-mono text-sm">
            <span className="text-gray-800 dark:text-gray-200">{displayText}</span>
            <span
                className={`ml-0.5 inline-block w-2 h-4 bg-terminal-green align-middle ${
                    isTypingComplete ? "terminal-cursor" : ""
                }`}
            />
        </span>
    );
}

export function TerminalOutput({ lines }) {
    return (
        <div className="font-mono text-sm space-y-0.5">
            {lines.map((line, i) => (
                <div key={i} className="text-gray-700 dark:text-gray-300">
                    <span className="text-terminal-green mr-2">&gt;</span>
                    {line}
                </div>
            ))}
        </div>
    );
}

export function TerminalMenu({ items }) {
    return (
        <div className="font-mono text-sm space-y-1">
            {items.map((item, i) => (
                <a
                    key={i}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-terminal-green dark:hover:text-terminal-green transition-colors"
                >
                    <span className="text-terminal-green">&gt;</span>
                    {item.label}
                </a>
            ))}
        </div>
    );
}
