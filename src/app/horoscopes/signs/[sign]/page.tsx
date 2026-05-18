import { getSortedPostsData } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

// --- БАЗА ЗНАКОВ ЗОДИАКА ---
const ZODIAC_DATA: Record<
  string,
  {
    ru: string;
    emoji: string;
    element: string;
    elementRu: string;
    dates: string;
    desc: string;
  }
> = {
  aries: {
    ru: "Овен",
    emoji: "♈",
    element: "огненные знаки",
    elementRu: "Огонь",
    dates: "21 марта — 19 апреля",
    desc: "Первооткрыватели, страстные и энергичные лидеры.",
  },
  taurus: {
    ru: "Телец",
    emoji: "♉",
    element: "земные знаки",
    elementRu: "Земля",
    dates: "20 апреля — 20 мая",
    desc: "Ценители комфорта, стабильности и материального блага.",
  },
  gemini: {
    ru: "Близнецы",
    emoji: "♊",
    element: "воздушные знаки",
    elementRu: "Воздух",
    dates: "21 мая — 20 июня",
    desc: "Интеллектуалы, мастера общения и генераторы идей.",
  },
  cancer: {
    ru: "Рак",
    emoji: "♋",
    element: "водные знаки",
    elementRu: "Вода",
    dates: "21 июня — 22 июля",
    desc: "Эмпаты с глубокой интуицией и привязанностью к дому.",
  },
  leo: {
    ru: "Лев",
    emoji: "♌",
    element: "огненные знаки",
    elementRu: "Огонь",
    dates: "23 июля — 22 августа",
    desc: "Харизматичные творцы, рожденные быть в центре внимания.",
  },
  virgo: {
    ru: "Дева",
    emoji: "♍",
    element: "земные знаки",
    elementRu: "Земля",
    dates: "23 августа — 22 сентября",
    desc: "Аналитики, стремящиеся к совершенству и порядку во всем.",
  },
  libra: {
    ru: "Весы",
    emoji: "♎",
    element: "воздушные знаки",
    elementRu: "Воздух",
    dates: "23 сентября — 22 октября",
    desc: "Дипломаты, ищущие гармонию, красоту и справедливость.",
  },
  scorpio: {
    ru: "Скорпион",
    emoji: "♏",
    element: "водные знаки",
    elementRu: "Вода",
    dates: "23 октября — 21 ноября",
    desc: "Мистики с мощной энергетикой и проницательностью.",
  },
  sagittarius: {
    ru: "Стрелец",
    emoji: "♐",
    element: "огненные знаки",
    elementRu: "Огонь",
    dates: "22 ноября — 21 декабря",
    desc: "Оптимисты, путешественники и искатели высшей истины.",
  },
  capricorn: {
    ru: "Козерог",
    emoji: "♑",
    element: "земные знаки",
    elementRu: "Земля",
    dates: "22 декабря — 19 января",
    desc: "Стратеги с несгибаемой волей и карьерными амбициями.",
  },
  aquarius: {
    ru: "Водолей",
    emoji: "♒",
    element: "воздушные знаки",
    elementRu: "Воздух",
    dates: "20 января — 18 февраля",
    desc: "Свободолюбивые новаторы с нестандартным мышлением.",
  },
  pisces: {
    ru: "Рыбы",
    emoji: "♓",
    element: "водные знаки",
    elementRu: "Вода",
    dates: "19 февраля — 20 марта",
    desc: "Мечтатели с безграничной фантазией и мудрой душой.",
  },
};

const GENERAL_TAGS = ["общий прогноз", "все знаки", "таро прогноз"];

// --- СЕО ОПТИМИЗАЦИЯ ДЛЯ КАЖДОГО ЗНАКА ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const signData = ZODIAC_DATA[resolved.sign];

  if (!signData) return { title: "Знак не найден" };

  return {
    title: `Гороскопы и Таро прогнозы для знака ${signData.ru} | Любовь, финансы`,
    description: `Все самые свежие и актуальные астрологические и таро-прогнозы для знака ${signData.ru} (${signData.dates}). Узнайте, что ждет вас в любви, карьере и финансах.`,
    keywords: [
      `гороскоп ${signData.ru}`,
      `таро прогноз ${signData.ru}`,
      `прогноз для ${signData.ru}`,
      `${signData.ru} любовь`,
      `${signData.ru} расклад`,
    ],
  };
}

// Предгенерация статических страниц для скорости
export function generateStaticParams() {
  return Object.keys(ZODIAC_DATA).map((sign) => ({ sign }));
}

export default async function ZodiacHubPage({
  params,
}: {
  params: Promise<{ sign: string }>;
}) {
  const resolved = await params;
  const signData = ZODIAC_DATA[resolved.sign];

  if (!signData) notFound();

  // --- ЛОГИКА ФИЛЬТРАЦИИ СТАТЕЙ ДЛЯ ЭТОГО ЗНАКА ---
  const allPosts = getSortedPostsData();
  const searchTags = [
    signData.ru.toLowerCase(),
    signData.element,
    ...GENERAL_TAGS,
  ];

  const signPosts = allPosts.filter((post) => {
    const postTags = (post.tags || []).map((t: string) => t.toLowerCase());
    return postTags.some((tag: string) => searchTags.includes(tag));
  });

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Гороскопы", href: "/horoscopes" },
            { label: signData.ru },
          ]}
        />

        {/* ШАПКА ХАБА (Журнальный стиль) */}
        <header className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-16 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

          <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg">
            {signData.emoji}
          </div>
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">
            Архив Прогнозов
          </span>
          <h1 className="text-5xl md:text-7xl font-black font-serif text-gray-900 mb-6">
            Знак зодиака {signData.ru}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            Стихия: <strong>{signData.elementRu}</strong> ({signData.dates})
            <br />
            {signData.desc}
          </p>
        </header>

        {/* СПИСОК СТАТЕЙ */}
        <h2 className="text-3xl font-black font-serif text-gray-900 mb-8 px-4">
          Все прогнозы для знака {signData.ru}
        </h2>

        {signPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signPosts.map((post) => {
              // Проверка актуальности для бейджа
              let isCurrent = false;
              if (post.date_start && post.date_end) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const end = new Date(post.date_end);
                end.setHours(23, 59, 59, 999);
                const start = new Date(post.date_start);
                start.setHours(0, 0, 0, 0);
                isCurrent = today >= start && today <= end;
              }

              // Авто-ресайз картинки Unsplash для карточки
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
                          Актуально
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-max mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
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
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <span className="text-4xl mb-4 block">🔮</span>
            <h3 className="text-2xl font-bold font-serif text-gray-900 mb-2">
              Пока ничего нет
            </h3>
            <p className="text-gray-500">
              Звезды готовят прогноз для знака {signData.ru}. Загляните позже!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
