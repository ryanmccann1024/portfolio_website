import {useState, useEffect} from "react";
import {Moon, Sun} from "lucide-react";
import {motion} from "framer-motion";
import {Link, NavLink} from "react-router-dom";

export default function Navbar() {
    /* — dark-mode toggle (unchanged) — */
    const prefersDark = () =>
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [dark, setDark] = useState(prefersDark);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const nav = [
        {label: "About", id: "about"},
        {label: "Projects", id: "projects"},
        {label: "Experience", id: "experience"},
        {label: "Contact", id: "contact"},
    ];

    return (
        <motion.header
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35}}
            className="fixed inset-x-0 top-0 z-20 bg-white/70 backdrop-blur dark:bg-slate-900/70"
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* logo → home */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50"
                >
                    Ryan McCann
                </Link>

                {/* desktop links */}
                <ul className="hidden gap-8 text-sm font-semibold md:flex">
                    {nav.map(({label, id}) => (
                        <li key={id}>
                            <Link
                                to={`/#${id}`}
                                className="px-2 py-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}

                    {/* blog */}
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

                    {/* CV */}
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

                {/* dark-mode button */}
                <button
                    onClick={() => setDark((d) => !d)}
                    className="rounded-full p-2 text-gray-600 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                    aria-label="Toggle dark mode"
                >
                    {dark ? <Sun size={18}/> : <Moon size={18}/>}
                </button>
            </nav>
        </motion.header>
    );
}
