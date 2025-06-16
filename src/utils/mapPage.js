// src/utils/mapPage.js
/**
 * Normalise a Splitbee-Notion row into the shape the UI expects
 * – guarantees a title even if the column shows up as Name instead of Title
 */
export function mapPage(row) {
    const title = row.Title || row.Name || "Untitled";

    return {
        id: row.id,
        slug:
            row.Slug ||
            title
                .toLowerCase()
                .replace(/[^\w]+/g, "-")
                .replace(/(^-|-$)/g, ""),
        title,
        date: row.Date,
        author: row.Author || "Ryan McCann",
        excerpt: row.Description || row.Excerpt || "",
        tags: Array.isArray(row.Tags) ? row.Tags : [],
        cover: row.Cover?.[0]?.url || row.Image?.[0]?.url || "",
    };
}
