"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import luscherData from "@/data/luscher_data.json";

const INITIAL_COLORS = [
  { id: "0", hex: "#888888", name: "Серый" },
  { id: "1", hex: "#1C3B70", name: "Синий" },
  { id: "2", hex: "#2A7B54", name: "Зеленый" },
  { id: "3", hex: "#C23531", name: "Красный" },
  { id: "4", hex: "#EED244", name: "Желтый" },
  { id: "5", hex: "#7E468F", name: "Фиолетовый" },
  { id: "6", hex: "#724A32", name: "Коричневый" },
  { id: "7", hex: "#222222", name: "Черный" },
];

export default function LuscherTestPage() {
  const [availableColors, setAvailableColors] = useState(INITIAL_COLORS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleColorClick = (id: string) => {
    const newSelected = [...selectedIds, id];
    setSelectedIds(newSelected);
    setAvailableColors(availableColors.filter((c) => c.id !== id));

    if (newSelected.length === 8) {
      setIsFinished(true);
    }
  };

  const restartTest = () => {
    setAvailableColors(INITIAL_COLORS);
    setSelectedIds([]);
    setIsFinished(false);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Тест Люшера" }]} />

        {!isFinished ? (
          <div className="text-center animate-in fade-in duration-700">
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">
              Тест Макса Люшера
            </h1>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Выберите цвет, который вам{" "}
              <strong>наиболее приятен прямо сейчас</strong>. Не пытайтесь
              ассоциировать его с одеждой или машинами. Действуйте интуитивно.
              Осталось выбрать: {8 - selectedIds.length}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {availableColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorClick(color.id)}
                  className="h-32 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <h1 className="text-5xl font-black font-serif mb-8 text-center">
              Психологический срез
            </h1>
            <p className="text-center text-gray-500 mb-12">
              Ваш бессознательный выбор раскрывает истинные потребности и
              скрытые источники стресса.
            </p>

            {/* Выбранная палитра */}
            <div className="flex w-full h-16 md:h-24 rounded-2xl overflow-hidden shadow-lg mb-16">
              {selectedIds.map((id) => (
                <div
                  key={id}
                  className="flex-1"
                  style={{
                    backgroundColor: INITIAL_COLORS.find((c) => c.id === id)
                      ?.hex,
                  }}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Явные цели (1 и 2 выбор) */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 font-serif text-indigo-600 border-b pb-2">
                  Желаемые цели и средства
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>
                    1-й выбор ({(luscherData as any)[selectedIds[0]].name}):
                  </strong>{" "}
                  {(luscherData as any)[selectedIds[0]].plus}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>
                    2-й выбор ({(luscherData as any)[selectedIds[1]].name}):
                  </strong>{" "}
                  {(luscherData as any)[selectedIds[1]].plus}
                </p>
              </div>

              {/* Подавленные потребности / Стресс (7 и 8 выбор) */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 font-serif text-red-500 border-b pb-2">
                  Источники стресса и подавления
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>
                    7-й выбор ({(luscherData as any)[selectedIds[6]].name}):
                  </strong>{" "}
                  {(luscherData as any)[selectedIds[6]].minus}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>
                    8-й выбор ({(luscherData as any)[selectedIds[7]].name}):
                  </strong>{" "}
                  {(luscherData as any)[selectedIds[7]].minus}
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={restartTest}
                className="bg-gray-900 text-white font-bold px-10 py-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
              >
                Пройти тест заново
              </button>
            </div>
          </div>
        )}
      </div>
      <article className="mt-32 pt-16 border-t border-gray-200 prose prose-lg max-w-4xl mx-auto text-gray-600 pb-16">
        <h2 className="text-3xl font-black font-serif text-gray-900 mb-6">
          О тесте Макса Люшера
        </h2>
        <p>
          Цветовой тест Люшера (Lüscher Color Test) — это проективная методика
          исследования личности, разработанная швейцарским психотерапевтом
          Максом Люшером в 1947 году. В основе теста лежит доказанный факт:
          восприятие цвета является объективным и универсальным для всех людей,
          а вот предпочтение того или иного цвета строго субъективно и зависит
          от текущего психологического состояния.
        </p>
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          Как цвет отражает ваше состояние?
        </h3>
        <p>
          В нашем онлайн-калькуляторе представлена классическая короткая версия
          теста (восьмицветовой ряд). Каждому из 8 цветов Люшер присвоил
          определенное символическое значение:
        </p>
        <ul>
          <li>
            <strong>Основные цвета (Синий, Зеленый, Красный, Желтый)</strong>{" "}
            символизируют базовые психологические потребности: покой,
            самоутверждение, действие и надежду. Здоровый и уравновешенный
            человек обычно выбирает эти цвета первыми.
          </li>
          <li>
            <strong>
              Дополнительные цвета (Фиолетовый, Коричневый, Черный, Серый)
            </strong>{" "}
            символизируют тревоги, стресс, потребность в уединении или
            физическом комфорте. Если они оказываются на первых позициях, это
            указывает на внутренний конфликт или истощение.
          </li>
        </ul>
        <p>
          Важно понимать, что тест Люшера оценивает{" "}
          <strong>
            не устойчивые черты характера, а ваше состояние "здесь и сейчас"
          </strong>
          . Поэтому результаты теста могут меняться в зависимости от вашего
          настроения, самочувствия или уровня усталости.
        </p>
      </article>
    </main>
  );
}
