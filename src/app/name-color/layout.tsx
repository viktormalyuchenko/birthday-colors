import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цветовой код имени | Палитра вашей личности",
  description:
    "Узнайте свой личный цвет по имени и фамилии. Бесплатный калькулятор цвета имени на основе пифагорейской нумерологии и психологии цвета.",
  keywords: [
    "цвет имени",
    "нумерология имени",
    "цвет личности по имени",
    "палитра имени",
    "пифагор",
  ],
};

export default function NameColorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
