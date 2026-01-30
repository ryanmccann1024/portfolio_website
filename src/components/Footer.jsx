// src/components/Footer.jsx
// Minimal footer

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 dark:border-slate-800">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    © {new Date().getFullYear()} Ryan McCann
                </p>
            </div>
        </footer>
    );
}
