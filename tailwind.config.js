/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Extended palette
                accent: {
                    purple: "#8b5cf6",
                    orange: "#f97316",
                },
                // Terminal green accent
                terminal: {
                    green: "#22c55e",
                    "green-dark": "#16a34a",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Outfit", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },
            keyframes: {
                shimmer: {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                },
            },
            animation: {
                shimmer: "shimmer 1.5s ease-in-out infinite",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
