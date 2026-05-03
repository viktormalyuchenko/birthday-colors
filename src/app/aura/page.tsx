"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const CHAKRAS_DATA: Record<number, any> = {
  1: {
    name: "Муладхара",
    aura: "Красная Аура",
    color1: "#ff4d4d",
    color2: "#8b0000",
    feature: "Выживание, сила и укорененность",
    desc: "У вас невероятно мощная, земная энергия. Вы лидер, который не боится трудностей и всегда твердо стоит на ногах. Ваша аура излучает уверенность.",
  },
  2: {
    name: "Свадхистана",
    aura: "Оранжевая Аура",
    color1: "#ff9933",
    color2: "#cc5200",
    feature: "Творчество, сексуальность и эмоции",
    desc: "Вы человек страстей. Ваша аура наполнена созидательной энергией. Люди тянутся к вам за теплом, вдохновением и радостью.",
  },
  3: {
    name: "Манипура",
    aura: "Желтая Аура",
    color1: "#ffcc00",
    color2: "#b38f00",
    feature: "Воля, интеллект и амбиции",
    desc: "Вы — генератор идей с солнечной аурой. Желтый цвет ауры говорит об остром уме, лидерских качествах и способности легко зарабатывать деньги.",
  },
  4: {
    name: "Анахата",
    aura: "Зеленая Аура",
    color1: "#33cc33",
    color2: "#006600",
    feature: "Любовь, баланс и сострадание",
    desc: "Ваша аура целительна. Вы излучаете покой и безусловную любовь. Окружающие чувствуют себя в безопасности рядом с вами.",
  },
  5: {
    name: "Вишудха",
    aura: "Голубая Аура",
    color1: "#33ccff",
    color2: "#007399",
    feature: "Самовыражение и истина",
    desc: "У вас аура оратора и философа. Вы умеете доносить правду и творчески выражать свои мысли. Вы не переносите лжи.",
  },
  6: {
    name: "Аджна",
    aura: "Синяя Аура (Индиго)",
    color1: "#3333ff",
    color2: "#000099",
    feature: "Интуиция и шестое чувство",
    desc: "Вы обладаете аурой мистика. У вас невероятно развита интуиция, и вы часто предвидите события до их наступления. Вы видите людей насквозь.",
  },
  7: {
    name: "Свадхистана",
    aura: "Оранжевая Аура",
    color1: "#ff9933",
    color2: "#cc5200",
    feature: "Творчество, сексуальность и эмоции",
    desc: "Вы человек страстей. Ваша аура наполнена созидательной энергией. Люди тянутся к вам за теплом, вдохновением и радостью.",
  },
  8: {
    name: "Муладхара",
    aura: "Красная Аура",
    color1: "#ff4d4d",
    color2: "#8b0000",
    feature: "Выживание, сила и укорененность",
    desc: "У вас невероятно мощная, земная энергия. Вы лидер, который не боится трудностей и всегда твердо стоит на ногах. Ваша аура излучает уверенность.",
  },
  9: {
    name: "Сахасрара",
    aura: "Фиолетовая Аура",
    color1: "#9933ff",
    color2: "#4d0099",
    feature: "Высшая мудрость и духовность",
    desc: "Вы обладаете редчайшей фиолетовой аурой старой души. Вы мудры не по годам, склонны к глобальному альтруизму и легко отпускаете материальное ради духовного.",
  },
};

