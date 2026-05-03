import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цвет Ауры по дате рождения | Ведическая нумерология чакр",
  description:
    "Рассчитайте цвет вашей ауры и доминирующую чакру по дате рождения. Бесплатный калькулятор энергетики (Муладхара, Анахата, Аджна и др.).",
  keywords: [
    "цвет ауры по дате рождения",
    "рассчитать цвет ауры",
    "доминирующая чакра по дате",
    "какая у меня аура",
    "ведическая нумерология",
  ],
};

export default function AuraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
