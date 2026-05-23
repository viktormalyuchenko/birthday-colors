import { getPostData, getSortedPostsData } from "@/lib/blog"; // Добавили getSortedPostsData
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleShare from "@/components/ArticleShare";

// --- АСТРОЛОГИЧЕСКИЙ СЛОВАРЬ (Связывает стихии и знаки) ---
const ASTRO_MAP: Record<string, string[]> = {
  "огненные знаки": ["овен", "лев", "стрелец"],
  "водные знаки": ["рак", "скорпион", "рыбы"],
  "земные знаки": ["телец", "дева", "козерог"],
  "воздушные знаки": ["близнецы", "весы", "водолей"],
};

// Функция для "расширения" тегов
// Если тег "Рыбы", она добавит "Водные знаки". Если "Водные знаки", добавит "Рак", "Скорпион", "Рыбы"
function expandTags(tags: string[] = []): string[] {
  const expanded = new Set<string>();
  const lowerTags = tags.map((t) => t.toLowerCase());

  lowerTags.forEach((tag) => {
    expanded.add(tag);
    // Проверяем, это ли название стихии?
    if (ASTRO_MAP[tag]) {
      ASTRO_MAP[tag].forEach((sign) => expanded.add(sign));
    }
    // Проверяем, это ли название знака?
    Object.entries(ASTRO_MAP).forEach(([element, signs]) => {
      if (signs.includes(tag)) expanded.add(element);
    });
  });

  return Array.from(expanded);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  try {
    const post = await getPostData(resolved.slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage }],
      },
    };
  } catch {
    return { title: "Статья не найдена" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;

  let postData;
  try {
    postData = await getPostData(resolved.slug);
  } catch (error) {
    notFound();
  }

  // --- ЛОГИКА АКТУАЛЬНОСТИ ТЕКУЩЕЙ СТАТЬИ ---
  let statusBadge = null;
  let dateRangeText = null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (
    postData.date_start &&
    postData.date_end &&
    postData.forecast_type !== "general"
  ) {
    const startDate = new Date(postData.date_start);
    const endDate = new Date(postData.date_end);
    endDate.setHours(23, 59, 59, 999);

    const formatOpts: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    dateRangeText = `${startDate.toLocaleDateString("ru-RU", formatOpts)} — ${endDate.toLocaleDateString("ru-RU", formatOpts)}`;

    if (today >= startDate && today <= endDate) {
      statusBadge = (
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Актуально сейчас
        </div>
      );
    } else if (today > endDate) {
      statusBadge = (
        <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          Архивный прогноз
        </div>
      );
    }
  }

  // --- ЛОГИКА ПОДБОРА ПОХОЖИХ СТАТЕЙ (С УМНЫМ ВЕСОМ) ---
  const allPosts = getSortedPostsData();
  const currentExpandedTags = expandTags(postData.tags || []);

  // Все знаки и стихии для проверки веса
  const allAstroKeywords = [
    ...Object.keys(ASTRO_MAP),
    ...Object.values(ASTRO_MAP).flat(),
  ];

  const relatedPosts = allPosts
    .filter((post) => post.slug !== postData.slug) // Убираем текущую
    .filter((post) => {
      // Оставляем только актуальные
      if (!post.date_start || !post.date_end) return false;
      const start = new Date(post.date_start);
      const end = new Date(post.date_end);
      end.setHours(23, 59, 59, 999);
      return today >= start && today <= end;
    })
    .map((post) => {
      const postExpandedTags = expandTags(post.tags || []);

      // Считаем вес совпадений
      const matchScore = postExpandedTags.reduce((score, tag) => {
        if (currentExpandedTags.includes(tag)) {
          // Если совпал знак зодиака или стихия — даем 10 баллов!
          if (allAstroKeywords.includes(tag)) return score + 10;
          // Если совпало просто слово "Любовь" или "Май" — даем 1 балл
          return score + 1;
        }
        return score;
      }, 0);

      return { ...post, matchScore };
    })
    .filter((post) => post.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore) // Сортируем по баллам
    .slice(0, 3);

  let optimizedCover =
    postData.coverImage ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

  // Если это картинка с Unsplash и в ней еще нет параметра ширины (w=)
  if (
    optimizedCover.includes("unsplash.com") &&
    !optimizedCover.includes("w=")
  ) {
    optimizedCover = optimizedCover.includes("?")
      ? `${optimizedCover}&w=1200&q=80&auto=format&fit=crop`
      : `${optimizedCover}?w=1200&q=80&auto=format&fit=crop`;
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-10 md:py-16 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Гороскопы", href: "/horoscopes" },
            { label: postData.title },
          ]}
        />

        <article className="bg-white p-6 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 mt-4">
          <header className="mb-8 md:mb-12 text-center max-w-4xl mx-auto flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs inline-block bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                {postData.category}
              </span>
              {statusBadge}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 font-serif leading-tight">
              {postData.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 text-gray-400 font-medium uppercase tracking-widest text-[10px] md:text-xs">
              <span>Опубликовано: {postData.date}</span>
              {dateRangeText && (
                <span className="text-indigo-500 font-bold bg-indigo-50 px-3 py-1 rounded-md">
                  Период: {dateRangeText}
                </span>
              )}
            </div>
          </header>

          <div className="w-full h-56 md:h-[350px] rounded-2xl md:rounded-3xl overflow-hidden mb-12 shadow-md relative">
            <img
              src={optimizedCover}
              alt={postData.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-grow overflow-x-auto pb-4">
              <div
                className="prose prose-base md:prose-lg prose-indigo min-w-full text-gray-700 prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />

              <ArticleShare title={postData.title} />
            </div>
          </div>
        </article>

        {/* --- НОВЫЙ БЛОК: РЕКОМЕНДАЦИИ --- */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl font-black font-serif text-gray-900 mb-8 text-center">
              Актуальное для вас
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  href={`/horoscopes/${post.slug}`}
                  key={post.slug}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="h-40 overflow-hidden relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">
                      🟢 Идет сейчас
                    </span>
                    <h4 className="text-xl font-bold font-serif text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-auto">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Кнопка назад */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link
            href="/horoscopes"
            className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            ← Все прогнозы
          </Link>

          {/* Ищем, есть ли в тегах статьи конкретные знаки, и выводим кнопки на их хабы */}
          {postData.tags
            ?.filter((t: string) =>
              Object.values(ASTRO_MAP).flat().includes(t.toLowerCase()),
            )
            .map((tag: string) => {
              // Ищем английский slug (например 'aries') по русскому тегу ('овен')
              const engSlug = Object.entries(ASTRO_MAP).find(
                ([element, signs]) => signs.includes(tag.toLowerCase()),
              )
                ? Object.keys({
                    aries: "овен",
                    taurus: "телец",
                    gemini: "близнецы",
                    cancer: "рак",
                    leo: "лев",
                    virgo: "дева",
                    libra: "весы",
                    scorpio: "скорпион",
                    sagittarius: "стрелец",
                    capricorn: "козерог",
                    aquarius: "водолей",
                    pisces: "рыбы",
                  }).find(
                    (key) =>
                      ({
                        aries: "овен",
                        taurus: "телец",
                        gemini: "близнецы",
                        cancer: "рак",
                        leo: "лев",
                        virgo: "дева",
                        libra: "весы",
                        scorpio: "скорпион",
                        sagittarius: "стрелец",
                        capricorn: "козерог",
                        aquarius: "водолей",
                        pisces: "рыбы",
                      })[key as keyof typeof ASTRO_MAP] === tag.toLowerCase(),
                  )
                : null;

              if (engSlug) {
                return (
                  <Link
                    key={engSlug}
                    href={`/horoscopes/signs/${engSlug}`}
                    className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-colors shadow-lg active:scale-95"
                  >
                    Все гороскопы для знака {tag} →
                  </Link>
                );
              }
              return null;
            })}
        </div>
      </div>
    </main>
  );
}
