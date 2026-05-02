import Breadcrumbs from "@/components/Breadcrumbs";
import NumerologyCalculator from "@/components/NumerologyCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цветовая Нумерология | Расчет числа судьбы и цвета ауры",
  description:
    "Бесплатный калькулятор числа жизненного пути. Рассчитайте свое число судьбы по дате рождения и узнайте свою управляющую планету и цвет.",
  keywords: [
    "цветовая нумерология",
    "число судьбы",
    "цвет по числу судьбы",
    "цвет ауры по дате рождения",
  ],
};

export default function NumerologyIndex() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Breadcrumbs items={[{ label: "Цветовая Нумерология" }]} />
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-serif">
          Цветовая Нумерология
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          В основе этой системы лежит Число Судьбы. Сложив все цифры даты
          рождения, мы получим число от 1 до 9. У каждого числа — своя планета,
          вибрация и цвет.
        </p>
      </div>
      <NumerologyCalculator />
      <article className="mt-24 pt-12 border-t border-gray-200 text-left prose prose-lg max-w-none text-gray-700">
        <h2 className="text-3xl font-black font-serif text-gray-900 mb-6">
          Как рассчитать число судьбы по дате рождения?
        </h2>
        <p>
          В классической <strong>нумерологии по дате рождения</strong> главным
          показателем вашего жизненного пути является Число Судьбы. Наш онлайн
          калькулятор позволяет мгновенно рассчитать его и узнать свой{" "}
          <strong>цвет ауры по дате рождения</strong>.
        </p>
        <h3 className="text-xl font-bold font-serif text-gray-900 mt-8 mb-4">
          Что дает знание числа судьбы?
        </h3>
        <p>
          Каждая цифра от 1 до 9 (а также Мастер-числа 11, 22 и 33) обладает
          уникальной вибрацией. Рассчитав свое число судьбы, вы узнаете свои
          скрытые таланты, кармические задачи и сильные стороны характера. Кроме
          того, каждому числу покровительствует определенная планета и цвет,
          который вы можете использовать как личный талисман для привлечения
          удачи.
        </p>
      </article>
    </main>
  );
}
