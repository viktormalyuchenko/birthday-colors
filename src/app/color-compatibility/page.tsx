"use client";

import { useState } from "react";
import Link from "next/link";
import japaneseColors from "@/data/birthday_colors.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompatibilityNav from "@/components/CompatibilityNav";

// --- МАТЕМАТИКА ЦВЕТА: Перевод HEX в HSL ---
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// --- ОПРЕДЕЛЕНИЕ СЕМЕЙСТВА ЦВЕТА ПО ВАШИМ ПРАВИЛАМ ---
function getColorFamily(hex: string): string {
  const { h, s, l } = hexToHSL(hex);

  // Белый
  if (l > 85) return "Белый";
  // Черный / Серый
  if (s < 15 && l <= 85) return "Черный/Серый";
  // Коричневый
  if (h >= 20 && h <= 40 && l < 50) return "Коричневый";

  // Яркие цвета (Saturation > 15%)
  if (h >= 0 && h <= 20) return "Красный";
  if (h >= 330 && h <= 360) return "Красный";

  if (h >= 21 && h <= 70) return "Оранжевый/Желтый";
  if (h >= 71 && h <= 160) return "Зеленый";
  if (h >= 161 && h <= 260) return "Синий/Голубой";
  if (h >= 261 && h <= 329) return "Пурпурный/Розовый";

  return "Нейтральный";
}

// --- СЛОВАРЬ СОВМЕСТИМОСТИ (Ключи строго отсортированы по алфавиту!) ---
function getCompatibilityText(family1: string, family2: string) {
  // Сортировка: Б, З, Ко, Кр, Н, О, П, С, Ч
  const mix = [family1, family2].sort().join(" + ");

  const rules: Record<string, string> = {
    // Белый + ...
    "Белый + Зеленый":
      "Свет и Природа. Идеальная гармония. Белый дает Зеленому чистоту помыслов и пространство для роста, а Зеленый заземляет Белый, даря ему жизненную силу.",
    "Белый + Пурпурный/Розовый":
      "Облако и Цвет. Очень нежный и возвышенный союз. Белый подчеркивает благородство Пурпурного, создавая отношения, полные эстетики и взаимного восхищения.",
    "Белый + Черный/Серый":
      "Инь и Ян. Вы идеально уравновешиваете друг друга. Белый приносит оптимизм и новые идеи, а Черный/Серый отвечает за надежность, защиту и структуру.",
    "Белый + Коричневый":
      "Чистый холст на дереве. Лаконичный и честный союз. Вы стремитесь к простоте и ясности. Коричневый дает опору, а Белый — свежий взгляд на привычные вещи.",

    // Зеленый + ...
    "Зеленый + Красный":
      "Дополнение противоположностей. Вы стимулируете друг друга к действиям. Зеленый приносит стабильность, а Красный — не дает отношениям покрыться рутиной.",
    "Зеленый + Синий/Голубой":
      "Земля и Вода. Очень естественный, питающий союз. Вода (Синий) помогает Дереву (Зеленый) расти. Вы создаете друг для друга зону абсолютного комфорта.",
    "Зеленый + Оранжевый/Желтый":
      "Солнце и Лес. Теплый, созидательный союз. Желтый освещает путь и дает идеи, а Зеленый помогает этим идеям пустить корни и принести плоды.",
    "Зеленый + Коричневый":
      "Дерево и Листва. Невероятно устойчивый и «тихий» союз. Вы оба цените традиции, уют и подлинность. В этой паре всегда есть чувство безопасности.",
    "Зеленый + Пурпурный/Розовый":
      "Цветок в саду. Редкое и красивое сочетание. Пурпурный дает паре мечту и фантазию, а Зеленый — условия для того, чтобы эта мечта стала реальностью.",

    // Коричневый + ...
    "Коричневый + Красный":
      "Раскаленная лава. Мощный, материальный союз. Коричневый дает безумной энергии Красного форму и направление, помогая добиваться реального успеха в жизни.",
    "Коричневый + Оранжевый/Желтый":
      "Осенний урожай. Очень уютный, «хюгге» союз. Вы оба цените материальный мир, вкусную еду и комфорт. Вместе вы создаете самый гостеприимный дом.",

    // Красный + ...
    "Красный + Синий/Голубой":
      "Огонь и Вода. Бурные отношения. Красный дает Синему смелость и страсть, а Синий остужает излишнюю импульсивность Красного, принося глубину.",
    "Красный + Красный":
      "Двойное пламя. Невероятно страстный и энергичный союз. Вы можете свернуть горы вместе, если научитесь уступать друг другу лидерство.",
    "Красный + Оранжевый/Желтый":
      "Чистая энергия. Очень яркий и оптимистичный союз. Вы — пара, которая всегда в движении. Главный риск — эмоциональное перегорание, важно уметь отдыхать в тишине.",
    "Красный + Черный/Серый":
      "Стиль и Сила. Союз власти и амбиций. Черный придает Красному авторитетность и сдержанность, создавая имидж очень влиятельной и уверенной пары.",

    // Оранжевый/Желтый + ...
    "Оранжевый/Желтый + Пурпурный/Розовый":
      "Радость и Мистика. Очень творческий союз. Желтый приносит в пару веселье и легкость, а Пурпурный наполняет отношения глубоким духовным смыслом.",
    "Оранжевый/Желтый + Синий/Голубой":
      "Комплиментарный контраст. Вы — две половины одного целого. Желтый дает паре яркость и радость, а Синий — спокойствие и глубину. Вы закрываете «слепые зоны» друг друга.",

    // Пурпурный/Розовый + ...
    "Пурпурный/Розовый + Синий/Голубой":
      "Сумерки и Космос. Созерцательный, глубокий союз. Пурпурный вносит ноту интуиции, а Синий — логики. Вы идеально подходите для совместных размышлений и творчества.",
    "Пурпурный/Розовый + Черный/Серый":
      "Тайная страсть. Сочетание строгости и глубоких чувств. Пурпурный смягчает холод Черного, а Черный защищает ранимость Пурпурного от внешнего мира.",

    // Синий/Голубой + ...
    "Синий/Голубой + Синий/Голубой":
      'Океан спокойствия. Вы понимаете друг друга без слов. Глубокая интеллектуальная и эмоциональная связь, но важно иногда добавлять "огня", чтобы не заскучать.',
    "Синий/Голубой + Черный/Серый":
      "Ночное небо. Союз, основанный на уважении к личным границам и интеллекту. Вы не требуете лишних слов, давая друг другу поддержку в тишине.",

    // Черный/Серый + ...
    "Черный/Серый + Черный/Серый":
      "Монолит. Союз двух сильных, самодостаточных личностей. Вы — надежная крепость, но важно не превратить отношения в холодную стену, проявляя больше тепла.",
  };

  return (
    rules[mix] ||
    `Уникальный союз: ${family1} + ${family2}. Ваши энергии сплетаются в непредсказуемый, но прекрасный узор. Вы учитесь друг у друга терпению и открываете новые грани мира.`
  );
}

