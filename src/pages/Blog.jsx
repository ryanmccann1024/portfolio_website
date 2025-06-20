import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {Calendar, Search} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import Spinner from "../components/Spinner";
import {mapPage} from "../utils/mapPage";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

const DB = "2142d0f5c7e58041ab31e0fb965c74e5";
const MotionLink = motion(Link);

function ImageWithLoader({src, alt}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative h-44 w-full overflow-hidden">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                    <Spinner small/>
                </div>
            )}
        </div>
    );
}

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [topics, setTopics] = useState(new Set());

    useEffect(() => {
        fetch(`https://notion-api.splitbee.io/v1/table/${DB}`)
            .then(r => r.json())
            .then(rows =>
                setPosts(
                    rows
                        .filter(r => r.Status === "Published")
                        .sort((a, b) => new Date(b.Date) - new Date(a.Date))
                        .map(mapPage)
                )
            )
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const allTopics = useMemo(
        () => [...new Set(posts.flatMap(p => p.tags))],
        [posts]
    );

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return posts.filter(({title, excerpt, tags}) => {
            const matchesSearch =
                !q ||
                title.toLowerCase().includes(q) ||
                excerpt.toLowerCase().includes(q);
            const matchesTopics =
                topics.size === 0 || [...topics].some(t => tags.includes(t));
            return matchesSearch && matchesTopics;
        });
    }, [posts, query, topics]);

    if (loading) {
        return (
            <AnimatePresence>
                <Spinner key="spinner"/>
            </AnimatePresence>
        );
    }

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

            <div className="mb-14 flex flex-wrap items-center gap-4">
                <label className="relative grow basis-64 sm:basis-80">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search posts…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full rounded-full border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100"
                    />
                </label>

                <MultiSelectDropdown
                    options={allTopics}
                    selected={topics}
                    onChange={setTopics}
                />
            </div>

            <motion.div layout className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map(
                        ({id, slug, title, date, excerpt, cover, author, tags}) => (
                            <MotionLink
                                key={id}
                                to={`/blog/${slug}`}
                                layout
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.25}}
                                className="group flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-white via-white to-gray-50 shadow border border-gray-200 hover:-translate-y-1 hover:shadow-lg dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 dark:border-slate-700"
                            >
                                {cover && <ImageWithLoader src={cover} alt=""/>}

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
                                        {excerpt}
                                    </p>

                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {tags.map(t => (
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
