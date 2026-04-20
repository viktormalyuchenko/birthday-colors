"use client";

import { useState } from "react";

// Функция подсчета числа судьбы
function calculateLifePathNumber(dateString: string): number {
  // Убираем все не-цифры (тире, точки и т.д.)
  const digits = dateString.replace(/\D/g, "");

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i], 10);
  }

  // Сводим к однозначному (если больше 9)
  while (sum > 9) {
    let tempSum = 0;
    const sumStr = sum.toString();
    for (let i = 0; i < sumStr.length; i++) {
      tempSum += parseInt(sumStr[i], 10);
    }
    sum = tempSum;
  }

  return sum;
}

export default function NumerologyCalculator({
  onCalculate,
}: {
  onCalculate: (num: number, date: string) => void;
}) {
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    const lifePathNumber = calculateLifePathNumber(date);
    onCalculate(lifePathNumber, date);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Узнайте свое Число и Цвет
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Введите полную дату рождения
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg bg-gray-50"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
        >
          Рассчитать
        </button>
      </form>
    </div>
  );
}
