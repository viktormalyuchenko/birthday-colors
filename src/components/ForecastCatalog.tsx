"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  date: string;
  date_start?: string;
  date_end?: string;
  forecast_type?: string;
  tags?: string[];
}

const ZODIAC_SIGNS = [
  { id: "овен", label: "♈ Овен", element: "огненные знаки" },
  { id: "телец", label: "♉ Телец", element: "земные знаки" },
  { id: "близнецы", label: "♊ Близнецы", element: "воздушные знаки" },
  { id: "рак", label: "♋ Рак", element: "водные знаки" },
  { id: "лев", label: "♌ Лев", element: "огненные знаки" },
  { id: "дева", label: "♍ Дева", element: "земные знаки" },
  { id: "весы", label: "♎ Весы", element: "воздушные знаки" },
  { id: "скорпион", label: "♏ Скорпион", element: "водные знаки" },
  { id: "стрелец", label: "♐ Стрелец", element: "огненные знаки" },
  { id: "козерог", label: "♑ Козерог", element: "земные знаки" },
  { id: "водолей", label: "♒ Водолей", element: "воздушные знаки" },
  { id: "рыбы", label: "♓ Рыбы", element: "водные знаки" },
];

const GENERAL_TAGS = ["общий прогноз", "все знаки", "таро прогноз"];
const ITEMS_PER_PAGE = 9;

export default function ForecastCatalog({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [isMounted, setIsMounted] = useState(false); // Защита от Hydration Error
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [onlyActive, setOnlyActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Устанавливаем флаг монтирования
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag, activeSign, onlyActive]);

  const excludeFromThemes = [
    ...ZODIAC_SIGNS.map((z) => z.id),
    ...ZODIAC_SIGNS.map((z) => z.element),
    ...GENERAL_TAGS,
  ];
  const allTags = initialPosts.flatMap(
    (post) => post.tags?.map((t) => t.toLowerCase()) || [],
  );

  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (!excludeFromThemes.includes(tag)) acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map((t) => t[0]);

  const filteredPosts = initialPosts.filter((post) => {
    const postTagsLower = (post.tags || []).map((t) => t.toLowerCase());

    if (activeTag && !postTagsLower.includes(activeTag.toLowerCase()))
      return false;

    if (activeSign) {
      const signData = ZODIAC_SIGNS.find((z) => z.id === activeSign);
      if (signData) {
        const hasMatch = postTagsLower.some(
          (tag) =>
            tag === signData.id ||
            tag === signData.element ||
            GENERAL_TAGS.includes(tag),
        );
        if (!hasMatch) return false;
      }
    }

    if (onlyActive) {
      if (
        !post.date_start ||
        !post.date_end ||
        post.forecast_type === "general"
      )
        return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const end = new Date(post.date_end);
      end.setHours(23, 59, 59, 999);
      if (today > end) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Знак:
            </span>
            <select
              className="bg-gray-50 border border-gray-200 text-gray-900 text-base font-bold rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-auto p-3 outline-none cursor-pointer"
              value={activeSign || ""}
              onChange={(e) => setActiveSign(e.target.value || null)}
            >
              <option value="">Все знаки</option>
              {ZODIAC_SIGNS.map((sign) => (
                <option key={sign.id} value={sign.id}>
                  {sign.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none bg-gray-50 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors w-max">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={onlyActive}
                onChange={() => setOnlyActive(!onlyActive)}
              />
              <div
                className={`block w-10 h-6 rounded-full transition-colors ${onlyActive ? "bg-emerald-500" : "bg-gray-300"}`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${onlyActive ? "translate-x-4" : ""}`}
              ></div>
            </div>
            <span className="text-sm font-bold text-gray-700">Идут сейчас</span>
          </label>
        </div>

        {popularTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${!activeTag ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              Все темы
            </button>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors capitalize ${activeTag === tag.toLowerCase() ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => {
              let isCurrent = false;
              // Считаем актуальность ТОЛЬКО на клиенте, чтобы не бесить сервер разным временем
              if (isMounted && post.date_start && post.date_end) {
                const today = new Date();
                const end = new Date(post.date_end);
                end.setHours(23, 59, 59, 999);
                const start = new Date(post.date_start);
                start.setHours(0, 0, 0, 0);
                isCurrent = today >= start && today <= end;
              }

              let cover =
                post.coverImage ||
                "https://images.unsplash.com/photo-1532012197267-da84d127e765";
              if (cover.includes("unsplash.com") && !cover.includes("w=")) {
                cover = `${cover}${cover.includes("?") ? "&" : "?"}w=600&q=80&auto=format&fit=crop`;
              }

              return (
                <Link
                  href={`/horoscopes/${post.slug}`}
                  key={post.slug}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="w-full h-56 overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${cover})` }}
                    />
                    {isCurrent && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Идет сейчас
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-max mb-4">
                      {post.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 font-medium">
                      <span>{post.date}</span>
                      <span className="text-indigo-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Читать →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ПАГИНАЦИЯ (Рендерится только на клиенте) */}
          {isMounted && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Назад
              </button>

              <div className="flex items-center gap-2 px-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-colors ${currentPage === i + 1 ? "bg-indigo-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Вперед →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-4xl mb-4 block">🌌</span>
          <h3 className="text-2xl font-bold font-serif text-gray-900 mb-2">
            Звезды молчат
          </h3>
          <p className="text-gray-500">
            По вашему запросу не найдено прогнозов. Попробуйте изменить фильтры.
          </p>
          <button
            onClick={() => {
              setActiveTag(null);
              setActiveSign(null);
              setOnlyActive(false);
            }}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}
