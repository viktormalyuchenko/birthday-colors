import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ColorChoiceTest from "@/components/ColorChoiceTest";

export default function LuscherTestPage() {
  return <main className="min-h-screen bg-[#F9F9F8] py-6 md:py-14 px-4 text-gray-900">
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs items={[{label:"Тест Люшера"}]}/>
      <ColorChoiceTest/>
      <article className="mt-14 pt-8 border-t border-gray-200 space-y-5 text-gray-600 leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">Как устроена расшифровка</h2>
        <p>Два прохода, восемь цветов. Основной текст строится по второму выбору: первая пара задаёт резюме, позиции 1–2, 5–6 и 7–8 раскрываются отдельно. Позиции 3–4 показаны в рядах и сравнении: отдельная психологическая трактовка для них не рассчитывается.</p>
        <p>Использована редакционная адаптация присланного материала «Тест Люшера — описание и интерпретация», разделы о позициях и первых цветовых парах. Противоречивые записи исключены. Для пары без однозначной записи показаны отдельные значения цветов; спорные таблицы последних пар и клинические показатели не используются.</p>
        <p className="text-sm">Онлайн-адаптация: результат ориентировочный, не является психологическим диагнозом и не заменяет консультацию специалиста.</p>
        <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer text-gray-900">Почему оттенки отличаются на разных устройствах?</summary><p className="mt-3">На отображение влияют яркость, цветовые настройки дисплея и ночной режим. Веб-страница не заменяет стандартизированный набор печатных карточек.</p></details>
        <details className="bg-white rounded-2xl p-5"><summary className="font-bold cursor-pointer text-gray-900">Сохраняются ли ответы?</summary><p className="mt-3">Инструмент держит ответы в состоянии открытой страницы, не записывает их в аккаунт или локальное хранилище. При обновлении они сбросятся. Кнопка копирования переносит два ряда в буфер обмена. На сайте отдельно работают аналитика и реклама — см. <Link href="/privacy" className="underline">политику конфиденциальности</Link>.</p></details>
        <p className="text-sm">О методике: <a className="underline" href="https://www.luscher-color.com/en/diagnostics/">Фонд Макса Люшера</a>. Печатный источник: Max Lüscher, Ian A. Scott, <i>The Lüscher Color Test</i>, Random House, 1969, раздел Instructions for Conducting the Test. <a className="underline" href="https://www.luscher-color.com/en/copyright/">Права на оригинальные материалы</a>.</p>
        <Link href="/name-color" className="inline-block font-bold text-indigo-700 underline">Другой эксперимент: палитра имени →</Link>
      </article>
    </div>
  </main>;
}
