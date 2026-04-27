"use client";

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
  const [name, setName] = useState("");
  const [palette, setPalette] = useState<{ char: string; color: any }[]>([]);
  const [finalColor, setFinalColor] = useState<any>(null);

  const calculateName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

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

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }

    setPalette(newPalette);
    setFinalColor((numerologyData as any)[sum.toString()]);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Цветовой код имени" }]} />

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-serif tracking-tight">
          Палитра Имени
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-3xl leading-relaxed">
          Каждая буква излучает свою вибрацию. Введите своё Имя и Фамилию, чтобы
          увидеть уникальный "штрих-код" вашей души по системе Пифагора.
        </p>

        <form
          onSubmit={calculateName}
          className="flex flex-col md:flex-row gap-4 mb-20 bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100"
        >
          <input
            type="text"
            required
            placeholder="Например: Анна Смирнова"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white font-bold px-10 py-4 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg active:scale-95"
          >
            Рассчитать
          </button>
        </form>

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
                    className="flex-grow h-full flex flex-col justify-end items-center pb-4 transition-all duration-500 hover:flex-grow-[3]"
                    style={{
                      backgroundColor: item.color.hex,
                      color: getContrastYIQ(item.color.hex),
                    }}
                  >
                    <span className="font-black text-2xl drop-shadow-md">
                      {item.char}
                    </span>
                  </div>
                ) : (
                  <div key={i} className="w-4 md:w-8 bg-transparent"></div>
                ),
              )}
            </div>

            <p className="text-center text-gray-500 text-sm mb-16 max-w-2xl mx-auto">
              *Наведите на полосу цвета, чтобы расширить её. Каждая буква вносит
              свой оттенок в формирование вашего характера.
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
                  Итоговый цвет личности
                </p>
                <h2 className="text-6xl md:text-8xl font-black font-serif mb-6">
                  {finalColor.ru_name}
                </h2>
                <div className="text-2xl font-serif italic opacity-90 mb-8">
                  {finalColor.en_name} • Планета: {finalColor.planet}
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
        <article className="mt-32 pt-16 border-t border-gray-200 prose prose-lg max-w-4xl mx-auto text-gray-600">
          <h2 className="text-3xl font-black font-serif text-gray-900 mb-6">
            Что такое цветовой код имени?
          </h2>
          <p>
            Еще в древности Пифагор утверждал, что Вселенная управляется
            числами, а каждая буква алфавита обладает своей уникальной числовой
            вибрацией. Эта система легла в основу{" "}
            <strong>классической нумерологии</strong>.
          </p>
          <p>
            В нашей системе мы объединили пифагорейскую гематрию (перевод букв в
            числа) с психологией цвета. Каждое число от 1 до 9 резонирует с
            определенной планетой и цветом спектра.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Как читать свою палитру?
          </h3>
          <ul>
            <li>
              <strong>Мелодия имени (Штрих-код):</strong> Показывает, из каких
              энергий соткано ваше имя. Если в палитре много красных и оранжевых
              оттенков — вы деятельны и импульсивны. Преобладание синих и
              фиолетовых тонов говорит о глубоком интеллекте и духовности.
            </li>
            <li>
              <strong>Итоговый цвет личности:</strong> Это "Число выражения".
              Оно описывает ваши скрытые таланты, то, как вас воспринимают
              окружающие, и вашу главную жизненную миссию.
            </li>
          </ul>
          <p>
            Попробуйте ввести свое полное имя, а затем псевдоним или сокращенное
            имя, чтобы увидеть, как меняется ваша цветовая вибрация в разных
            жизненных ролях!
          </p>
        </article>
      </div>
    </main>
  );
}
