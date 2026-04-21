"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Важно: используем роутер

function calculateLifePathNumber(dateString: string): number {
  const digits = dateString.replace(/\D/g, "");
  let sum = 0;
  for (let i = 0; i < digits.length; i++) sum += parseInt(digits[i], 10);
  while (sum > 9) {
    let tempSum = 0;
    const sumStr = sum.toString();
    for (let i = 0; i < sumStr.length; i++) tempSum += parseInt(sumStr[i], 10);
    sum = tempSum;
  }
  return sum;
}

export default function NumerologyCalculator() {
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    const lifePathNumber = calculateLifePathNumber(date);
    // ПЕРЕНАПРАВЛЯЕМ НА SEO-СТРАНИЦУ
    router.push(`/numerology/${lifePathNumber}`);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto w-full relative z-10">
      <h2 className="text-2xl font-serif font-bold mb-2 text-center text-gray-900">
        Ваше Число и Цвет
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Введите дату рождения
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 text-lg bg-gray-50 text-gray-900"
        />
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-colors"
        >
          Рассчитать
        </button>
      </form>
    </div>
  );
}
