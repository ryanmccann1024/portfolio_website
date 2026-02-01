// src/App.jsx
// Main app with custom cursor, command palette, and smooth transitions

import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import NoiseOverlay from "./components/NoiseOverlay";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import AnimatedBackground from "./components/AnimatedBackground";

// Smooth scroll for #hash links
function ScrollToHash() {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const id = decodeURIComponent(location.hash.slice(1));
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);
    return null;
}

// Animated routes wrapper
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<Post />} />
                </Routes>
            </PageTransition>
        </AnimatePresence>
    );
}

// Make router work under /portfolio_website/ and /
const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export default function App() {
    return (
        <Router basename={basename}>
            <ScrollToHash />

            {/* Global overlays */}
            <AnimatedBackground />
            {/* CustomCursor disabled - using native pointer */}
            <NoiseOverlay />
            <ScrollProgress />

            <div className="min-h-screen scroll-smooth font-sans antialiased text-gray-900 bg-white dark:bg-slate-950 dark:text-gray-100">
                <Navbar />
                <CommandPalette />

                <AnimatedRoutes />

                <Footer />
            </div>
        </Router>
    );
}
