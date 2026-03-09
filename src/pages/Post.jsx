import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Spinner from "../components/Spinner";

// Render Notion rich-text annotations
function RichText({ items = [] }) {
    return items.map((t, i) => {
        const a = t.annotations || {};
        let el = t.plain_text;
        if (a.code) el = <code key={i} className="px-1 py-0.5 bg-gray-100 dark:bg-slate-800 rounded text-sm font-mono">{el}</code>;
        if (a.bold) el = <strong key={i}>{el}</strong>;
        if (a.italic) el = <em key={i}>{el}</em>;
        if (a.strikethrough) el = <del key={i}>{el}</del>;
        if (a.underline) el = <span key={i} className="underline">{el}</span>;
        if (t.href) return <a key={i} href={t.href} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{el}</a>;
        return <span key={i}>{el}</span>;
    });
}

// Group consecutive list blocks so they render inside a single <ul>/<ol>
function groupBlocks(blocks) {
    const groups = [];
    let i = 0;
    while (i < blocks.length) {
        const type = blocks[i].type;
        if (type === "bulleted_list_item" || type === "numbered_list_item") {
            const items = [];
            while (i < blocks.length && blocks[i].type === type) {
                items.push(blocks[i]);
                i++;
            }
            groups.push({ id: `group-${i}`, type: `${type}_group`, items });
        } else {
            groups.push(blocks[i]);
            i++;
        }
    }
    return groups;
}

function Block({ block }) {
    const { type } = block;
    const v = block[type] || {};
    const rt = v.rich_text || [];

    switch (type) {
        case "paragraph":
            return rt.length ? <p><RichText items={rt} /></p> : <br />;
        case "heading_1":
            return <h1><RichText items={rt} /></h1>;
        case "heading_2":
            return <h2><RichText items={rt} /></h2>;
        case "heading_3":
            return <h3><RichText items={rt} /></h3>;
        case "bulleted_list_item_group":
            return (
                <ul>
                    {block.items.map((b) => (
                        <li key={b.id}><RichText items={b.bulleted_list_item.rich_text} /></li>
                    ))}
                </ul>
            );
        case "numbered_list_item_group":
            return (
                <ol>
                    {block.items.map((b) => (
                        <li key={b.id}><RichText items={b.numbered_list_item.rich_text} /></li>
                    ))}
                </ol>
            );
        case "to_do":
            return (
                <div className="flex items-start gap-2 my-1">
                    <input type="checkbox" checked={v.checked} readOnly className="mt-1 accent-emerald-500" />
                    <span className={v.checked ? "line-through text-gray-400" : ""}>
                        <RichText items={rt} />
                    </span>
                </div>
            );
        case "code":
            return (
                <pre className="overflow-x-auto rounded-lg bg-gray-900 text-gray-100 p-4 text-sm">
                    <code>{rt.map((t) => t.plain_text).join("")}</code>
                </pre>
            );
        case "image": {
            const src = v.type === "external" ? v.external?.url : v.file?.url;
            const caption = v.caption?.map((t) => t.plain_text).join("") || "";
            return (
                <figure>
                    <img src={src} alt={caption} className="rounded-lg w-full" />
                    {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
                </figure>
            );
        }
        case "divider":
            return <hr />;
        case "quote":
            return <blockquote><RichText items={rt} /></blockquote>;
        case "callout":
            return (
                <div className="flex gap-3 p-4 bg-gray-100 dark:bg-slate-800 rounded-lg my-4">
                    {v.icon?.emoji && <span className="text-xl flex-shrink-0">{v.icon.emoji}</span>}
                    <p className="m-0"><RichText items={rt} /></p>
                </div>
            );
        default:
            return null;
    }
}

function BlockRenderer({ blocks }) {
    return groupBlocks(blocks).map((block) => (
        <Block key={block.id} block={block} />
    ));
}

export default function Post() {
    const { slug } = useParams();

    const [meta, setMeta] = useState(null);
    const [blocks, setBlocks] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const base = import.meta.env.BASE_URL;
        Promise.all([
            fetch(`${base}notion/posts.json`).then((r) => r.json()),
            fetch(`${base}notion/posts/${slug}.json`).then((r) => {
                if (!r.ok) throw new Error("Post not found");
                return r.json();
            }),
        ])
            .then(([posts, blocks]) => {
                if (cancelled) return;
                const meta = posts.find((p) => p.slug === slug);
                if (!meta) throw new Error("Post not found");
                setMeta(meta);
                setBlocks(blocks);
            })
            .catch((e) => {
                console.error(e);
                if (!cancelled) setError(e.message || "Failed to load post.");
            });

        return () => { cancelled = true; };
    }, [slug]);

    if (error)
        return (
            <div className="px-4 py-24 text-center">
                {error} –{" "}
                <Link to="/blog" className="text-blue-600 hover:underline">
                    Back to blog
                </Link>
            </div>
        );

    if (!meta || !blocks)
        return (
            <AnimatePresence>
                <Spinner key="spinner" />
            </AnimatePresence>
        );

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="prose prose-sm sm:prose-base prose-slate dark:prose-invert mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24"
        >
            <Link
                to="/blog"
                className="mb-4 sm:mb-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 no-underline"
            >
                <ArrowLeft size={14} />
                Back to blog
            </Link>

            {meta.cover && (
                <img src={meta.cover} alt="" className="mb-6 sm:mb-8 w-full rounded-lg sm:rounded-xl" />
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl">{meta.title}</h1>
            <p className="mb-6 sm:mb-8 mt-2 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400">
                <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                {new Date(meta.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                <span className="mx-1 sm:mx-2">•</span> {meta.author}
            </p>

            <BlockRenderer blocks={blocks} />
        </motion.div>
    );
}
