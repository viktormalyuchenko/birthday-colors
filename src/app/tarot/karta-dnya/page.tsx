import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import TarotDaily from "@/components/TarotDaily";
export const metadata: Metadata = {
  title:"Карта дня Таро онлайн — вытянуть карту и палитру",
  description:"Вытяните карту дня бесплатно: 78 карт, толкование, совет и цветовая палитра. Результат сохраняется на день в вашем браузере.",
  alternates:{canonical:"https://colorstrology.ru/tarot/karta-dnya"},
  openGraph:{title:"Карта дня + палитра | Colorstrology",description:"Одна карта, тема дня и три оттенка для вдохновения.",url:"https://colorstrology.ru/tarot/karta-dnya",type:"website"},
};
export default function Page(){
  return <main className="min-h-screen bg-[#F7F5F0] px-4 py-8 md:py-14"><div className="max-w-5xl mx-auto">
    <Breadcrumbs items={[{label:"Карта дня Таро"}]}/>
    <nav aria-label="Расклады Таро" className="flex gap-3 mb-7 text-sm"><span aria-current="page" className="rounded-full bg-slate-900 text-white px-4 py-3">Карта дня</span><Link className="rounded-full border px-4 py-3" href="/tarot/tri-karty">Три карты</Link></nav>
    <h1 className="text-4xl md:text-6xl font-black font-serif mb-5">Карта дня Таро и её цвета</h1>
    <p className="text-lg text-gray-600 max-w-3xl">Вытяните случайную карту, прочитайте её тему и совет на сегодня. А три оттенка из оформления можно забрать для своей открытки, заметки или фона.</p>
    <TarotDaily/>
    <section className="mt-14 border-t border-stone-200 pt-8 space-y-5 text-gray-700 leading-relaxed">
      <h2 className="text-2xl font-bold">Как работает карта дня</h2>
      <p>При нажатии случайно выбирается одна из 78 карт: 22 Старших и 56 Младших арканов. Все карты имеют одинаковую вероятность. Перевёрнутых положений и платных расшифровок нет. Для более подробного рассмотрения вопроса есть расклад на три карты.</p>
      <details className="bg-white p-5 rounded-2xl"><summary className="font-bold cursor-pointer">Когда появится новая карта?</summary><p className="mt-3">После полуночи по местному времени вашего устройства. В этом браузере результат хранится до смены даты. На другом устройстве, в приватном режиме или после очистки данных может выпасть другая карта.</p></details>
      <details className="bg-white p-5 rounded-2xl"><summary className="font-bold cursor-pointer">Откуда взяты толкования и палитры?</summary><p className="mt-3">Тексты — наша редакционная трактовка символических тем карт Таро для формата «карта дня», не дословный перевод. Исторический ориентир — A. E. Waite, <a className="underline" href="https://sacred-texts.com/tarot/pkt/pkttp.htm">The Pictorial Key to the Tarot</a>. Геометрические изображения и палитры созданы для сайта, это не репродукции оригинальной колоды.</p></details>
      <p className="text-sm text-gray-500">Таро здесь — развлекательный способ взглянуть на день, а не достоверное предсказание. Не используйте случайную карту для решений о здоровье, деньгах или безопасности.</p>
      <Link href="/articles/cveta-dney-nedeli-tablica" className="inline-block font-bold text-indigo-700 underline">Другой источник вдохновения: цвета дней недели →</Link>
    </section>
  </div></main>;
}
