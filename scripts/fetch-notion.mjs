// Runs at build time (Node.js) — fetches Notion data and writes static JSON
// so the browser never needs to call the Notion API directly.
import { writeFileSync, mkdirSync } from "fs";

const TOKEN = process.env.VITE_NOTION_TOKEN;
const DB = "2142d0f5c7e58041ab31e0fb965c74e5";
const VERSION = "2022-06-28";

if (!TOKEN) {
    console.error("Missing VITE_NOTION_TOKEN");
    process.exit(1);
}

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Notion-Version": VERSION,
    "Content-Type": "application/json",
};

async function queryDatabase() {
    const res = await fetch(`https://api.notion.com/v1/databases/${DB}/query`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            filter: { property: "Status", select: { equals: "Published" } },
            sorts: [{ property: "Date", direction: "descending" }],
        }),
    });
    if (!res.ok) throw new Error(`Notion query failed: ${res.status}`);
    return res.json();
}

async function getPageBlocks(pageId) {
    const results = [];
    let cursor;
    do {
        const url = new URL(`https://api.notion.com/v1/blocks/${pageId}/children`);
        url.searchParams.set("page_size", "100");
        if (cursor) url.searchParams.set("start_cursor", cursor);
        const res = await fetch(url.toString(), {
            headers: { Authorization: headers.Authorization, "Notion-Version": VERSION },
        });
        if (!res.ok) throw new Error(`Notion blocks failed: ${res.status}`);
        const data = await res.json();
        results.push(...data.results);
        cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);
    return results;
}

function mapPage(page) {
    const props = page.properties || {};
    const title =
        props.Title?.title?.map((t) => t.plain_text).join("") ||
        props.Name?.title?.map((t) => t.plain_text).join("") ||
        "Untitled";
    const rt = (prop) => prop?.rich_text?.map((t) => t.plain_text).join("") || "";
    const ms = (prop) => prop?.multi_select?.map((s) => s.name) || [];
    const file = (prop) =>
        prop?.files?.[0]?.file?.url || prop?.files?.[0]?.external?.url || "";
    return {
        id: page.id,
        slug:
            rt(props.Slug) ||
            title.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, ""),
        title,
        date: props.Date?.date?.start || "",
        author: rt(props.Author) || "Ryan McCann",
        excerpt: rt(props.Description) || rt(props.Excerpt) || "",
        tags: ms(props.Tags),
        cover: file(props.Cover) || file(props.Image) || "",
    };
}

const outDir = "public/notion";
mkdirSync(`${outDir}/posts`, { recursive: true });

console.log("Fetching Notion posts...");
const { results } = await queryDatabase();
const posts = results.map(mapPage);
writeFileSync(`${outDir}/posts.json`, JSON.stringify(posts));
console.log(`Wrote ${posts.length} posts`);

for (const page of results) {
    const { slug } = mapPage(page);
    const blocks = await getPageBlocks(page.id);
    writeFileSync(`${outDir}/posts/${slug}.json`, JSON.stringify(blocks));
    console.log(`  Wrote blocks for: ${slug}`);
}

console.log("Done!");