// --- КОМПОНЕНТ СТРАНИЦЫ ---
export default function ColorCompatibility() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [color1, setColor1] = useState<any>(null);
  const [color2, setColor2] = useState<any>(null);
  const [resultText, setResultText] = useState("");
  const [families, setFamilies] = useState<{ f1: string; f2: string } | null>(
    null,
  );

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date1 || !date2) return;

    const key1 = date1.split("-").slice(1).join("");
    const key2 = date2.split("-").slice(1).join("");

    const c1 = (japaneseColors as any)[key1];
    const c2 = (japaneseColors as any)[key2];

    if (c1 && c2) {
      setColor1(c1);
      setColor2(c2);
      const fam1 = getColorFamily(c1.hex);
      const fam2 = getColorFamily(c2.hex);
      setFamilies({ f1: fam1, f2: fam2 });
      setResultText(getCompatibilityText(fam1, fam2));
    }
  };

  // Вычисление контрастного текста для кругов
  const getContrastYIQ = (hex: string) => {
    const { l } = hexToHSL(hex);
    return l > 65 ? "#111827" : "#ffffff";
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Совместимость цветов" }]} />
        <CompatibilityNav active="color" />
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-serif">
          Два цвета.<br />Одна палитра.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-3xl leading-relaxed">
          Сравните цвета рождения по японскому календарю. Посмотрите два оттенка рядом и найдите сочетание для вашей общей палитры. Год не влияет на цвет.
        </p>

        <form
          onSubmit={calculateCompatibility}
          className="flex flex-col md:flex-row gap-4 mb-16 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 relative z-20"
        >
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Ваша дата
            </label>
            <input
              type="date"
              aria-label="Ваша дата рождения"
              required
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-gray-50 text-xl font-bold border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Дата партнера
            </label>
            <input
              type="date"
              aria-label="Дата рождения второго человека"
              required
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-gray-50 text-xl font-bold border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white font-bold px-10 py-4 rounded-xl hover:bg-indigo-600 transition-colors mt-6 md:mt-0 text-lg shadow-lg active:scale-95"
          >
            Показать нашу палитру
          </button>
        </form>

        {color1 && color2 && families && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8 grid grid-cols-2 gap-3">{[color1,color2].map((color,index)=><Link href={`/${color.date_mmdd}`} key={index} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><div className="h-28 md:h-40" style={{backgroundColor:color.hex}}/><div className="p-4"><p className="text-xs text-gray-500">{index===0?"Ваш оттенок":"Второй оттенок"}</p><h2 className="my-2 font-serif text-lg font-bold">{color.ru_name}</h2><p className="font-mono text-sm">{color.hex}</p><span className="mt-3 inline-block text-sm text-indigo-700">О цвете →</span></div></Link>)}</div>
            {/* КРУГИ СЛИЯНИЯ */}
            <div className="flex justify-center items-center mb-12 relative h-56 md:h-64">
              <div
                className="w-36 h-36 md:w-56 md:h-56 rounded-full shadow-2xl absolute left-1/2 -translate-x-[85%] mix-blend-multiply flex flex-col items-center justify-center text-center p-4 transition-all duration-1000"
                style={{
                  backgroundColor: color1.hex,
                  color: getContrastYIQ(color1.hex),
                }}
              >
                <span className="text-xs uppercase tracking-widest mb-2 opacity-80">
                  {families.f1}
                </span>
                <span className="font-black text-xl md:text-2xl leading-tight">
                  {color1.ru_name}
                </span>
              </div>

              <div
                className="w-36 h-36 md:w-56 md:h-56 rounded-full shadow-2xl absolute left-1/2 -translate-x-[15%] mix-blend-multiply flex flex-col items-center justify-center text-center p-4 transition-all duration-1000"
                style={{
                  backgroundColor: color2.hex,
                  color: getContrastYIQ(color2.hex),
                }}
              >
                <span className="text-xs uppercase tracking-widest mb-2 opacity-80">
                  {families.f2}
                </span>
                <span className="font-black text-xl md:text-2xl leading-tight">
                  {color2.ru_name}
                </span>
              </div>
            </div>

            {/* РЕЗУЛЬТАТ */}
            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden max-w-4xl mx-auto">
              {/* Декоративная полоса градиента */}
              <div
                className="absolute top-0 left-0 w-3 h-full opacity-80"
                style={{
                  background: `linear-gradient(to bottom, ${color1.hex}, ${color2.hex})`,
                }}
              ></div>

              <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-4 ml-4">
                Символическая интерпретация сочетания
              </h3>
              <h2 className="text-3xl md:text-4xl font-black font-serif mb-6 ml-4 text-gray-900">
                {families.f1} + {families.f2}
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-600 ml-4">
                {resultText}
              </p>
              <p className="ml-4 mt-6 text-sm text-gray-500">Описание — образная трактовка цветовых семейств, а не психологический тест отношений.</p>
              <Link href="/moon-phase" className="ml-4 mt-6 inline-block font-bold text-indigo-700">Сравнить ещё и фазы Луны →</Link>
            </div>
          </div>
        )}
        <article className="mt-16 max-w-3xl space-y-5 border-t border-gray-200 pt-10 text-gray-600">
          <h2 className="font-serif text-3xl font-bold text-gray-900">Как использовать палитру пары</h2>
          <p>Выберите один оттенок основным, а второй используйте в деталях: открытке, упаковке подарка, совместной фотографии или декоре. Можно добавить нейтральный фон, чтобы цвета лучше различались.</p>
          <details className="border-t py-4"><summary className="cursor-pointer font-semibold text-gray-900">Как определяются цвета?</summary><p className="mt-3">День и месяц каждой даты сопоставляются с японским календарём сайта. Описание сочетания выбирается по семействам оттенков. Год рождения не участвует в расчёте.</p></details>
          <details className="border-t py-4"><summary className="cursor-pointer font-semibold text-gray-900">Одинаковые цвета — это хороший результат?</summary><p className="mt-3">Это значит, что ваши даты связаны с одинаковыми или похожими оттенками. У палитры нет оценки «хорошо» или «плохо»: выбирайте сочетание, которое нравится вам обоим.</p></details>
        </article>
      </div>
    </main>
  );
}
