"use client";

import { useState, useRef, useId } from "react";
import Link from "next/link";
import moonPhasesInfo from "@/data/moon_phases_info.json";

// Высококачественная текстура Луны (прозрачный PNG)
const MOON_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg"; // Это временная JPG (ниже я применяю CSS фильтр, чтобы сделать черный фон прозрачным). В идеале загрузите PNG луны в папку /public/moon.png

// --- МАТЕМАТИКА ФАЗЫ ---
function getMoonPhase(dateString: string) {
  const date = new Date(dateString);
  const newMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const lunarCycle = 29.53058867;
  const diffTime = date.getTime() - newMoon.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  let phase = (diffDays % lunarCycle) / lunarCycle;
  if (phase < 0) phase += 1;
  return phase;
}

// Поиск описания фазы из JSON
function getPhaseInfo(phase: number) {
  return (
    moonPhasesInfo.find((p) => phase >= p.min && phase <= p.max) ||
    moonPhasesInfo[0]
  );
}

// --- КОМПОНЕНТ РЕАЛИСТИЧНОЙ ЛУНЫ ---
function RealisticMoon({
  phase,
  size = 150,
  glow = false,
}: {
  phase: number;
  size?: number;
  glow?: boolean;
}) {
  const uniqueId = useId(); // Генерируем уникальный ID для маски, чтобы луны не конфликтовали

  const isWaxing = phase <= 0.5;
  const normalizedPhase = isWaxing ? phase * 2 : (phase - 0.5) * 2;
  const rx = Math.abs(Math.cos(normalizedPhase * Math.PI)) * 100;

  // Строим SVG Path для ОСВЕЩЕННОЙ части
  let d = "";
  if (isWaxing) {
    if (normalizedPhase < 0.5)
      d = `M 100,0 A 100,100 0 0,1 100,200 A ${rx},100 0 0,0 100,0`;
    else d = `M 100,0 A 100,100 0 0,1 100,200 A ${rx},100 0 0,1 100,0`;
  } else {
    if (normalizedPhase < 0.5)
      d = `M 100,0 A 100,100 0 0,0 100,200 A ${rx},100 0 0,0 100,0`;
    else d = `M 100,0 A 100,100 0 0,0 100,200 A ${rx},100 0 0,1 100,0`;
  }

  // Если Полнолуние или Новолуние
  if (phase <= 0.01 || phase >= 0.99)
    d = `M 100,0 A 100,100 0 0,1 100,200 A 100,100 0 0,1 100,0`;
  if (phase > 0.49 && phase < 0.51)
    d = `M 100,0 A 100,100 0 0,0 100,200 A 100,100 0 0,0 100,0`;

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full ${glow ? "drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]" : ""}`}
    >
      {/* Темный фон (невидимая сторона Луны) */}
      <div className="absolute inset-0 rounded-full bg-neutral-900 opacity-60 border border-white/10" />

      {/* Освещенная текстура через SVG-маску */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="absolute inset-0"
      >
        <defs>
          <clipPath id={`moon-clip-${uniqueId}`}>
            <path d={d} />
          </clipPath>
        </defs>
        {/* Фильтр контраста и сепии для фото луны */}
        <image
          href={MOON_IMAGE_URL}
          width="200"
          height="200"
          clipPath={`url(#moon-clip-${uniqueId})`}
          preserveAspectRatio="xMidYMid slice"
          filter="grayscale(100%) contrast(1.2)"
        />
      </svg>
    </div>
  );
}

