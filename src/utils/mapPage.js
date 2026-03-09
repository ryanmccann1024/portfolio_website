// src/utils/mapPage.js
// Normalise an official Notion API page object into the shape the UI expects.
export function mapPage(page) {
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
            title
                .toLowerCase()
                .replace(/[^\w]+/g, "-")
                .replace(/(^-|-$)/g, ""),
        title,
        date: props.Date?.date?.start || "",
        author: rt(props.Author) || "Ryan McCann",
        excerpt: rt(props.Description) || rt(props.Excerpt) || "",
        tags: ms(props.Tags),
        cover: file(props.Cover) || file(props.Image) || "",
    };
}
