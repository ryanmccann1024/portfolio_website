// src/pages/Post.jsx
import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {NotionRenderer} from "react-notion-x";
import {Calendar, ArrowLeft} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import {mapPage} from "../utils/mapPage";

const DB = "2142d0f5c7e58041ab31e0fb965c74e5"; // your Notion DB ID

/* ─── tiny animated spinner ─── */
function Spinner() {
    return (
        <motion.div
            className="flex justify-center py-24"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <motion.span
                className="h-8 w-8 rounded-full border-4 border-blue-600 border-t-transparent"
                animate={{rotate: 360}}
                transition={{repeat: Infinity, duration: 1, ease: "linear"}}
            />
        </motion.div>
    );
}

export default function Post() {
    const {slug} = useParams();
    const [meta, setMeta] = useState(null);
    const [recordMap, setRecordMap] = useState(null);
    const [error, setError] = useState("");

    /* ─── fetch data ─── */
    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                /* 1. Table row */
                const rows = await fetch(
                    `https://notion-api.splitbee.io/v1/table/${DB}`
                ).then((r) => r.json());

                const row = rows.find(
                    (r) => r.Slug === slug && r.Status === "Published"
                );
                if (!row) {
                    setError("Post not found");
                    return;
                }
                if (cancelled) return;
                setMeta(mapPage(row));

                /* 2. Page blocks */
                const pageId = row.id.replace(/-/g, "");
                const blocks = await fetch(
                    `https://notion-api.splitbee.io/v1/page/${pageId}`
                ).then((r) => r.json());

                if (!cancelled) setRecordMap({block: blocks});
            } catch (e) {
                console.error(e);
                if (!cancelled) setError("Failed to load post.");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    /* ─── UI states ─── */
    if (error)
        return (
            <div className="px-4 py-24 text-center">
                {error} –{" "}
                <Link to="/blog" className="text-blue-600 hover:underline">
                    Back to blog
                </Link>
            </div>
        );

    if (!meta || !recordMap)
        return (
            <AnimatePresence>
                <Spinner key="spinner"/>
            </AnimatePresence>
        );

    /* ─── rendered post ─── */
    return (
        <motion.div
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35}}
            className="prose prose-slate dark:prose-invert mx-auto max-w-2xl px-4 py-24"
        >
            {/* back link */}
            <Link
                to="/blog"
                className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
                <ArrowLeft size={14}/>
                Back to blog
            </Link>

            {/* cover image */}
            {meta.cover && (
                <img src={meta.cover} alt="" className="rounded-xl mb-8 w-full"/>
            )}

            {/* title and meta */}
            <h1>{meta.title}</h1>
            <p className="mb-8 mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <Calendar size={14}/>
                {new Date(meta.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                <span className="mx-2">•</span> {meta.author}
            </p>

            {/* notion blocks; wrapper sets default text colors */}
            <div className="notion-wrapper text-gray-800 dark:text-gray-100">
                <NotionRenderer recordMap={recordMap} fullPage={false}/>
            </div>

            {/* enforce white text for *all* nested elements in dark mode */}
            <style jsx="true">{`
                .dark .notion-wrapper,
                .dark .notion-wrapper * {
                    color: #f3f4f6 !important; /* Tailwind gray-100 */
                }
            `}</style>
        </motion.div>
    );
}
