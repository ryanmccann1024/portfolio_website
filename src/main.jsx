import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Easter egg: Console message for fellow devs
console.log(
    "%c👋 Hey fellow dev!",
    "font-size: 24px; font-weight: bold; color: #3b82f6;"
);
console.log(
    "%cChecking out my code? Let's chat: ryanjohnmccann@gmail.com",
    "font-size: 14px; color: #6b7280;"
);
console.log(
    "%cBuilt with React, Tailwind CSS, and Framer Motion.",
    "font-size: 12px; color: #9ca3af;"
);

// Easter egg: Konami code confetti
const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
];
let konamiIndex = 0;

document.addEventListener("keydown", async (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            try {
                const confetti = (await import("canvas-confetti")).default;
                // Fire confetti from both sides
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0.1, y: 0.6 }
                });
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0.9, y: 0.6 }
                });
                console.log("%c🎉 You found the secret!", "font-size: 16px; color: #8b5cf6;");
            } catch {
                // Confetti not available, fail silently
            }
        }
    } else {
        konamiIndex = 0;
    }
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
