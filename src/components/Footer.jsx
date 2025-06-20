// src/components/Footer.jsx
import {ChevronUpIcon} from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Ryan M. All rights reserved.
                </p>

                {/* back-to-top */}
                <button
                    aria-label="Back to top"
                    onClick={() =>
                        window.scrollTo({top: 0, behavior: "smooth"})
                    }
                    className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                >
                    <ChevronUpIcon size={28}/>
                </button>
            </div>
        </footer>
    );
}
