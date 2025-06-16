// src/pages/Post.jsx
import {useParams, Link} from "react-router-dom";
import {Calendar, ArrowLeft} from "lucide-react";
import {motion} from "framer-motion";
import {posts} from "../data/posts";

export default function Post() {
    const {slug} = useParams();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-24">
                <p>Post not found.</p>
                <Link to="/blog" className="text-blue-600 hover:underline">
                    ← Back to blog
                </Link>
            </div>
        );
    }

    return (
        <motion.article
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35}}
            className="prose prose-slate dark:prose-invert mx-auto max-w-2xl px-4 py-24"
        >
            {/* new outlined back button */}
            <Link
                to="/blog"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500 dark:hover:text-white"
            >
                <ArrowLeft size={16}/>
                Back to blog
            </Link>

            <img src={post.cover} alt="" className="mb-8 rounded-xl shadow"/>

            <h1>{post.title}</h1>

            <p className="mb-8 mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                <Calendar size={14}/>
                {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                <span className="mx-2">•</span>
                {post.author}
                {post.topics.map((t) => (
                    <span
                        key={t}
                        className="rounded-full bg-blue-600/10 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"
                    >
            {t}
          </span>
                ))}
            </p>

            <div dangerouslySetInnerHTML={{__html: post.content}}/>
        </motion.article>
    );
}
