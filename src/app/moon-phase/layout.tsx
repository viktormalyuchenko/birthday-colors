import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Совместимость по Фазе Луны | Тренд TikTok (Moon Phase Soulmates)",
  description:
    "Проверьте, создают ли ваши души идеальное Полнолуние! Введите две даты рождения и посмотрите анимацию слияния лунных фаз. Тренд из TikTok.",
  keywords: [
    "совместимость по луне",
    "фазы луны тикток",
    "moon phase soulmates",
    "слияние лун",
    "лунная совместимость по дате рождения",
  ],
};

export default function MoonPhaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
