import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Совместимость по Цветам Души | Японский календарь",
  description:
    "Узнайте психологическую химию вашей пары. Введите две даты рождения и посмотрите, как смешиваются и взаимодействуют ваши цвета души.",
  keywords: [
    "цветовая совместимость",
    "совместимость по дате рождения",
    "совместимость цветов",
    "японский гороскоп совместимости",
  ],
};

export default function ColorCompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
