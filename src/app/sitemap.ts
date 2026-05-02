import { MetadataRoute } from "next";
import japaneseColors from "@/data/birthday_colors.json";
import numerologyData from "@/data/numerology_colors.json";
import moonColors from "@/data/moon_colors.json";

const BASE_URL = "https://colorstrology.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = [
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
      url: `${BASE_URL}/numerology`,
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
    {
      url: `${BASE_URL}/pantone`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Динамические страницы японских цветов
  Object.values(japaneseColors).forEach((color: any) => {
    sitemapData.push({
      url: `${BASE_URL}/${color.date_mmdd}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  // Динамические страницы нумерологии
  Object.values(numerologyData).forEach((num: any) => {
    sitemapData.push({
      url: `${BASE_URL}/numerology/${num.number}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  // Динамические страницы лунных знаков
  Object.keys(moonColors).forEach((sign) => {
    sitemapData.push({
      url: `${BASE_URL}/moon-colors/${sign}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  });

  return sitemapData;
}
