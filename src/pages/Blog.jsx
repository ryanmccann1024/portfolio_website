// src/pages/Blog.jsx
// Terminal-inspired blog with creative card design

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search, FileText, Folder, ArrowRight, Terminal, Clock, ChevronRight, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import { mapPage } from "../utils/mapPage";

const DB = "2142d0f5c7e58041ab31e0fb965c74e5";

// Code-to-prose transformation content
const codeSnippets = [
    { code: "def train_model():", prose: "Training neural networks" },
    { code: "loss.backward()", prose: "Learning from mistakes" },
    { code: "git commit -m", prose: "Shipping features" },
    { code: "async/await", prose: "Async programming" },
    { code: "∇loss = 0", prose: "Optimization theory" },
];

// Positions for code snippets - spread across the header
const snippetPositions = [
    { left: 8, top: 20 },
    { left: 75, top: 15 },
    { left: 15, top: 70 },
    { left: 65, top: 75 },
    { left: 40, top: 85 },
];

// Animated code-to-prose block
function CodeProseBlock({ snippet, index }) {
    const [showProse, setShowProse] = useState(false);
    const position = snippetPositions[index] || { left: 50, top: 50 };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowProse(prev => !prev);
        }, 3000 + index * 500);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <motion.div
            className="absolute font-mono text-[10px] sm:text-xs lg:text-sm pointer-events-none select-none hidden sm:block"
            style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
        >
            <AnimatePresence mode="wait">
                {showProse ? (
                    <motion.span
                        key="prose"
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.4 }}
                        className="text-blue-500/30 dark:text-blue-400/30 italic"
                    >
                        {snippet.prose}
                    </motion.span>
                ) : (
                    <motion.span
                        key="code"
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.4 }}
                        className="text-emerald-500/30 dark:text-emerald-400/30"
                    >
                        {snippet.code}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Floating particles that connect code and prose
function FloatingParticle({ index }) {
    const size = 3 + Math.random() * 4;
    const duration = 8 + Math.random() * 12;
    // Keep particles more centered and visible
    const startX = 10 + Math.random() * 80;
    const startY = 10 + Math.random() * 80;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                left: `${startX}%`,
                top: `${startY}%`,
                background: index % 2 === 0
                    ? "rgba(16, 185, 129, 0.4)"
                    : "rgba(59, 130, 246, 0.4)",
            }}
            animate={{
                x: [0, 20, -15, 0],
                y: [0, -25, 15, 0],
                opacity: [0.3, 0.6, 0.4, 0.3],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
            }}
        />
    );
}