export default function AuraPage() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateAura = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    const day = parseInt(date.split("-")[2], 10); // Берем только день рождения

    // Сводим день к числу от 1 до 9 (по ведической нумерологии влияет именно число рождения)
    let sum = day;
    while (sum > 9) {
      sum = sum
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
    setResult(CHAKRAS_DATA[sum]);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white py-16 px-4 overflow-hidden relative">
      {/* АНИМИРОВАННЫЙ ФОН АУРЫ */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-40 blur-[100px]"
        style={{
          background: result
            ? `radial-gradient(circle at 50% 50%, ${result.color1} 0%, ${result.color2} 50%, #050505 100%)`
            : "none",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: "Аура и Чакры" }]} textColor="#ffffff" />

        {!result ? (
          <div className="text-center animate-in fade-in duration-700 mt-12">
            <h1 className="text-5xl md:text-7xl font-black font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-2">
              Цвет вашей Ауры
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Ведическая нумерология (Санкхья-шастра) связывает день вашего
              рождения с одной из 7 чакр. Узнайте доминирующий цвет вашей ауры и
              вашу главную духовную силу.
            </p>
            <form
              onSubmit={calculateAura}
              className="flex flex-col sm:flex-row gap-4 justify-center bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md max-w-lg mx-auto"
            >
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-xl font-bold focus:outline-none flex-grow"
                style={{ colorScheme: "dark" }}
              />
              <button
                type="submit"
                className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-gray-200 transition-transform active:scale-95"
              >
                Узнать ауру
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in-95 fade-in duration-1000 mt-12">
            <span className="uppercase tracking-widest text-sm font-bold opacity-70 mb-4 inline-block">
              Доминирующая Чакра: {result.name}
            </span>
            <h1
              className="text-6xl md:text-8xl font-black font-serif mb-8 drop-shadow-2xl"
              style={{ color: result.color1 }}
            >
              {result.aura}
            </h1>

            {/* Круг-визуализация ауры */}
            <div
              className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full mb-12 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${result.color1} 0%, ${result.color2} 100%)`,
                boxShadow: `0 0 80px ${result.color1}`,
              }}
            />

            <div className="bg-white/10 p-8 md:p-12 rounded-[2.5rem] border border-white/20 backdrop-blur-xl text-left max-w-3xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-bold font-serif mb-4 text-white">
                Главная энергия: {result.feature}
              </h3>
              <p className="text-lg leading-relaxed text-gray-300 mb-8">
                {result.desc}
              </p>

              <button
                onClick={() => setResult(null)}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1"
              >
                Рассчитать другую дату
              </button>
            </div>
          </div>
        )}

        {/* SEO БЛОК ДЛЯ АУРЫ */}
        <article className="mt-32 pt-16 border-t border-white/10 prose prose-lg prose-invert max-w-4xl mx-auto text-gray-400">
          <h2 className="text-3xl font-black font-serif text-white mb-6">
            Как связаны чакры, аура и дата рождения?
          </h2>
          <p>
            В ведической астрологии и нумерологии считается, что число вашего
            рождения (день) несет самую мощную вибрационную нагрузку. Оно
            определяет вашу ведущую чакру — энергетический центр в теле
            человека.
          </p>
          <p>
            Цвет вашей ауры напрямую зависит от того, какая чакра у вас наиболее
            активна:
          </p>
          <ul className="text-gray-300">
            <li>
              <strong>Муладхара (Корневая)</strong> — Красный цвет. Отвечает за
              выживание и материальный достаток.
            </li>
            <li>
              <strong>Свадхистана (Сакральная)</strong> — Оранжевый цвет.
              Источник творчества и сексуальности.
            </li>
            <li>
              <strong>Манипура (Солнечное сплетение)</strong> — Желтый цвет.
              Центр воли, власти и интеллекта.
            </li>
            <li>
              <strong>Анахата (Сердечная)</strong> — Зеленый цвет. Отвечает за
              любовь, эмпатию и сострадание.
            </li>
            <li>
              <strong>Вишудха (Горловая)</strong> — Голубой цвет. Центр
              коммуникации и самовыражения.
            </li>
            <li>
              <strong>Аджна (Третий глаз)</strong> — Синий/Индиго. Отвечает за
              интуицию и предвидение.
            </li>
            <li>
              <strong>Сахасрара (Коронная)</strong> — Фиолетовый цвет. Центр
              духовного просветления.
            </li>
          </ul>
        </article>
      </div>
    </main>
  );
}
