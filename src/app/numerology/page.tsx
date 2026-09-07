import Link from "next/link";
import colors from "@/data/numerology_colors.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import NumerologyCalculator from "@/components/NumerologyCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Число судьбы по дате рождения — калькулятор и цвет",
  description:
    "Бесплатный калькулятор числа жизненного пути. Рассчитайте свое число судьбы по дате рождения и узнайте свою управляющую планету и цвет.",
  alternates: { canonical: "https://colorstrology.ru/numerology" },
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
          Число судьбы и ваш цвет
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Введите полную дату рождения: калькулятор сложит её цифры и покажет число жизненного пути и связанный с ним цвет. Это нумерологическая интерпретация, а не предсказание судьбы.
        </p>
      </div>
      <NumerologyCalculator />
      <article className="max-w-4xl mx-auto mt-16 space-y-6 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-bold font-serif text-gray-900">Как считается число судьбы</h2>
        <p>Складываем все цифры дня, месяца и года, затем повторяем сложение до числа от 1 до 9. Если на одном из шагов получилось 11, 22 или 33, оставляем это число. Другие школы нумерологии могут использовать иной порядок расчёта.</p>
        <div className="rounded-2xl bg-white border border-gray-200 p-6"><h3 className="font-bold mb-2">Пример: 7 сентября 1990 года</h3><p>0 + 7 + 0 + 9 + 1 + 9 + 9 + 0 = 35 → 3 + 5 = 8.</p><p>Результат в этой системе — число 8. Цвет можно посмотреть в карточке ниже.</p></div>
        <h2 className="text-2xl font-bold text-gray-900">Числа и цвета: выберите результат</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{Object.values(colors).map(color => <Link key={color.number} href={`/numerology/${color.number}`} className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-indigo-400"><span className="block h-12 rounded-lg mb-3" style={{backgroundColor:color.hex}}/><strong>Число {color.number}</strong><span className="block">{color.ru_name}</span><span className="text-sm font-mono">{color.hex}</span></Link>)}</div>
        <details className="rounded-2xl bg-white p-5"><summary className="cursor-pointer font-bold">Почему нужен год рождения?</summary><p className="mt-3">Здесь участвуют все цифры даты. В японском календаре используется только день и месяц, поэтому это разные способы выбора цвета.</p></details>
        <p>Используйте оттенок как идею для аксессуара или палитры. Описания чисел символические и не определяют ваши способности или будущее.</p>
        <Link href="/name-color" className="inline-block font-bold text-indigo-700 underline">А какой цвет получится из букв имени? →</Link>
      </article>
    </main>
  );
}
