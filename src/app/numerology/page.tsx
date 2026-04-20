"use client";

import { useState } from "react";
import numerologyData from "@/data/numerology_colors.json";
import NumerologyCalculator from "@/components/NumerologyCalculator";

// Вычисляет контраст текста
function getContrastColor(hexcolor: string) {
  if (!hexcolor) return "#111827";
  const hex = hexcolor.replace("#", "");
  if (hex.length !== 6) return "#111827";

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111827" : "#ffffff";
}

export default function NumerologyPage() {
  const [result, setResult] = useState<{
    number: number;
    dateStr: string;
  } | null>(null);

  // Если результат получен, ищем данные в JSON
  const colorInfo = result
    ? (numerologyData as any)[result.number.toString()]
    : null;

  // Если результата нет — показываем стартовый экран
  if (!result || !colorInfo) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              Новая система
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 font-serif">
              Цветовая Нумерология
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              В основе этой системы лежит Число Жизненного Пути (Число Судьбы).
              Сложив все цифры вашей даты рождения, мы получим число от 1 до 9.
              Каждому числу соответствует своя планета и своя вибрация цвета.
            </p>
          </div>

          <NumerologyCalculator
            onCalculate={(num, dateStr) => setResult({ number: num, dateStr })}
          />

          <div className="mt-16 text-center text-gray-500 text-sm">
            <p>Пример расчета: 14.05.1996 → 1+4+0+5+1+9+9+6 = 35 → 3+5 = 8</p>
            <p>Число судьбы: 8 (Цвет: Пурпурный)</p>
          </div>
        </div>
      </main>
    );
  }

  // Если результат ЕСТЬ — показываем страницу цвета!
  const textColor = getContrastColor(colorInfo.hex);
  const borderColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.1)";
  const glassBgColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)";

  // Форматируем дату для красоты (2000-01-25 -> 25.01.2000)
  const dParts = result.dateStr.split("-");
  const prettyDate = `${dParts[2]}.${dParts[1]}.${dParts[0]}`;

  return (
    <main
      className="min-h-screen flex flex-col items-center p-4 lg:p-12 transition-colors duration-1000"
      style={{ backgroundColor: colorInfo.hex, color: textColor }}
    >
      <div className="w-full max-w-4xl relative z-10 pt-4">
        <button
          onClick={() => setResult(null)}
          className="inline-flex items-center gap-2 mb-10 pb-1 hover:opacity-60 transition-opacity font-medium"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          ← Рассчитать другую дату
        </button>

        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl font-light mb-2 opacity-80">
            Дата: {prettyDate}
          </p>
          <h3 className="text-2xl md:text-3xl font-light mb-6 uppercase tracking-widest opacity-90">
            Число Судьбы: {colorInfo.number}
          </h3>
          <h1 className="text-6xl sm:text-8xl font-black mb-4 tracking-tighter font-serif drop-shadow-sm">
            {colorInfo.ru_name}
          </h1>
          <h2 className="text-xl md:text-2xl font-light font-serif italic opacity-80">
            {colorInfo.en_name} / Планета: {colorInfo.planet}
          </h2>
        </div>

        <div
          className="text-center text-xl md:text-3xl font-medium mb-12 p-8 rounded-3xl backdrop-blur-md shadow-xl"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
          }}
        >
          "{colorInfo.ru_feature}"
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="md:col-span-2 p-8 rounded-3xl backdrop-blur-md"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: glassBgColor,
            }}
          >
            <h3 className="text-2xl font-bold mb-4 font-serif">
              Психология Числа и Цвета
            </h3>
            <p className="text-lg leading-relaxed opacity-95">
              {colorInfo.ru_description}
            </p>
          </div>

          <div
            className="p-8 rounded-3xl backdrop-blur-md flex flex-col justify-center"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: glassBgColor,
            }}
          >
            <h3 className="text-xl font-bold mb-4 font-serif">
              Ключевые энергии:
            </h3>
            <div className="flex flex-wrap gap-2">
              {colorInfo.ru_keywords.map((word: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: glassBgColor,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
