import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NotionRenderer } from "react-notion-x";
import { Calendar, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Spinner from "../components/Spinner";
import { mapPage } from "../utils/mapPage";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const DB = "2142d0f5c7e58041ab31e0fb965c74e5";

export default function Post() {
    const { slug } = useParams();

    const [meta, setMeta]           = useState(null);
    const [recordMap, setRecordMap] = useState(null);
    const [error, setError]         = useState("");

    /* fetch meta + blocks */
    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const rows = await fetch(
                    `https://notion-api.splitbee.io/v1/table/${DB}`
                ).then(r => r.json());

                const row = rows.find(
                    r => r.Slug === slug && r.Status === "Published"
                );
                if (!row) throw new Error("Post not found");

                if (cancelled) return;
                setMeta(mapPage(row));

                const pageId = row.id.replace(/-/g, "");
                const blocks = await fetch(
                    `https://notion-api.splitbee.io/v1/page/${pageId}`
                ).then(r => r.json());

                if (!cancelled) setRecordMap({ block: blocks });
            } catch (e) {
                console.error(e);
                if (!cancelled) setError(e.message || "Failed to load post.");
            }
        })();

        return () => (cancelled = true);
    }, [slug]);

    /* states */
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
                <Spinner key="spinner" />
            </AnimatePresence>
        );

    /* rendered post */
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="prose prose-slate dark:prose-invert mx-auto max-w-2xl px-4 py-24"
        >
            <Link
                to="/blog"
                className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
                <ArrowLeft size={14} />
                Back to blog
            </Link>

            {meta.cover && (
                <img src={meta.cover} alt="" className="mb-8 w-full rounded-xl" />
            )}

            <h1>{meta.title}</h1>
            <p className="mb-8 mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <Calendar size={14} />
                {new Date(meta.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                <span className="mx-2">•</span> {meta.author}
            </p>

            {/* ── wrapper restored ── */}
            <div className="notion-wrapper text-gray-800 dark:text-gray-100">
                <NotionRenderer recordMap={recordMap} fullPage={false} />
            </div>

            {/* force light text for every nested element in dark mode */}
            <style jsx="true">{`
        .dark .notion-wrapper,
        .dark .notion-wrapper * {
          color: #f3f4f6 !important; /* Tailwind gray-100 */
        }
      `}</style>
        </motion.div>
    );
}