// --- ГЛАВНАЯ СТРАНИЦА ---
export default function MoonPhaseTrend() {
  const [tab, setTab] = useState<"single" | "couple">("single");

  // Состояния
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const [phase1, setPhase1] = useState<number | null>(null);
  const [phase2, setPhase2] = useState<number | null>(null);

  const [isMerging, setIsMerging] = useState(false);
  const [compatibility, setCompatibility] = useState(0);
  const [showTiktokStudio, setShowTiktokStudio] = useState(false);

  // Расчет Одиночной Луны
  const info1 = phase1 !== null ? getPhaseInfo(phase1) : null;

  const handleCalculateCouple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date1 || !date2) return;
    const p1 = getMoonPhase(date1);
    const p2 = getMoonPhase(date2);
    setPhase1(p1);
    setPhase2(p2);
    setIsMerging(false);

    const diff = Math.abs(p1 + p2 - 1);
    const score = Math.max(0, 100 - diff * 100);
    setCompatibility(Math.round(score));

    setTimeout(() => setIsMerging(true), 800);
  };

  const handleCalculateSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date1) return;
    setPhase1(getMoonPhase(date1));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white overflow-hidden relative flex flex-col font-sans">
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />

      <div className="relative z-10 p-4 md:p-6 flex flex-col items-center flex-grow max-w-5xl mx-auto w-full pt-12">
        <div className="w-full mb-10">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
          >
            ← Календарь
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-black text-center mb-8 drop-shadow-md">
          Лунные Фазы
        </h1>

        {/* Переключатель вкладок */}
        <div className="flex bg-white/10 p-1 rounded-full mb-12 backdrop-blur-md border border-white/5">
          <button
            onClick={() => {
              setTab("single");
              setPhase1(null);
            }}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${tab === "single" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-white"}`}
          >
            Моя Луна
          </button>
          <button
            onClick={() => {
              setTab("couple");
              setPhase1(null);
              setPhase2(null);
            }}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${tab === "couple" ? "bg-indigo-600 text-white shadow-md" : "text-gray-400 hover:text-white"}`}
          >
            Совместимость{" "}
            <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full uppercase">
              Тренд
            </span>
          </button>
        </div>

        {/* --- ВКЛАДКА 1: ОДИНОЧНАЯ ЛУНА (Как Moonglow) --- */}
        {tab === "single" && (
          <div className="w-full max-w-4xl">
            <form
              onSubmit={handleCalculateSingle}
              className="flex flex-col sm:flex-row gap-4 mb-16 justify-center"
            >
              <input
                type="date"
                required
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xl focus:outline-none"
                style={{ colorScheme: "dark" }}
              />
              <button
                type="submit"
                className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-gray-200 transition-transform active:scale-95"
              >
                Показать
              </button>
            </form>

            {phase1 !== null && info1 && (
              <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm animate-in fade-in zoom-in duration-700">
                <div className="flex-shrink-0">
                  <RealisticMoon phase={phase1} size={280} glow={true} />
                </div>
                <div>
                  <p className="text-gray-400 font-mono tracking-widest text-sm mb-2">
                    {new Date(date1).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black font-serif mb-2 text-indigo-100">
                    {info1.name}
                  </h2>
                  <h3 className="text-xl font-serif italic text-gray-400 mb-6">
                    {info1.en_name}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-300">
                    {info1.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- ВКЛАДКА 2: СОВМЕСТИМОСТЬ (Тренд TikTok) --- */}
        {tab === "couple" && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            <form
              onSubmit={handleCalculateCouple}
              className="flex flex-col md:flex-row gap-6 mb-16 w-full justify-center"
            >
              <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3">
                  Ваша дата
                </label>
                <input
                  type="date"
                  required
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-white focus:outline-none"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3">
                  Дата партнера
                </label>
                <input
                  type="date"
                  required
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-white focus:outline-none"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-3xl hover:bg-indigo-500 transition-transform active:scale-95 text-lg shadow-lg shadow-indigo-600/20"
              >
                Слить Луны ✨
              </button>
            </form>

            {phase1 !== null && phase2 !== null && (
              <div className="flex flex-col items-center w-full animate-in fade-in duration-1000">
                <div className="relative h-64 md:h-80 w-full flex justify-center items-center">
                  <div
                    className="absolute transition-all duration-[2500ms] ease-in-out"
                    style={{
                      transform: isMerging
                        ? "translateX(0)"
                        : "translateX(-130px)",
                      mixBlendMode: "screen",
                    }}
                  >
                    <RealisticMoon phase={phase1} size={220} glow={isMerging} />
                  </div>
                  <div
                    className="absolute transition-all duration-[2500ms] ease-in-out"
                    style={{
                      transform: isMerging
                        ? "translateX(0)"
                        : "translateX(130px)",
                      mixBlendMode: "screen",
                    }}
                  >
                    <RealisticMoon phase={phase2} size={220} glow={isMerging} />
                  </div>
                </div>

                <div
                  className={`mt-4 text-center transition-all duration-1000 ${isMerging ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <h2 className="text-7xl font-black font-serif mb-4 drop-shadow-md text-indigo-100">
                    {compatibility}%
                  </h2>
                  <button
                    onClick={() => setShowTiktokStudio(true)}
                    className="mt-6 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-3 mx-auto"
                  >
                    <span>📱</span> Снять для TikTok
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- СТУДИЯ ЗАПИСИ TIKTOK (ПОЛНЫЙ ЭКРАН) --- */}
      {showTiktokStudio && phase1 !== null && phase2 !== null && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
          {/* Кнопка закрытия (полупрозрачная, чтобы не мешала видео) */}
          <button
            onClick={() => setShowTiktokStudio(false)}
            className="absolute top-12 right-6 text-white/50 text-xl font-bold z-50 px-4 py-2 border border-white/20 rounded-full backdrop-blur-md"
          >
            Закрыть
          </button>

          <p className="absolute top-12 text-white/50 text-sm tracking-widest uppercase animate-pulse">
            Включите запись экрана
          </p>

          <div className="relative h-[400px] w-full flex justify-center items-center">
            {/* Анимация запускается заново при открытии студии благодаря keyframes (здесь используем простой CSS trick) */}
            <div
              className="absolute animate-[mergeLeft_4s_ease-in-out_forwards]"
              style={{ mixBlendMode: "screen" }}
            >
              <RealisticMoon phase={phase1} size={300} glow={true} />
            </div>
            <div
              className="absolute animate-[mergeRight_4s_ease-in-out_forwards]"
              style={{ mixBlendMode: "screen" }}
            >
              <RealisticMoon phase={phase2} size={300} glow={true} />
            </div>
          </div>

          <div className="mt-12 text-center animate-[fadeInUp_5s_ease-in-out_forwards] opacity-0">
            <h2 className="text-8xl font-black font-serif drop-shadow-lg">
              {compatibility}%
            </h2>
            <p className="text-2xl mt-4 text-gray-400 font-serif">
              Colorstrology.
            </p>
          </div>

          {/* Добавляем кастомные анимации в tailwind (через style) */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes mergeLeft { 0% { transform: translateX(-160px); } 100% { transform: translateX(0); } }
            @keyframes mergeRight { 0% { transform: translateX(160px); } 100% { transform: translateX(0); } }
            @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 80% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
          `,
            }}
          />
        </div>
      )}
    </main>
  );
}
