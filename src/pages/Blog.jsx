// src/pages/Blog.jsx
// Terminal-inspired blog with file browser aesthetic

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search, FileText, Folder, ArrowRight, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";
import { mapPage } from "../utils/mapPage";

const DB = "2142d0f5c7e58041ab31e0fb965c74e5";

function BlogCard({ post, index }) {
    const { id, slug, title, date, excerpt, cover, author, tags } = post;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Link
                to={`/blog/${slug}`}
                className="group block rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 overflow-hidden hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
                {/* Cover image */}
                {cover && (
                    <div className="relative h-36 sm:h-48 overflow-hidden">
                        <img
                            src={cover}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-6">
                    {/* Terminal-style file path */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 font-mono text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                        <FileText size={10} className="sm:w-3 sm:h-3" />
                        <span className="truncate">~/blog/{slug}.md</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display">
                        {title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                        {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar size={10} className="sm:w-3 sm:h-3" />
                                {new Date(date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        <motion.span
                            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400"
                            initial={{ x: 0, opacity: 0 }}
                            whileHover={{ x: 4 }}
                            animate={{ opacity: 1 }}
                        >
                            Read
                            <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-slate-700/50">
                            {tags.map((t) => (
                                <span
                                    key={t}
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 rounded"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Terminal-style header */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 font-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            <Terminal size={14} className="text-emerald-500 sm:w-4 sm:h-4" />
                            <span>$ ls ~/blog</span>
                            <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-emerald-500 animate-pulse" />
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-display mb-3 sm:mb-4">
                            Blog
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                            Thoughts on machine learning, reinforcement learning, and building things that matter.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filters */}
            <div className="sticky top-16 z-20 bg-gray-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                        {/* Search */}
                        <div className="relative w-full sm:flex-1 sm:min-w-[200px] sm:max-w-md">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Tag filters */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                                    !selectedTag
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                All
                            </button>
                            {allTags.slice(0, 5).map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                                        selectedTag === tag
                                            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                                            : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts grid */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="font-mono text-sm text-gray-400 dark:text-gray-500 mb-4">
                            $ find . -name "*{query}*"
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                            No posts found. Try a different search.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((post, i) => (
                                <BlogCard key={post.id} post={post} index={i} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-500 dark:text-gray-400 font-mono">
                        <Folder size={14} />
                        {filtered.length} of {posts.length} posts
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
