"use client";

import { useState, useId } from "react";
import Link from "next/link";
import moonPhasesInfo from "@/data/moon_phases_info.json";
import CompatibilityNav from "@/components/CompatibilityNav";

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
  const uniqueId = useId();
  const isWaxing = phase <= 0.5;
  const normalizedPhase = isWaxing ? phase * 2 : (phase - 0.5) * 2;
  const rx = Math.abs(Math.cos(normalizedPhase * Math.PI)) * 100;

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

  if (phase <= 0.01 || phase >= 0.99)
    d = "M 0,0";
  if (phase > 0.49 && phase < 0.51)
    d = `M 100,0 A 100,100 0 0,0 100,200 A 100,100 0 0,0 100,0`;

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full overflow-hidden ${glow ? "drop-shadow-[0_0_30px_rgba(255,255,255,0.7)]" : ""}`}
    >
      {/* Темный фон без рамок */}
      <div className="absolute inset-0 bg-[#0a0a0c] opacity-80" />

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
        {/* Увеличим масштаб картинки чуть-чуть (xMidYMid slice), чтобы срезать возможные черные края исходника */}
        <image
          href={MOON_IMAGE_URL}
          width="200"
          height="200"
          clipPath={`url(#moon-clip-${uniqueId})`}
          preserveAspectRatio="xMidYMid slice"
          filter="grayscale(100%) contrast(1.3) brightness(1.1)"
        />
      </svg>
    </div>
  );
}

// --- ГЛАВНАЯ СТРАНИЦА ---
export default function MoonPhaseTrend() {
  const [tab, setTab] = useState<"single" | "couple">("couple");

  // Состояния
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const [phase1, setPhase1] = useState<number | null>(null);
  const [phase2, setPhase2] = useState<number | null>(null);

  const [isMerging, setIsMerging] = useState(false);

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

        <CompatibilityNav active="moon" />
        <h1 className="text-4xl md:text-6xl font-serif font-black text-center mb-5 drop-shadow-md">
          Две даты. Две Луны.<br />Ваша общая картина.
        </h1>
        <p className="mb-8 max-w-2xl text-center text-lg leading-relaxed text-slate-300">Сравните фазы Луны в дни рождения — или узнайте свою. Даты рассчитываются приблизительно, без времени и места рождения.</p>

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
            Совместимость
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
                aria-label="Ваша дата рождения"
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
                  <RealisticMoon phase={phase1} size={220} glow={true} />
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
                  aria-label="Ваша дата рождения"
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
                  aria-label="Дата рождения второго человека"
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
                Сравнить Луны
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
                        : "translateX(-45px)",
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
                        : "translateX(45px)",
                      mixBlendMode: "screen",
                    }}
                  >
                    <RealisticMoon phase={phase2} size={220} glow={isMerging} />
                  </div>
                </div>

                <div
                  className={`mt-4 text-center transition-all duration-1000 ${isMerging ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <h2 className="text-3xl font-black font-serif mb-4 text-indigo-100">
                    Ваши Луны вместе
                  </h2>
                  <p className="mx-auto mb-6 max-w-lg text-slate-300">Наложение светлых частей двух лунных дисков. Это визуальный эксперимент, а не оценка совместимости отношений.</p>
                  <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">{[{phase:phase1,date:date1,label:"Первая Луна"},{phase:phase2,date:date2,label:"Вторая Луна"}].map(item=><div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-sm text-slate-400">{item.label} · {item.date}</p><h3 className="my-2 text-xl font-bold">{getPhaseInfo(item.phase).name}</h3><p className="text-indigo-200">Освещено примерно {Math.round((1-Math.cos(2*Math.PI*item.phase))*50)}%</p></div>)}</div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="relative z-10 mx-auto my-16 w-full max-w-3xl px-5 text-slate-300">
        <h2 className="mb-5 font-serif text-2xl font-bold text-white">Что показывает сравнение?</h2>
        <p className="mb-6 leading-relaxed">Для каждой даты мы оцениваем положение в лунном цикле и показываем освещённую часть диска. Близкие фазы выглядят похоже, а растущая и убывающая Луна могут дополнять друг друга на картинке.</p>
        <details className="border-t border-white/15 py-4"><summary className="cursor-pointer font-semibold text-white">Почему не нужен час рождения?</summary><p className="mt-3">Здесь используется приближённый расчёт по средней длине лунного цикла. Для точного астрономического результата, особенно около смены фаз, нужны время и более точные эфемериды.</p></details>
        <details className="border-t border-white/15 py-4"><summary className="cursor-pointer font-semibold text-white">Полная Луна означает идеальную пару?</summary><p className="mt-3">Нет. Наложение показывает сочетание двух изображений. Отношения не определяются фазами Луны.</p></details>
        <Link href="/color-compatibility" className="mt-6 inline-block rounded-xl bg-white px-6 py-4 font-bold text-gray-900">Теперь сравнить цвета рождения →</Link>
      </section>

    </main>
  );
}
