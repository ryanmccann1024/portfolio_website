// src/components/Navbar.jsx
import {useState, useEffect} from "react";
import {Moon, Sun} from "lucide-react";

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
        <header className="fixed inset-x-0 top-0 z-20 bg-white/70 backdrop-blur dark:bg-slate-900/70">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* ------ Logo / name ------ */}
                <a href="#hero" className="text-2xl font-extrabold tracking-tight">
                    Ryan M.
                </a>

                {/* ------ Desktop links ------ */}
                <ul className="hidden gap-8 text-sm font-medium md:flex">
                    {["About", "Projects", "Experience", "Skills", "Contact"].map(
                        (item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="hover:text-blue-600 dark:hover:text-blue-400"
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
                            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow
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
                    className="rounded-full p-2 transition hover:bg-gray-200 dark:hover:bg-slate-700 md:ml-4"
                >
                    {dark ? <Sun size={18}/> : <Moon size={18}/>}
                </button>

                {/* (Optional) mobile menu button could go here */}
            </nav>
        </header>
    );
}