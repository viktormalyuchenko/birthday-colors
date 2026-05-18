import { MetadataRoute } from "next";
import japaneseColors from "@/data/birthday_colors.json";
import numerologyData from "@/data/numerology_colors.json";
import moonColors from "@/data/moon_colors.json";
import { getSortedPostsData } from "@/lib/blog"; // Импортируем нашу функцию чтения статей

const BASE_URL = "https://colorstrology.ru"; // Используем ваш новый домен

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = [
    // Главная и основные разделы
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/japanese-colors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pantone`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/horoscopes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }, // Бывший Блог

    // Калькуляторы и тесты
    {
      url: `${BASE_URL}/numerology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/name-color`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/luscher-test`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/aura`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Совместимость
    {
      url: `${BASE_URL}/color-compatibility`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/moon-colors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/moon-phase`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Динамические страницы: Японский календарь (366 дней)
  Object.values(japaneseColors).forEach((color: any) => {
    sitemapData.push({
      url: `${BASE_URL}/${color.date_mmdd}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  // Динамические страницы: Нумерология (1-9, 11, 22, 33)
  Object.values(numerologyData).forEach((num: any) => {
    sitemapData.push({
      url: `${BASE_URL}/numerology/${num.number}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  // Динамические страницы: Знаки Луны (12 знаков)
  Object.keys(moonColors).forEach((sign) => {
    sitemapData.push({
      url: `${BASE_URL}/moon-colors/${sign}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  // --- НОВОЕ: Динамические страницы Статей (Markdown файлы) ---
  const horoscopesPosts = getSortedPostsData();
  horoscopesPosts.forEach((post) => {
    sitemapData.push({
      url: `${BASE_URL}/horoscopes/${post.slug}`,
      lastModified: new Date(post.date), // Берем реальную дату публикации статьи из Frontmatter
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  const zodiacSigns = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ];
  zodiacSigns.forEach((sign) => {
    sitemapData.push({
      url: `${BASE_URL}/horoscopes/signs/${sign}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8, // Высокий приоритет, так как это хабы!
    });
  });

  return sitemapData;
}
