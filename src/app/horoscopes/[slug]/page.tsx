import { getPostData } from "@/lib/blog";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

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

  // --- ЛОГИКА АКТУАЛЬНОСТИ ПРОГНОЗА ---
  let statusBadge = null;
  let dateRangeText = null;

  if (
    postData.date_start &&
    postData.date_end &&
    postData.forecast_type !== "general"
  ) {
    const today = new Date();
    // Обнуляем время у today для корректного сравнения дат
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(postData.date_start);
    const endDate = new Date(postData.date_end);
    endDate.setHours(23, 59, 59, 999); // Прогноз действует до конца последнего дня

    // Форматируем для вывода (например: "10 мая - 16 мая")
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
    } else if (today < startDate) {
      statusBadge = (
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          Скоро начнется
        </div>
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-10 md:py-16 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        {" "}
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

            {/* Уменьшили размер текста на ПК с 6xl до 5xl, чтобы не занимал пол-экрана */}
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

          {/* Уменьшили высоту картинки на ПК (с 500px до 350px), чтобы текст сразу был виден */}
          <div className="w-full h-56 md:h-[350px] rounded-2xl md:rounded-3xl overflow-hidden mb-12 shadow-md relative">
            <img
              src={
                postData.coverImage ||
                "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000"
              }
              alt={postData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Основной текст статьи */}
            <div className="flex-grow overflow-x-auto pb-4">
              <div
                className="prose prose-base md:prose-lg prose-indigo min-w-full text-gray-700 prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />
            </div>
          </div>
        </article>
        <div className="mt-12 text-center">
          <a
            href="/horoscopes"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-colors shadow-lg active:scale-95"
          >
            ← Все прогнозы
          </a>
        </div>
      </div>
    </main>
  );
}
