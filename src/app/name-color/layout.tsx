import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Цвет имени — калькулятор и палитра букв онлайн",
  description: "Введите имя и получите цветной штрихкод, итоговый HEX и объяснение расчёта. Русские и латинские буквы, полное имя или псевдоним.",
  alternates: { canonical: "https://colorstrology.ru/name-color" },
  openGraph: { title: "Цвет имени — калькулятор и палитра букв онлайн", description: "Введите имя и получите цветной штрихкод, итоговый HEX и объяснение расчёта. Русские и латинские буквы, полное имя или псевдоним.", url: "https://colorstrology.ru/name-color", type: "website" },
};
export default function Layout({children}: {children: React.ReactNode}) { return children; }
