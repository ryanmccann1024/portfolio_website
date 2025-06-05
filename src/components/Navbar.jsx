// src/components/Navbar.jsx
import {useState, useEffect} from "react";
import {Moon, Sun} from "lucide-react";
import {motion} from "framer-motion";

export default function Navbar() {
    const getInitialDark = () => {
        if (typeof document !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    };

    const [dark, setDark] = useState(getInitialDark);
    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [dark]);


    const toggleTheme = () => setDark((prev) => !prev);

    return (
        <motion.header
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="fixed inset-x-0 top-0 z-20 bg-white/70 backdrop-blur dark:bg-slate-900/70"
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* ------ Logo / name ------ */}
                <a href="#hero" className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
                    Ryan M.
                </a>

                {/* ------ Desktop links ------ */}
                <ul className="hidden gap-10 text-sm font-medium md:flex">
                    {["About", "Projects", "Experience & Education", "Skills", "Contact"].map(
                        (item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="px-3 py-1 font-bold tracking-wide
                                             text-gray-700 transition-colors duration-200
                                             hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                >
                                    {item}
                                </a>
                            </li>
                        )
                    )}
                    <li>
                        <a
                            href="/RyanM_Resume.pdf"
                            target="_blank"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow
                         transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Download CV
                        </a>
                    </li>
                </ul>

                {/* ------ Dark-mode toggle ------ */}
                <button
                    aria-label="Toggle dark mode"
                    onClick={toggleTheme}
                    className="rounded-full p-2 text-gray-600 transition
                             hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                >
                    {dark ? <Sun size={18}/> : <Moon size={18}/>}
                </button>

                {/* (Optional) mobile menu button could go here */}
            </nav>
        </motion.header>
    );
}