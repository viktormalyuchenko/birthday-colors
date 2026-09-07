import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Тест Люшера онлайн — выбор 8 цветов с результатом",
  description: "Выберите восемь цветов по порядку и получите палитру с условной интерпретацией. Бесплатная упрощённая демонстрация, не диагностика.",
  alternates: { canonical: "https://colorstrology.ru/luscher-test" },
  openGraph: { title: "Тест Люшера онлайн — выбор 8 цветов с результатом", description: "Выберите восемь цветов по порядку и получите палитру с условной интерпретацией. Бесплатная упрощённая демонстрация, не диагностика.", url: "https://colorstrology.ru/luscher-test", type: "website" },
};
export default function Layout({children}: {children: React.ReactNode}) { return children; }
