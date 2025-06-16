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
            transition={{duration: 0.4}}
            className="prose prose-slate mx-auto max-w-2xl px-4 py-24 dark:prose-invert"
        >
            {/* back link */}
            <Link
                to="/blog"
                className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
                <ArrowLeft size={16} className="mr-1"/>
                Back to blog
            </Link>

            {/* hero */}
            <img
                src={post.cover}
                alt=""
                className="mb-8 rounded-xl shadow"
            />

            {/* title + meta */}
            <h1>{post.title}</h1>
            <p className="mb-8 mt-2 flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                <Calendar size={14}/>{" "}
                {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                <span className="mx-2">•</span>
                {post.author}
            </p>

            {/* article body (for now raw HTML) */}
            <div dangerouslySetInnerHTML={{__html: post.content}}/>
        </motion.article>
    );
}
