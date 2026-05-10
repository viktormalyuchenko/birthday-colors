import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/horoscopes");

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        slug,
        ...(matterResult.data as {
          date: string;
          title: string;
          excerpt: string;
          category: string;
          tags?: string[];
          coverImage: string;
          forecast_type?: string;
          date_start?: string;
          date_end?: string;
          toc?: boolean;
        }),
      };
    });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Новая цепочка обработки: добавляет оглавление и ID к заголовкам
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkToc, {
      heading: "Оглавление|Содержание",
      tight: true,
      maxDepth: 2,
    }) // Ищет заголовок "Оглавление"
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug) // Добавляет id="zogolovok" для ссылок
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as any),
  };
}
