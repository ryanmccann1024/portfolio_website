const TOKEN = import.meta.env.VITE_NOTION_TOKEN;
const VERSION = "2022-06-28";

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Notion-Version": VERSION,
    "Content-Type": "application/json",
};

export async function queryDatabase(databaseId, body = {}) {
    const res = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        { method: "POST", headers, body: JSON.stringify(body) }
    );
    if (!res.ok) throw new Error(`Notion API error: ${res.status}`);
    return res.json();
}

export async function getPageBlocks(pageId) {
    const results = [];
    let cursor;

    do {
        const url = new URL(`https://api.notion.com/v1/blocks/${pageId}/children`);
        url.searchParams.set("page_size", "100");
        if (cursor) url.searchParams.set("start_cursor", cursor);

        const res = await fetch(url.toString(), {
            headers: { Authorization: headers.Authorization, "Notion-Version": VERSION },
        });
        if (!res.ok) throw new Error(`Notion API error: ${res.status}`);

        const data = await res.json();
        results.push(...data.results);
        cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    return results;
}
