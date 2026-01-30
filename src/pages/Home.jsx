// src/pages/Home.jsx
// Main home page with terminal intro and visual sections

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalIntro from "../components/TerminalIntro";
import HeroSection from "../components/HeroSection";
import ProjectShowcase from "../components/ProjectShowcase";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
    // Start with intro showing, content hidden
    const [introComplete, setIntroComplete] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    // Check session storage on mount
    useEffect(() => {
        // Clear for testing - REMOVE THIS LINE FOR PRODUCTION
        sessionStorage.removeItem("seenIntro");

        const hasSeenIntro = sessionStorage.getItem("seenIntro");
        if (hasSeenIntro === "true") {
            setIntroComplete(true);
            setShowIntro(false);
        }
    }, []);

    const handleIntroComplete = () => {
        console.log("Intro complete, showing content");
        sessionStorage.setItem("seenIntro", "true");
        setIntroComplete(true);
        // Keep terminal mounted so exit animation can finish
        setTimeout(() => setShowIntro(false), 2000);
    };

    return (
        <>
            {/* Terminal intro animation */}
            {showIntro && (
                <TerminalIntro onComplete={handleIntroComplete} />
            )}

            {/* Main content - always rendered for layout, fades in when intro completes */}
            <motion.main
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
                <HeroSection />
                <div id="projects">
                    <ProjectShowcase />
                </div>
                <AboutSection />
                <ContactSection />
            </motion.main>
        </>
    );
}
