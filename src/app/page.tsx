import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Энциклопедия цвета и характера | Colorstrology",
  description:
    "Узнайте свой личный цвет, лунную фазу и число судьбы. Главный агрегатор систем самопознания через цвет: Японский календарь, Нумерология, Colorstrology.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] text-gray-900 pb-24">
      {/* PREMIUM HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs mb-6">
            Энциклопедия цвета и характера
          </p>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-gray-950 font-serif leading-[1.1]">
            Познай себя <br className="hidden md:block" /> через цвет.
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Уникальный агрегатор систем самопознания. Японский календарь,
            цветовая нумерология и астрология.
          </p>
        </div>
      </section>

      {/* BENTO GRID (Премиальная сетка) */}
      <div className="max-w-7xl mx-auto px-4">
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
      </div>
    </main>
  );
}
