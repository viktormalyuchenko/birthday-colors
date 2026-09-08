import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Тест Люшера онлайн — выбор 8 цветов с результатом",
  description: "Два выбора восьми цветов: сравните позиции, посмотрите обе палитры и подробный разбор предпочтений. Неофициальная адаптация, не диагностика.",
  alternates: { canonical: "https://colorstrology.ru/luscher-test" },
  openGraph: { title: "Тест Люшера онлайн — два выбора и подробный разбор", description: "Сравните два ряда из восьми цветов и разберите свои предпочтения. Неофициальная адаптация, не диагностика.", url: "https://colorstrology.ru/luscher-test", type: "website" },
};
export default function Layout({children}: {children: React.ReactNode}) { return children; }
