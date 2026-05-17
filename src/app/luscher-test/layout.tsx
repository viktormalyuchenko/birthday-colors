import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цветовой Тест Люшера онлайн | Психология цвета",
  description:
    "Пройдите знаменитый цветовой тест Макса Люшера бесплатно. Выберите 8 цветов и узнайте свое скрытое психологическое состояние, уровень стресса и истинные цели.",
  keywords: [
    "тест люшера",
    "цветовой тест люшера",
    "психологический тест по цветам",
    "психология цвета",
    "диагностика по люшеру",
    "тест люшера онлайн",
  ],
  openGraph: {
    title: "Тест Люшера — Узнай свое скрытое состояние",
    description:
      "Пройди быстрый цветовой тест и получи глубокий психологический анализ. Что скрывает твое подсознание?",
    url: "https://colorstrology.ru/luscher-test",
    type: "website",
  },
};

export default function LuscherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
