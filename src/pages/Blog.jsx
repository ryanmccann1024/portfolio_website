// src/pages/Blog.jsx
import {useState, useMemo} from "react";
import {Link} from "react-router-dom";
import {Calendar, Search} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {posts} from "../data/posts";

/* Wrap Link so Framer can animate it */
const MotionLink = motion(Link);

export default function Blog() {
    /* ---------------- search & filter state ---------------- */
    const [query, setQuery] = useState("");
    const [topic, setTopic] = useState("");

    const allTopics = useMemo(
        () => [...new Set(posts.flatMap((p) => p.topics))],
        []
    );

    const filtered = useMemo(
        () =>
            posts.filter(({title, summary, topics}) => {
                const q = query.toLowerCase();
                return (
                    (topic ? topics.includes(topic) : true) &&
                    (!q ||
                        title.toLowerCase().includes(q) ||
                        summary.toLowerCase().includes(q))
                );
            }),
        [query, topic]
    );

    /* ---------------- ui ---------------- */
    return (
        <motion.section
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35}}
            className="mx-auto max-w-6xl px-4 py-24"
        >
            <h1 className="mb-3 text-5xl font-extrabold tracking-tight">Blog</h1>
            <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
                Unpolished thoughts on research, code, and caffeine.
            </p>

            {/* search & chips */}
            <div className="mb-14 flex flex-wrap items-center gap-4">
                {/* search box */}
                <label className="relative grow basis-64 sm:basis-80">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search posts…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full rounded-full border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100"
                    />
                </label>

                {/* topic chips */}
                <div className="flex flex-wrap gap-2">
                    {allTopics.map((t) => {
                        const active = topic === t;
                        return (
                            <motion.button
                                key={t}
                                whileTap={{scale: 0.9}}
                                animate={{scale: active ? 1.1 : 1}}
                                transition={{type: "spring", stiffness: 400, damping: 18}}
                                onClick={() => setTopic(active ? "" : t)}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium shadow-sm transition
                  ${
                                    active
                                        ? "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600"
                                }`}
                            >
                                {t}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* animated card grid */}
            <motion.div layout className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map(
                        ({slug, title, date, summary, cover, author, topics}) => (
                            <MotionLink
                                key={slug}
                                to={`/blog/${slug}`}
                                layout
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.25}}
                                className="group flex flex-col overflow-hidden rounded-xl bg-gradient-to-br
                           from-white via-white to-gray-50 shadow
                           border border-gray-200 hover:-translate-y-1 hover:shadow-lg
                           dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 dark:border-slate-700"
                            >
                                <img
                                    src={cover}
                                    alt=""
                                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                                />

                                <div className="flex grow flex-col p-6">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                                        {title}
                                    </h2>

                                    <div
                                        className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar size={14}/>
                                        {new Date(date).toLocaleDateString()}
                                        <span className="mx-2">•</span>
                                        {author}
                                    </div>

                                    <p className="mb-4 line-clamp-3 grow text-sm text-gray-700 dark:text-gray-300">
                                        {summary}
                                    </p>

                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {topics.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full bg-blue-600/10 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"
                                            >
                        {t}
                      </span>
                                        ))}
                                    </div>

                                    <span
                                        className="mt-auto text-sm font-medium text-blue-600 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 dark:text-blue-400">
                    Read more →
                  </span>
                                </div>
                            </MotionLink>
                        )
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );
}
