import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Цвет ауры по дню рождения — калькулятор и таблица чакр",
  description: "Выберите день рождения и посмотрите символический цвет ауры. Открытая таблица чисел и чакр, пример расчёта и объяснение ограничений.",
  alternates: { canonical: "https://colorstrology.ru/aura" },
  openGraph: { title: "Цвет ауры по дню рождения — калькулятор и таблица чакр", description: "Выберите день рождения и посмотрите символический цвет ауры. Открытая таблица чисел и чакр, пример расчёта и объяснение ограничений.", url: "https://colorstrology.ru/aura", type: "website" },
};
export default function Layout({children}: {children: React.ReactNode}) { return children; }
