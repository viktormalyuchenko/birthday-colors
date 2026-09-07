"use client";

import Link from "next/link";
import { useState } from "react";
import numerologyData from "@/data/numerology_colors.json";
import Breadcrumbs from "@/components/Breadcrumbs";

const LETTER_VALUES: Record<string, number> = {
  a: 1,
  j: 1,
  s: 1,
  b: 2,
  k: 2,
  t: 2,
  c: 3,
  l: 3,
  u: 3,
  d: 4,
  m: 4,
  v: 4,
  e: 5,
  n: 5,
  w: 5,
  f: 6,
  o: 6,
  x: 6,
  g: 7,
  p: 7,
  y: 7,
  h: 8,
  q: 8,
  z: 8,
  i: 9,
  r: 9,
  а: 1,
  и: 1,
  с: 1,
  ъ: 1,
  б: 2,
  й: 2,
  т: 2,
  ы: 2,
  в: 3,
  к: 3,
  у: 3,
  ь: 3,
  г: 4,
  л: 4,
  ф: 4,
  э: 4,
  д: 5,
  м: 5,
  х: 5,
  ю: 5,
  е: 6,
  ё: 6,
  н: 6,
  ц: 6,
  я: 6,
  о: 7,
  ч: 7,
  ж: 8,
  п: 8,
  ш: 8,
  з: 9,
  р: 9,
  щ: 9,
};

function getContrastYIQ(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? "#000" : "#fff";
}

export default function NameColorPage() {
  const [error, setError] = useState("");
  const [calculation, setCalculation] = useState("");
  const [name, setName] = useState("");
  const [palette, setPalette] = useState<{ char: string; color: any }[]>([]);
  const [finalColor, setFinalColor] = useState<any>(null);

  const calculateName = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/[а-яёa-z]/i.test(name)) { setError("Введите имя русскими или латинскими буквами."); setFinalColor(null); return; }

    let sum = 0;
    const newPalette = [];

    for (let char of name.toLowerCase()) {
      if (LETTER_VALUES[char]) {
        const num = LETTER_VALUES[char];
        sum += num;
        newPalette.push({
          char: char.toUpperCase(),
          color: (numerologyData as any)[num.toString()],
        });
      } else if (char !== " ") {
        newPalette.push({ char: char.toUpperCase(), color: null });
      }
    }

    const steps = [sum];
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
      steps.push(sum);
    }

    setCalculation(steps.join(" → "));
    setPalette(newPalette);
    setFinalColor((numerologyData as any)[sum.toString()]);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Цветовой код имени" }]} />

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-serif tracking-tight">
          Какого цвета ваше имя?
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-3xl leading-relaxed">
          Превратите имя в цветной штрихкод: каждая буква получает оттенок, а сумма букв — общий цвет. Попробуйте полное и короткое имя и сравните палитры.
        </p>

        <form
          onSubmit={calculateName}
          className="flex flex-col md:flex-row gap-4 mb-20 bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100"
        >
          <input
            aria-label="Имя или имя и фамилия"
            maxLength={60}
            type="text"
            required
            placeholder="Например: Анна Смирнова"
            value={name}
            onChange={(e) => { setName(e.target.value); setFinalColor(null); setError(""); }}
            className="flex-grow px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white font-bold px-10 py-4 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg active:scale-95"
          >
            Показать цвета имени
          </button>
        </form>

        {error && <p role="alert" className="text-red-700 mb-6">{error}</p>}
        {finalColor && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-4 text-center">
              Цветовой Штрих-код
            </h3>

            {/* КРАСИВЫЙ ШТРИХ-КОД */}
            <div className="w-full flex h-32 md:h-48 rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">
              {palette.map((item, i) =>
                item.color ? (
                  <div
                    key={i}
                    className="min-w-0 flex-1 h-full flex flex-col justify-end items-center pb-4 transition-all duration-500 hover:flex-grow-[3]"
                    style={{
                      backgroundColor: item.color.hex,
                      color: getContrastYIQ(item.color.hex),
                    }}
                  >
                    <span className="font-black text-xs sm:text-lg drop-shadow-md">
                      {item.char}
                    </span>
                  </div>
                ) : (
                  <div key={i} className="w-4 md:w-8 bg-transparent"></div>
                ),
              )}
            </div>

            <p className="text-center text-gray-500 text-sm mb-16 max-w-2xl mx-auto">
              Каждая полоса соответствует букве. Числовая сумма: {calculation}. Цвета — условные соответствия этой системы, а не характеристика личности.
            </p>

            {/* ИТОГОВЫЙ ЦВЕТ ИМЕНИ */}
            <div
              className="p-10 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: finalColor.hex,
                color: getContrastYIQ(finalColor.hex),
              }}
            >
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <span className="text-[15rem] font-serif leading-none italic">
                  {finalColor.number}
                </span>
              </div>

              <div className="relative z-10 max-w-2xl">
                <p className="uppercase tracking-widest text-sm font-bold opacity-80 mb-4 border-b border-current/20 pb-2 inline-block">
                  Итоговый цвет имени
                </p>
                <h2 className="text-4xl md:text-7xl break-words font-black font-serif mb-6">
                  {finalColor.ru_name}
                </h2>
                <div className="text-2xl font-serif italic opacity-90 mb-8">
                  {finalColor.en_name} • {finalColor.hex}
                </div>

                <div
                  className="text-xl md:text-2xl font-medium p-8 rounded-3xl backdrop-blur-md mb-8 shadow-sm"
                  style={{
                    backgroundColor:
                      getContrastYIQ(finalColor.hex) === "#000"
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(0,0,0,0.2)",
                  }}
                >
                  "{finalColor.ru_feature}"
                </div>

                <p className="text-lg leading-relaxed opacity-95">
                  {finalColor.ru_description}
                </p>
              </div>
            </div>
          </div>
        )}
        <article className="mt-16 pt-10 border-t border-gray-200 max-w-4xl mx-auto text-gray-600 space-y-6 leading-relaxed">
          <h2 className="text-3xl font-bold text-gray-900">Как рассчитывается цвет имени</h2>
          <p>Русским и латинским буквам присвоены числа от 1 до 9. Мы складываем их значения и сводим сумму к одной цифре, сохраняя 11, 22 и 33. Затем выбираем цвет из таблицы сайта. Пробелы, цифры и знаки препинания не входят в сумму; Е и Ё имеют одинаковое значение.</p>
          <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer">Таблица букв и чисел</summary><div className="mt-4 space-y-2">{Array.from({length:9},(_,i)=><p key={i}><strong>{i+1}:</strong> {Object.entries(LETTER_VALUES).filter(([,value])=>value===i+1).map(([letter])=>letter.toUpperCase()).join(", ")}</p>)}</div></details>
          <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer">Вводить имя или фамилию тоже?</summary><p className="mt-3">Можно только имя, полное имя или псевдоним. Калькулятор учитывает именно введённые буквы. Анна и Аня могут дать разные палитры; регистр букв результат не меняет.</p></details>
          <h2 className="text-2xl font-bold text-gray-900">Что делать с палитрой</h2>
          <p>Возьмите итоговый HEX для фона открытки, а оттенки букв — для декоративных полос. Это творческий эксперимент. Символические описания ниже результата не являются психологическим тестом.</p>
          <Link href="/numerology" className="inline-block font-bold text-indigo-700 underline">Сравнить с цветом числа судьбы →</Link>
        </article>
      </div>
    </main>
  );
}
