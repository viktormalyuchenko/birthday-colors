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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleColorClick = (id: string) => {
    if (selectedIds.includes(id)) return;
    const newSelected = [...selectedIds, id];
    setSelectedIds(newSelected);

    if (newSelected.length === 8) {
      setIsFinished(true);
    }
  };

  const restartTest = () => {
    setSelectedIds([]);
    setIsFinished(false);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F8] py-6 md:py-16 px-4 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ label: "Тест Люшера" }]} />

        {!isFinished ? (
          <div className="text-center animate-in fade-in duration-700">
            <h1 className="text-3xl md:text-6xl font-black font-serif mb-4 md:mb-6">
              Тест Люшера онлайн: 8 цветов
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-5 md:mb-8 max-w-2xl mx-auto">
              Выберите цвет, который вам{" "}
              <strong>наиболее приятен прямо сейчас</strong>. Не пытайтесь
              ассоциировать его с одеждой или машинами. Действуйте интуитивно.
              Это упрощённая демонстрация цветового выбора, не психологическая диагностика.
            </p>

            <div className="max-w-3xl mx-auto mb-6" aria-live="polite">
              <p className="text-sm text-gray-600 mb-3">Выбрано {selectedIds.length} из 8. Выберите следующий приятный цвет.</p>
              <div className="flex gap-2">{Array.from({length:8},(_,i)=><span key={i} className="h-3 flex-1 rounded-full" style={{backgroundColor:INITIAL_COLORS.find(c=>c.id===selectedIds[i])?.hex ?? "#e5e7eb"}} />)}</div>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto">
              {INITIAL_COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  disabled={selectedIds.includes(color.id)}
                  onClick={() => handleColorClick(color.id)}
                  className="h-20 sm:h-28 md:h-32 rounded-2xl shadow-sm enabled:hover:shadow-lg enabled:active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 disabled:shadow-none disabled:border disabled:border-gray-200"
                  style={{ backgroundColor: selectedIds.includes(color.id) ? '#e5e7eb' : color.hex }}
                  aria-label={selectedIds.includes(color.id) ? `${color.name}: выбран ${selectedIds.indexOf(color.id) + 1}-м` : color.name}
                >
                  {selectedIds.includes(color.id) && <span className="text-gray-600 text-sm font-bold" aria-hidden="true">✓ {selectedIds.indexOf(color.id) + 1}</span>}
                </button>
              ))}
            </div>
            <button type="button" disabled={selectedIds.length === 0} onClick={() => setSelectedIds(selectedIds.slice(0, -1))} className="mt-4 min-h-12 px-5 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 disabled:opacity-40 enabled:hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Отменить последний выбор</button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <h1 className="text-3xl md:text-5xl font-black font-serif mb-6 text-center">
              Ваш порядок цветов
            </h1>
            <p className="text-center text-gray-500 mb-12">
              Ниже — условные интерпретации первого и последнего выбора, а не заключение о вашем состоянии.
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
                  Первые два цвета: интерпретация
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
                  Последние два цвета: интерпретация
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
      <article className="mt-16 pt-10 border-t border-gray-200 max-w-4xl mx-auto text-gray-600 pb-16 space-y-6 leading-relaxed">
        <h2 className="text-3xl font-bold text-gray-900">Как пройти цветовой тест</h2>
        <ol className="list-decimal pl-6 space-y-2"><li>Посмотрите на восемь карточек и выберите самый приятный сейчас цвет.</li><li>Повторяйте выбор среди оставшихся цветов, пока не выберете все восемь.</li><li>Посмотрите получившуюся палитру и прочитайте условные толкования.</li></ol>
        <h2 className="text-2xl font-bold text-gray-900">Что показывает эта версия</h2>
        <p>Сайт сохраняет порядок одного выбора восьми цветов. Для первых двух карточек и последних двух выводятся готовые описания из нашей таблицы. Это упрощённая онлайн-демонстрация, а не полный профессиональный протокол теста Люшера.</p>
        <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer">Можно ли определить стресс или поставить диагноз?</summary><p className="mt-3">Этот инструмент для этого не предназначен. Не делайте выводов о здоровье или личности по порядку цветов. Тексты результата — повод для размышления, а не оценка специалиста.</p></details>
        <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer">Почему на другом экране цвета отличаются?</summary><p className="mt-3">На отображение влияют яркость, настройки дисплея и ночной режим. Карточки на сайте не являются стандартизированным печатным набором.</p></details>
        <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer">Есть правильный порядок?</summary><p className="mt-3">В этом упражнении не нужно угадывать правильный ответ. Выбирайте то, что нравится сейчас. Другой порядок при повторном прохождении сам по себе ничего не доказывает.</p></details>
        <Link href="/name-color" className="inline-block font-bold text-indigo-700 underline">Попробовать другой эксперимент: палитра имени →</Link>
      </article>
    </main>
  );
}
