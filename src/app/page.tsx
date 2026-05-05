"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import japaneseColors from "@/data/birthday_colors.json";
import pantoneMonths from "@/data/pantone_months.json";
import weekdayColors from "@/data/weekday_colors.json";

function getContrast(hex: string) {
  if (!hex) return "#111827";
  const h = hex.replace("#", "");
  if (h.length !== 6) return "#111827";
  const yiq =
    (parseInt(h.substring(0, 2), 16) * 299 +
      parseInt(h.substring(2, 4), 16) * 587 +
      parseInt(h.substring(4, 6), 16) * 114) /
    1000;
  return yiq >= 128 ? "#111827" : "#ffffff";
}

export default function Home() {
  const [todayData, setTodayData] = useState<any>(null);

  useEffect(() => {
    // Получаем текущую дату (используем часовой пояс Москвы для точности)
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
    );
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const dayOfWeek = today.getDay(); // 0 - Воскресенье, 1 - Понедельник...
    const monthDeclensions = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    setTodayData({
      dateStr: `${today.getDate()} ${monthDeclensions[today.getMonth()]}`,
      japanese: (japaneseColors as any)[`${mm}${dd}`],
      pantoneMonth: (pantoneMonths as any)[String(today.getMonth() + 1)],
      weekday: (weekdayColors as any)[String(dayOfWeek)],
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F9F8] text-gray-900 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Что такое цвет по дате рождения?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Это ваш персональный энергетический маркер. В разных культурах (японский календарь, нумерология) дню рождения присваивается определенный оттенок, отражающий ваши таланты и природу души.",
                },
              },
              {
                "@type": "Question",
                name: "Как рассчитать совместимость по фазам луны?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "В нашем калькуляторе вы вводите две даты рождения. Алгоритм вычисляет лунные фазы и накладывает их друг на друга. Если они образуют идеальное Полнолуние — у вас высокая совместимость.",
                },
              },
              {
                "@type": "Question",
                name: "Как использовать цвет сегодняшнего дня?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ношение одежды или аксессуаров 'цвета дня' помогает заручиться поддержкой правящей планеты, привлечь удачу и защититься от стресса.",
                },
              },
            ],
          }),
        }}
      />
      {/* --- SEO ЗАГОЛОВОК И HERO --- */}
      <section className="pt-16 pb-10 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 font-serif tracking-tight text-gray-900 leading-tight">
          Цвет дня <br /> и даты рождения
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-2">
          Узнайте, какие оттенки управляют вашей судьбой и сегодняшним днем.
        </p>
      </section>

      {/* --- БЛОК 1: ЦВЕТ СЕГОДНЯШНЕГО ДНЯ (Динамический) --- */}
      {todayData && (
        <section className="max-w-7xl mx-auto px-4 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-4 ml-4">
            Сегодня: {todayData.dateStr}
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Карточка 1: День Недели (Ведическая астрология) */}
            <div
              className="lg:col-span-2 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shadow-xl transition-all"
              style={{
                backgroundColor: todayData.weekday.hex,
                color: getContrast(todayData.weekday.hex),
              }}
            >
              <div>
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block"
                  style={{
                    backgroundColor:
                      getContrast(todayData.weekday.hex) === "#ffffff"
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.1)",
                  }}
                >
                  Энергия недели
                </span>
                <h3 className="text-4xl md:text-6xl font-black font-serif mb-2">
                  {todayData.weekday.day}
                </h3>
                <p className="text-xl md:text-2xl font-serif italic opacity-90 mb-8">
                  Планета: {todayData.weekday.planet}
                </p>
                <div
                  className="text-lg md:text-xl font-medium p-6 rounded-3xl mb-6 shadow-sm"
                  style={{
                    backgroundColor:
                      getContrast(todayData.weekday.hex) === "#ffffff"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                  }}
                >
                  {todayData.weekday.energy}
                </div>
                <p className="opacity-95 leading-relaxed text-lg mb-4">
                  <strong>Рекомендованные цвета:</strong>{" "}
                  {todayData.weekday.colors_list}
                </p>
                <p className="opacity-80 leading-relaxed text-sm md:text-base">
                  {todayData.weekday.advice}
                </p>
              </div>
            </div>

            {/* Колонка справа: Японский цвет и Месяц */}
            <div className="flex flex-col gap-6">
              {/* Карточка 2: Японский цвет на сегодня */}
              <Link
                href={`/${todayData.japanese.date_mmdd}`}
                className="flex-1 rounded-[2.5rem] p-8 flex flex-col justify-end shadow-md hover:shadow-xl transition-all group border border-gray-100"
                style={{
                  backgroundColor: todayData.japanese.hex,
                  color: getContrast(todayData.japanese.hex),
                }}
              >
                <span className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
                  Японский календарь
                </span>
                <h3 className="text-3xl md:text-4xl font-black font-serif mb-2 group-hover:scale-105 origin-left transition-transform">
                  {todayData.japanese.ru_name}
                </h3>
                <p className="opacity-80 italic font-serif text-lg mb-4">
                  {todayData.japanese.en_name}
                </p>
                <p className="text-sm opacity-90 mb-4 line-clamp-3">
                  "{todayData.japanese.ru_feature}"
                </p>
                <span className="font-bold text-sm uppercase tracking-wider">
                  Подробнее →
                </span>
              </Link>

              {/* Карточка 3: Цвет Месяца Pantone */}
              <div
                className="flex-1 rounded-[2.5rem] p-8 flex flex-col shadow-md border border-gray-100"
                style={{
                  backgroundColor: todayData.pantoneMonth.hex,
                  color: getContrast(todayData.pantoneMonth.hex),
                }}
              >
                <span className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
                  Цвет месяца ({todayData.pantoneMonth.month})
                </span>
                <h3 className="text-3xl font-black font-serif mb-2">
                  {todayData.pantoneMonth.color}
                </h3>
                <p className="text-sm font-bold opacity-90 mb-2">
                  {todayData.pantoneMonth.feature}
                </p>
                <p className="text-sm opacity-80 mt-auto">
                  {todayData.pantoneMonth.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- БЛОК 2: СИСТЕМЫ САМОПОЗНАНИЯ (Наши старые карточки Bento) --- */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 ml-4">
          Все системы портала
        </h2>

        {/* Ваш предыдущий код сетки с карточками (Японский, Нумерология, Луна и т.д.) вставьте сюда без изменений! */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* РЯД 1 ------------------------------------------------ */}
          {/* 1. Японский календарь (2 колонки) */}
          <Link
            href="/japanese-colors"
            className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-gray-950 text-white p-10 md:p-14 flex flex-col justify-end min-h-[400px] shadow-2xl transition-transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop')] opacity-20 group-hover:opacity-30 transition-opacity bg-cover bg-center mix-blend-luminosity" />
            <div className="relative z-10">
              <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                База 366 дней
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                Японский
                <br />
                календарь
              </h2>
              <p className="text-gray-300 text-lg max-w-md mb-8">
                Система Tanjoshoku. Узнайте свой личный оттенок по дате рождения
                и откройте тайны своего характера.
              </p>
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all">
                Открыть календарь <span className="text-xl">→</span>
              </span>
            </div>
          </Link>

          {/* 2. Нумерология (1 колонка) */}
          <Link
            href="/numerology"
            className="group rounded-[2.5rem] bg-indigo-50 p-10 md:p-12 flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl hover:bg-indigo-100 transition-all border border-indigo-100/50"
          >
            <div>
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-serif italic mb-6">
                N
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Цветовая
                <br />
                Нумерология
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Рассчитайте свое Число Судьбы и узнайте цвет вашей ауры,
                планету-покровителя и скрытые таланты.
              </p>
            </div>
            <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mt-8 group-hover:translate-x-2 transition-transform inline-block">
              Рассчитать →
            </span>
          </Link>

          {/* РЯД 2 ------------------------------------------------ */}
          {/* 3. Лунные цвета (1 колонка) */}
          <Link
            href="/moon-colors"
            className="group rounded-[2.5rem] bg-rose-50 p-10 md:p-12 flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl hover:bg-rose-100 transition-all border border-rose-100/50"
          >
            <div>
              <div className="w-14 h-14 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl mb-6">
                ☾
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Лунный
                <br />
                Знак
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ведическая астрология эмоций. Выберите свой лунный знак, чтобы
                узнать цвет своего подсознания.
              </p>
            </div>
            <span className="text-rose-600 font-bold uppercase tracking-wider text-sm mt-8 group-hover:translate-x-2 transition-transform inline-block">
              Узнать цвет →
            </span>
          </Link>

          {/* 4. Pantone Colorstrology (2 колонки) */}
          <Link
            href="/pantone"
            className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-200 p-10 md:p-14 flex flex-col justify-center min-h-[400px] shadow-sm hover:shadow-lg transition-shadow"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Pantone Colorstrology
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mb-8">
              Система Мишель Бернхардт. 366 цветов Pantone и 12 цветов месяцев,
              объединяющие астрологию и психологию цвета.
            </p>
            <div className="flex gap-2">
              {["#CDA37F", "#D3B7D6", "#B1DBD9", "#E35D52"].map((color) => (
                <div
                  key={color}
                  className="w-12 h-12 rounded-full border-4 border-white shadow-md"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </Link>

          {/* РЯД 3 ------------------------------------------------ */}
          {/* 5. Фаза Луны (2 колонки) */}
          <Link
            href="/moon-phase"
            className="group md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-gray-950 text-white p-10 md:p-14 flex flex-col justify-end min-h-[400px] shadow-2xl transition-transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop')] opacity-20 group-hover:opacity-30 transition-opacity bg-cover bg-center mix-blend-luminosity" />
            <div className="relative z-10">
              <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                Фаза Луны
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                Лунные
                <br />
                фазы
              </h2>
              <p className="text-gray-300 text-lg max-w-md mb-8">
                Узнайте, создают ли ваши души Идеальную Полную Луну. Тренд,
                покоривший миллионы сердец.
              </p>
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all">
                Проверить совместимость <span className="text-xl">→</span>
              </span>
            </div>
          </Link>

          {/* 6. Цвет имени (1 колонка - адаптировано под дизайн узких карточек) */}
          <Link
            href="/name-color"
            className="group rounded-[2.5rem] bg-orange-50 p-10 md:p-12 flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl hover:bg-orange-100 transition-all border border-orange-100/50"
          >
            <div>
              <div className="w-14 h-14 bg-orange-400 text-white rounded-full flex items-center justify-center text-2xl font-serif italic mb-6">
                Aa
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">
                Цвет имени
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ваша личная палитра. Узнайте цвет своей души по буквам имени и
                откройте новые грани своей личности.
              </p>
            </div>
            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm mt-8 group-hover:translate-x-2 transition-transform inline-block">
              Узнать цвет →
            </span>
          </Link>

          <Link
            href="/luscher-test"
            className="group rounded-[2.5rem] bg-emerald-50 p-10 md:p-12 flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl hover:bg-emerald-100 transition-all border border-emerald-100/50 relative overflow-hidden"
          >
            {/* Маленькие цветные кружочки Люшера для декора */}
            <div className="absolute top-10 right-10 flex gap-1 opacity-60">
              <div className="w-4 h-4 rounded-full bg-[#1C3B70]"></div>
              <div className="w-4 h-4 rounded-full bg-[#EED244]"></div>
              <div className="w-4 h-4 rounded-full bg-[#C23531]"></div>
            </div>

            <div>
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mb-6">
                👁
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">
                Тест
                <br />
                Люшера
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Глубокий психологический анализ. Выберите цвета и узнайте свои
                истинные цели, скрытые тревоги и уровень стресса.
              </p>
            </div>
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mt-8 group-hover:translate-x-2 transition-transform inline-block">
              Пройти тест →
            </span>
          </Link>

          {/* РЯД 4 ------------------------------------------------ */}
          {/* 7. Совместимость по Японским цветам (3 колонки - НА ВСЮ ШИРИНУ ВНИЗУ) */}
          <Link
            href="/color-compatibility"
            className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-indigo-50 p-8 md:p-14 flex flex-col justify-end min-h-[400px] shadow-sm hover:shadow-xl hover:bg-indigo-100 transition-all border border-indigo-100/50"
          >
            {/* Декоративные круги */}
            <div className="absolute top-10 right-10 flex -space-x-8 opacity-60 group-hover:scale-110 transition-transform">
              <div className="w-24 h-24 rounded-full bg-rose-400 mix-blend-multiply blur-sm"></div>
              <div className="w-24 h-24 rounded-full bg-blue-400 mix-blend-multiply blur-sm"></div>
            </div>

            <div className="relative z-10 w-full md:w-3/4">
              <span className="bg-indigo-200/50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                Цветовая химия
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-gray-900 leading-tight">
                Совместимость
                <br />
                Цветов
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
                Смешайте цвета своих душ. Введите две даты рождения, чтобы
                узнать психологическую химию вашей пары и ваш потенциал.
              </p>
              <span className="inline-flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all">
                Проверить пару <span className="text-xl">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-24 mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-serif mb-8 text-center">
          О проекте Colorstrology
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Что такое цвет по дате рождения?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Это ваш персональный энергетический маркер. В разных культурах (от
              японского календаря Tanjoshoku до цветовой нумерологии Пифагора)
              дню рождения присваивается определенный оттенок. Этот цвет
              отражает ваши скрытые таланты, сильные стороны и истинную природу
              вашей души.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Как работают лунные фазы и совместимость?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Тренд на совместимость по фазе Луны (Moon Phase Soulmates) основан
              на поиске астрономического дополнения. В нашем калькуляторе вы
              вводите две даты, а алгоритм математически вычисляет фазы и
              накладывает их друг на друга. Если ваши луны образуют идеальное
              Полнолуние — вы являетесь родственными душами.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Как использовать свой цвет дня?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Согласно ведической астрологии, каждому дню недели
              покровительствует своя планета и свой цвет (например, красный для
              вторника — дня Марса). Вы можете носить одежду или аксессуары
              "цвета дня" или "цвета вашего рождения", чтобы защититься от
              стресса, привлечь удачу и гармонизировать свое состояние.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
