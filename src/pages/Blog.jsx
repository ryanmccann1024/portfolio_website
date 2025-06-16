import {Link} from "react-router-dom";
import {Calendar, ChevronRight} from "lucide-react";
import {motion} from "framer-motion";
import {posts} from "../data/posts";

export default function Blog() {
    return (
        <motion.section
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="mx-auto max-w-5xl px-4 py-24"
        >
            <h1 className="mb-3 text-5xl font-extrabold tracking-tight">Blog</h1>
            <p className="mb-14 text-lg text-gray-600 dark:text-gray-400">
                Unpolished thoughts on research, code, and caffeine.
            </p>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map(({slug, title, date, summary, cover}) => (
                    <article
                        key={slug}
                        className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                        <img
                            src={cover}
                            alt=""
                            className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="flex grow flex-col p-6">
                            <h2 className="mb-2 text-lg font-semibold group-hover:underline">
                                {title}
                            </h2>

                            <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <Calendar size={14}/>
                                {new Date(date).toLocaleDateString()}
                            </div>

                            <p className="mb-6 line-clamp-3 grow text-sm text-gray-700 dark:text-gray-300">
                                {summary}
                            </p>

                            <Link
                                to={`/blog/${slug}`}
                                className="mt-auto inline-flex items-center text-sm font-medium text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400"
                            >
                                Read more <ChevronRight size={16} className="ml-1"/>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </motion.section>
    );
}
