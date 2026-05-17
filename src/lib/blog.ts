import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/horoscopes");

// Рекурсивная функция: заходит во все вложенные папки и собирает пути к .md файлам
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export function getSortedPostsData() {
  const allFiles = getAllFiles(postsDirectory);

  const allPostsData = allFiles.map((fullPath) => {
    // Имя файла становится слагом (URL-ом), независимо от того, в какой он папке
    const fileName = path.basename(fullPath);
    const slug = fileName.replace(/\.md$/, "");

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as any),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const allFiles = getAllFiles(postsDirectory);

  // Ищем нужный файл по его имени (slug) среди всех найденных файлов
  const fullPath = allFiles.find(
    (file) => path.basename(file) === `${slug}.md`,
  );

  if (!fullPath) {
    throw new Error(`Статья ${slug} не найдена`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkToc, {
      heading: "Оглавление|Содержание",
      tight: true,
      maxDepth: 2,
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as any),
  };
}
