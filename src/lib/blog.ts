import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) return [];

  // Читаем все файлы в папке
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      // Имя файла становится URL-ом (slug)
      const slug = fileName.replace(/\.md$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Парсим метаданные (Frontmatter)
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as {
          date: string;
          title: string;
          excerpt: string;
          category: string;
          coverImage: string;
        }),
      };
    });

  // Сортируем по дате (свежие сверху)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Конвертируем Markdown в HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as {
      date: string;
      title: string;
      excerpt: string;
      category: string;
      coverImage: string;
    }),
  };
}
