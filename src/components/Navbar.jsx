// src/components/Navbar.jsx
import {useState, useEffect} from "react";
import {Menu, X, Moon, Sun} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {Link, NavLink} from "react-router-dom";

export default function Navbar() {
    /* ---------------- theme toggle ---------------- */
    const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [dark, setDark] = useState(
        document.documentElement.classList.contains("dark") || prefersDark
    );
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    /* ---------------- mobile drawer ---------------- */
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    const links = [
        {label: "About", href: "/#about"},
        {label: "Projects", href: "/#projects"},
        {label: "Experience", href: "/#experience"},
        {label: "Contact", href: "/#contact"},
    ];

    return (
        <>
            {/* fixed top bar */}
            <motion.header
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.35}}
                className="fixed inset-x-0 top-0 z-30 bg-white/70 backdrop-blur dark:bg-slate-900/70"
            >
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3">
                    {/* logo */}
                    <Link
                        to="/"
                        className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50"
                        onClick={close}
                    >
                        Ryan McCann
                    </Link>

                    {/* desktop links — centered via mx-auto */}
                    <ul className="mx-auto hidden gap-8 text-sm font-semibold md:flex">
                        {links.map(({label, href}) => (
                            <li key={label}>
                                <Link
                                    to={href}
                                    className="px-2 py-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <NavLink
                                to="/blog"
                                className={({isActive}) =>
                                    `px-2 py-1 transition-colors ${
                                        isActive
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-700 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                    }`
                                }
                            >
                                Blog
                            </NavLink>
                        </li>
                        <li>
                            <a
                                href="https://github.com/ryanmccann1024/portfolio_website/blob/main/public/pdfs/Ryan_McCann_Resume_v4.pdf"
                                download
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                CV
                            </a>
                        </li>
                    </ul>

                    {/* right-side icons */}
                    <div className="flex items-center gap-2">
                        {/* theme */}
                        <button
                            onClick={() => setDark((d) => !d)}
                            aria-label="Toggle dark mode"
                            className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                        >
                            {dark ? <Sun size={18}/> : <Moon size={18}/>}
                        </button>

                        {/* burger (mobile only) */}
                        <button
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700 md:hidden"
                        >
                            <Menu size={22}/>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* slide-out drawer */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{x: "100%"}}
                        animate={{x: 0}}
                        exit={{x: "100%"}}
                        transition={{type: "tween", duration: 0.25}}
                        className="fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-lg dark:bg-slate-800 md:hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-lg font-bold">Menu</span>
                            <button
                                onClick={close}
                                aria-label="Close menu"
                                className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                            >
                                <X size={20}/>
                            </button>
                        </div>

                        <ul className="mt-4 space-y-4 px-6 text-sm font-medium">
                            {links.map(({label, href}) => (
                                <li key={label}>
                                    <Link
                                        to={href}
                                        onClick={close}
                                        className="block py-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <NavLink
                                    to="/blog"
                                    onClick={close}
                                    className={({isActive}) =>
                                        `block py-1 transition-colors ${
                                            isActive
                                                ? "font-semibold text-blue-600 dark:text-blue-400"
                                                : "text-gray-700 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                        }`
                                    }
                                >
                                    Blog
                                </NavLink>
                            </li>
                            <li>
                                <a
                                    href="/pdfs/Ryan_McCann_Resume.pdf"
                                    download
                                    className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Download CV
                                </a>
                            </li>
                        </ul>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
