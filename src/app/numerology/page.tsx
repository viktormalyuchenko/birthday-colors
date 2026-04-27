import Breadcrumbs from "@/components/Breadcrumbs";
import NumerologyCalculator from "@/components/NumerologyCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цветовая Нумерология | Расчет числа судьбы и цвета ауры",
  description:
    "Бесплатный калькулятор числа жизненного пути. Рассчитайте свое число судьбы по дате рождения и узнайте свою управляющую планету и цвет.",
  keywords: [
    "цветовая нумерология",
    "число судьбы",
    "цвет по числу судьбы",
    "цвет ауры по дате рождения",
  ],
};

export default function NumerologyIndex() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Breadcrumbs items={[{ label: "Цветовая Нумерология" }]} />
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-serif">
          Цветовая Нумерология
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          В основе этой системы лежит Число Судьбы. Сложив все цифры даты
          рождения, мы получим число от 1 до 9. У каждого числа — своя планета,
          вибрация и цвет.
        </p>
      </div>
      <NumerologyCalculator />
    </main>
  );
}
