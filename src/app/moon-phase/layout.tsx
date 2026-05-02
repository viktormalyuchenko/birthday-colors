import type { Metadata } from "next";

export const metadata: Metadata = {
  // Точное вхождение ВЧ-запросов
  title: "Совместимость по фазам луны | Рассчитать фазу луны по дате рождения",
  description:
    "Бесплатный калькулятор совместимости по луне. Введите две даты рождения и узнайте совпадение луны (тренд TikTok). Полнолуние родственных душ.",
  keywords: [
    "совместимость по фазам луны",
    "фаза луны по дате рождения",
    "совпадение луны по дате рождения",
    "тренд с луной",
    "лунная совместимость",
    "слияние лун",
  ],
};

export default function MoonPhaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