// Mini-game: Bug Catcher - catch the bugs to "debug" the blog
function BugCatcherGame() {
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [firstBugId, setFirstBugId] = useState(null);

    // Spawn bugs periodically
    useEffect(() => {
        const spawnBug = () => {
            const id = Date.now();
            // Keep bugs more centered and visible on all screen sizes
            const bug = {
                id,
                x: 15 + Math.random() * 70, // 15-85% horizontal
                y: 25 + Math.random() * 50, // 25-75% vertical (more centered)
                type: Math.random() > 0.5 ? "bug" : "beetle",
            };
            setBugs(prev => [...prev.slice(-3), bug]); // Keep max 4 bugs

            // Track first bug for hint
            if (firstBugId === null) {
                setFirstBugId(id);
            }
        };

        // Initial spawn
        setTimeout(spawnBug, 2000);

        const interval = setInterval(spawnBug, 4000 + Math.random() * 3000);
        return () => clearInterval(interval);
    }, [firstBugId]);

    // Hide hint after 8 seconds regardless
    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-remove bugs after some time
    useEffect(() => {
        const cleanup = setInterval(() => {
            setBugs(prev => prev.filter(bug => Date.now() - bug.id < 8000));
        }, 1000);
        return () => clearInterval(cleanup);
    }, []);

    const catchBug = (bugId) => {
        setBugs(prev => prev.filter(b => b.id !== bugId));
        setScore(prev => prev + 1);
        setShowScore(true);
        setShowHint(false); // Hide hint after first catch
        setTimeout(() => setShowScore(false), 2000);
    };

    return (
        <>
            {/* Bugs */}
            <AnimatePresence>
                {bugs.map(bug => (
                    <motion.button
                        key={bug.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -5, 0, 5, 0],
                            x: [0, 3, -3, 0],
                        }}
                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                        transition={{
                            opacity: { duration: 0.3 },
                            y: { duration: 2, repeat: Infinity },
                            x: { duration: 1.5, repeat: Infinity },
                        }}
                        onClick={() => catchBug(bug.id)}
                        className="absolute cursor-pointer hover:scale-125 transition-transform z-30"
                        style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                        title="Click to catch the bug!"
                    >
                        <span className="text-lg sm:text-xl opacity-60 hover:opacity-100 transition-opacity">
                            {bug.type === "bug" ? "🐛" : "🪲"}
                        </span>

                        {/* Hint arrow for first bug */}
                        {showHint && bug.id === firstBugId && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 flex items-center gap-1 whitespace-nowrap"
                            >
                                <motion.span
                                    animate={{ x: [0, -4, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="text-emerald-500 dark:text-emerald-400"
                                >
                                    →
                                </motion.span>
                                <span className="text-[10px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-white/80 dark:bg-slate-900/80 px-1.5 py-0.5 rounded">
                                    click me!
                                </span>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </AnimatePresence>

            {/* Score indicator */}
            <AnimatePresence>
                {showScore && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-4 right-4 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-mono text-white shadow-lg z-40"
                    >
                        bugs squashed: {score}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Glitch text effect
function GlitchText({ text }) {
    return (
        <div className="relative inline-block">
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 text-cyan-500 dark:text-cyan-400 animate-glitch-1 opacity-80"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 text-red-500 dark:text-pink-400 animate-glitch-2 opacity-80"
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
}

// Estimate reading time
function getReadingTime(excerpt) {
    const words = excerpt?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(words / 50)); // Rough estimate
}

// Image with loading skeleton
function ImageWithSkeleton({ src, alt = "", className = "" }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className="relative w-full h-full">
            {/* Skeleton loader */}
            {!loaded && !error && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer bg-[length:200%_100%]" />
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            />
        </div>
    );
}

// Featured post card (larger, more prominent)
function FeaturedCard({ post }) {
    const { slug, title, date, excerpt, cover, tags } = post;
    const readTime = getReadingTime(excerpt);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link
                to={`/blog/${slug}`}
                className="group block relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow"
            >
                <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    {cover && (
                        <div className="relative h-48 sm:h-56 lg:h-auto lg:w-1/2 xl:w-3/5 overflow-hidden">
                            <ImageWithSkeleton
                                src={cover}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent dark:from-slate-900/80 dark:via-slate-900/40 lg:bg-gradient-to-l pointer-events-none" />

                            {/* Featured badge */}
                            <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                                Latest Post
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="relative p-4 sm:p-6 lg:p-10 lg:w-1/2 xl:w-2/5 flex flex-col justify-center">
                        {/* Terminal path */}
                        <div className="flex items-center gap-2 mb-2 sm:mb-4 font-mono text-[10px] sm:text-xs text-emerald-600/70 dark:text-emerald-400/70">
                            <Terminal size={10} className="sm:w-3 sm:h-3" />
                            <span className="truncate">~/blog/{slug}.md</span>
                        </div>

                        <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display leading-snug">
                            {title}
                        </h2>

                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-slate-300 mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs lg:text-sm text-gray-500 dark:text-slate-400 mb-3 sm:mb-6">
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                                {new Date(date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                                <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                                {readTime} min read
                            </span>
                        </div>

                        {/* Tags - hidden on mobile */}
                        {tags.length > 0 && (
                            <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                                {tags.slice(0, 3).map((t) => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 rounded-lg"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-xs sm:text-sm group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// Regular blog card with consistent sizing
function BlogCard({ post, index }) {
    const { slug, title, date, excerpt, cover, tags } = post;
    const readTime = getReadingTime(excerpt);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="h-full"
        >
            <Link
                to={`/blog/${slug}`}
                className="group flex flex-col h-full rounded-xl lg:rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 overflow-hidden hover:border-blue-300 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-emerald-500/5 hover:-translate-y-1"
            >
                {/* Cover image - fixed height */}
                <div className="relative h-32 sm:h-40 lg:h-44 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                    {cover ? (
                        <>
                            <ImageWithSkeleton
                                src={cover}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileText size={40} className="text-slate-300 dark:text-slate-600" />
                        </div>
                    )}

                    {/* Reading time badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] sm:text-xs font-medium text-white flex items-center gap-1">
                        <Clock size={10} />
                        {readTime} min
                    </div>
                </div>

                {/* Content - flex-grow to fill remaining space */}
                <div className="flex flex-col flex-grow p-4 sm:p-5 lg:p-6">
                    {/* Terminal-style file path */}
                    <div className="flex items-center gap-2 mb-2 font-mono text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                        <ChevronRight size={10} className="text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{slug}.md</span>
                    </div>

                    {/* Title - responsive sizing */}
                    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                        {title}
                    </h2>

                    {/* Excerpt - responsive with better line height */}
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                        {excerpt}
                    </p>

                    {/* Tags - pushed to bottom with mt-auto */}
                    <div className="mt-auto">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                                {tags.slice(0, 2).map((t) => (
                                    <span
                                        key={t}
                                        className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-medium bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 rounded"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {tags.length > 2 && (
                                    <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-medium bg-gray-100 dark:bg-slate-700/50 text-gray-500 dark:text-gray-500 rounded">
                                        +{tags.length - 2}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 dark:border-slate-700/50">
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                <Calendar size={10} className="sm:w-3 sm:h-3" />
                                {new Date(date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>

                            <span className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-blue-600 dark:text-emerald-400 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                Read
                                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        fetch(`https://notion-api.splitbee.io/v1/table/${DB}`)
            .then((r) => r.json())
            .then((rows) =>
                setPosts(
                    rows
                        .filter((r) => r.Status === "Published")
                        .sort((a, b) => new Date(b.Date) - new Date(a.Date))
                        .map(mapPage)
                )
            )
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const allTags = useMemo(
        () => [...new Set(posts.flatMap((p) => p.tags))],
        [posts]
    );

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return posts.filter(({ title, excerpt, tags }) => {
            const matchesSearch =
                !q ||
                title.toLowerCase().includes(q) ||
                excerpt.toLowerCase().includes(q);
            const matchesTag = !selectedTag || tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [posts, query, selectedTag]);

    // Split into featured and rest
    const [featuredPost, ...otherPosts] = filtered;
    const showFeatured = !query && !selectedTag && featuredPost;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Header */}
            <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-gray-200 dark:border-slate-800 overflow-hidden">
                {/* Code-to-prose transformation animation */}
                <div className="absolute inset-0 overflow-hidden z-10">
                    {/* Floating particles - fewer on mobile */}
                    {[...Array(10)].map((_, i) => (
                        <FloatingParticle key={`particle-${i}`} index={i} />
                    ))}

                    {/* Code/prose blocks that transform - hidden on mobile */}
                    {codeSnippets.map((snippet, i) => (
                        <CodeProseBlock key={i} snippet={snippet} index={i} />
                    ))}

                    {/* Mini-game: Bug Catcher */}
                    <BugCatcherGame />
                </div>

                {/* Subtle gradient orbs */}
                <div className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-36">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-gray-900 dark:text-white font-display tracking-tight">
                            <GlitchText text="Blog" />
                        </h1>

                        {/* Tagline showing the code-to-prose concept */}
                        <motion.p
                            className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto font-medium px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Where <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">code</span> becomes{" "}
                            <span className="text-blue-600 dark:text-blue-400 italic">story</span>
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Filters */}
            <div className="sticky top-16 z-20 bg-gray-50/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4">
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none sm:w-72 lg:w-80">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-emerald-500/20 focus:border-blue-500 dark:focus:border-emerald-500 transition-all"
                            />
                        </div>

                        {/* Tag filter dropdown */}
                        <div className="relative">
                            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select
                                value={selectedTag || ""}
                                onChange={(e) => setSelectedTag(e.target.value || null)}
                                className="w-full sm:w-auto appearance-none pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-emerald-500/20 focus:border-blue-500 dark:focus:border-emerald-500 transition-all cursor-pointer text-gray-700 dark:text-gray-300 sm:min-w-[150px]"
                            >
                                <option value="">All Topics</option>
                                {allTags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full font-mono text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <Terminal size={14} className="text-red-500" />
                            $ find . -name "*{query}*"
                        </div>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                            No posts found
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Try a different search term or filter
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Featured post */}
                        {showFeatured && (
                            <div className="mb-8 sm:mb-12 lg:mb-16">
                                <FeaturedCard post={featuredPost} />
                            </div>
                        )}

                        {/* Posts grid */}
                        <motion.div
                            layout
                            className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            <AnimatePresence mode="popLayout">
                                {(showFeatured ? otherPosts : filtered).map((post, i) => (
                                    <BlogCard key={post.id} post={post} index={i} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}

                {/* Stats footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 sm:mt-16 lg:mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-500 dark:text-gray-400 font-mono shadow-sm">
                        <Folder size={16} className="text-emerald-500" />
                        <span>{filtered.length} of {posts.length} posts</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
