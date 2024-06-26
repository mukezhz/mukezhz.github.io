import html2md from "html-to-md";
import { promises as fs } from "fs";
import path from "path";

async function fetchMediumPosts() {
  const res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mukezhz"
  );
  const data = await res.json();
  return data.items;
}

function sanitizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function saveMarkdownFile(filename, post, content) {
  const dirPath = path.join(
    process.cwd(),
    "src",
    "content",
    "medium",
    filename
  );
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory: ${err}`);
  }

  content =
    `---
title: "${post.title}"
description: "${post.title}"
date: "${new Date(post.pubDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}"
tags:
  - Medium
  - ${post.categories.join("\n  - ")}
link: "${post.link}"
---
` + content;

  try {
    await fs.writeFile(path.join(dirPath, "index.md"), content, "utf8");
    console.log(`Successfully saved ${filename}/index.md`);
  } catch (err) {
    console.error(`Failed to write file: ${err}`);
  }
}

async function main() {
  const posts = await fetchMediumPosts();
  for (const post of posts) {
    const md = html2md(post.content);
    const sanitizedTitle = sanitizeTitle(post.title);
    await saveMarkdownFile(sanitizedTitle, post, md);
  }
}

main();
