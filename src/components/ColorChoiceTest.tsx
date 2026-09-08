"use client";

import { useRef, useState } from "react";
import { interpretLuscher } from "@/lib/luscher-interpretation";

const COLORS = [
  { id: "0", hex: "#888888", name: "Серый" },
  { id: "1", hex: "#1C3B70", name: "Синий" },
  { id: "2", hex: "#2A7B54", name: "Зелёный" },
  { id: "3", hex: "#C23531", name: "Красный" },
  { id: "4", hex: "#EED244", name: "Жёлтый" },
  { id: "5", hex: "#7E468F", name: "Фиолетовый" },
  { id: "6", hex: "#724A32", name: "Коричневый" },
  { id: "7", hex: "#222222", name: "Чёрный" },
];
const getColor = (id: string) => COLORS.find(c => c.id === id)!;
const names = (ids: string[]) => ids.map(id => getColor(id).name.toLowerCase()).join(", ");
function shuffled() {
  const ids = COLORS.map(c => c.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

const button = "min-h-12 px-5 py-3 rounded-xl border border-gray-300 font-semibold disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600";
function Row({ids, label}: {ids: string[]; label: string}) {
  return <div><h3 className="font-bold mb-3">{label}</h3><ol className="grid grid-cols-4 sm:grid-cols-8 gap-2">{ids.map((id, i) => <li key={id}><div aria-hidden="true" className="h-12 rounded-lg" style={{backgroundColor:getColor(id).hex}}/><p className="text-xs mt-2 break-words">{i + 1}. {getColor(id).name}</p></li>)}</ol></div>;
}
export default function ColorChoiceTest() {
  const [stage, setStage] = useState<"intro"|"first"|"between"|"second"|"result">("intro");
  const [order, setOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [first, setFirst] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const transition = (next: typeof stage) => {
    setStage(next);
    requestAnimationFrame(() => { heading.current?.focus({preventScroll:true}); heading.current?.scrollIntoView({block:"start"}); });
  };
  const start = () => { setFirst([]); setSelected([]); setOrder(shuffled()); setStatus(""); transition("first"); };
  const choose = (id: string) => {
    if (selected.includes(id) || (stage !== "first" && stage !== "second")) return;
    const next = [...selected, id]; setSelected(next);
    if (next.length === 8) {
      if (stage === "first") { setFirst(next); transition("between"); }
      else transition("result");
    }
  };
  const changes = first.map(id => ({id, from:first.indexOf(id)+1, to:selected.indexOf(id)+1}));
  const same = changes.filter(c => c.from === c.to);
  const biggest = Math.max(0, ...changes.map(c => Math.abs(c.from-c.to)));
  const overlap = first.slice(0,2).filter(id => selected.slice(0,2).includes(id));
  const reading = stage === "result" ? interpretLuscher(selected) : null;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(["Цветовой выбор — неофициальная адаптация", "Расшифровка: "+(reading?.summary ?? ""), "Первый проход: "+names(first), "Второй проход: "+names(selected), "Совпало позиций: "+same.length+" из 8. Это сравнение рядов, не оценка здоровья или личности.", "https://colorstrology.ru/luscher-test"].join("\n"));
      setStatus("Два ряда скопированы.");
    } catch { setStatus("Не удалось скопировать. Можно выделить текст или сделать скриншот."); }
  };
  return <section className="space-y-5">
    <p className="text-xs uppercase tracking-widest text-indigo-600">Неофициальная онлайн-адаптация</p>
    <h1 ref={heading} tabIndex={-1} className="scroll-mt-24 text-3xl md:text-5xl font-black font-serif focus:outline-none">{stage === "result" ? "Ваш цветовой выбор: подробный разбор" : stage === "between" ? "Первый проход завершён" : "Тест Люшера: два цветовых выбора"}</h1>
    {stage === "intro" && <>
      <p className="text-lg text-gray-600">Выберите цвета дважды и получите развёрнутую расшифровку: ваши приоритеты, потребности, которые отошли на второй план, и то, что может вызывать напряжение.</p>
      <div className="bg-white border rounded-3xl p-6 space-y-4"><h2 className="text-xl font-bold">Перед началом</h2><ul className="list-disc pl-5 space-y-3 text-gray-700"><li>Выбирайте приятный сейчас цвет, не подбирая его к одежде или интерьеру.</li><li>По возможности отключите ночной фильтр дисплея. Оттенки здесь — экранные приближения, не оригинальные тестовые карточки.</li><li>Во втором проходе не пытайтесь повторять первый порядок или намеренно менять его.</li></ul><p className="text-sm text-gray-600">Выбирайте без поиска «правильного» ответа. До завершения второго прохода результат будет скрыт.</p></div>
      <button onClick={start} className={button+" bg-indigo-600 text-white w-full sm:w-auto"}>Начать первый проход →</button>
    </>}
    {(stage === "first" || stage === "second") && <>
      <p>Выберите наиболее приятный цвет из оставшихся.</p>
      <p aria-live="polite" className="font-semibold">Проход {stage === "first" ? 1 : 2} из 2 · Выбрано {selected.length} из 8</p>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">{order.map(id => {
        const chosen = selected.includes(id);
        return <button key={id} disabled={chosen} onClick={() => choose(id)} aria-label={chosen ? getColor(id).name+": выбран "+(selected.indexOf(id)+1)+"-м" : getColor(id).name} className="h-20 sm:h-28 rounded-2xl border border-black/10 enabled:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600" style={{backgroundColor:chosen ? "#e5e7eb" : getColor(id).hex}}>{chosen && <span aria-hidden="true" className="text-gray-600 font-bold text-sm">✓ {selected.indexOf(id)+1}</span>}</button>;
      })}</div>
      <button disabled={!selected.length} onClick={() => setSelected(selected.slice(0,-1))} className={button}>Отменить последний выбор</button>
    </>}
    {stage === "between" && <div className="bg-white border rounded-3xl p-6 space-y-5"><p>Сделайте паузу 2–3 минуты, затем выберите цвета ещё раз. Карточки будут перемешаны. Первый ряд пока скрыт, чтобы он не подсказывал следующий выбор.</p><p>Не старайтесь вспомнить ответы и не меняйте их специально: выбирайте то, что нравится сейчас.</p><button onClick={() => { setSelected([]); setOrder(shuffled()); transition("second"); }} className={button+" bg-indigo-600 text-white"}>Начать второй проход →</button></div>}
    {stage === "result" && <div className="space-y-8">
      {reading && <section className="bg-indigo-50 rounded-3xl p-6 sm:p-8 space-y-4"><p className="text-xs uppercase tracking-widest text-indigo-700">Главное в вашем результате</p><h2 className="text-2xl font-bold">Ваши текущие приоритеты</h2><p className="text-lg leading-relaxed">{reading.summary}</p><p className="text-sm text-gray-600">Основа: первые два цвета второго прохода — {names(selected.slice(0,2))}. {reading.pairMatched ? "Разбор сочетания." : "Разбор отдельных цветов: однозначной записи этой пары в источнике нет."}</p></section>}
      {reading && <section className="space-y-4"><h2 className="text-2xl font-bold">Что сейчас особенно важно</h2>{reading.preferred.map(item=><article key={item.id} className="bg-white border rounded-3xl p-6 space-y-3"><div aria-hidden="true" className="h-12 rounded-xl" style={{backgroundColor:getColor(item.id).hex}}/><h3 className="text-xl font-bold">{item.need}</h3><p className="leading-relaxed">{item.preferred}</p><p className="text-sm text-gray-500">{getColor(item.id).name} · позиция {selected.indexOf(item.id)+1}</p></article>)}</section>}
      {reading && <section className="space-y-4"><h2 className="text-2xl font-bold">Что отошло на второй план</h2>{reading.deferred.map(item=><article key={item.id} className="bg-white border rounded-3xl p-6 space-y-3"><h3 className="text-xl font-bold">{item.need}</h3><p className="leading-relaxed">{item.deferred}</p><p className="text-sm text-gray-500">{getColor(item.id).name} · позиция {selected.indexOf(item.id)+1}</p></article>)}</section>}
      {reading && <section className="space-y-4"><h2 className="text-2xl font-bold">Что может вызывать напряжение</h2>{reading.rejected.map(item=><article key={item.id} className="bg-white border rounded-3xl p-6 space-y-3"><div aria-hidden="true" className="h-12 rounded-xl" style={{backgroundColor:getColor(item.id).hex}}/><h3 className="text-xl font-bold">{item.need}</h3><p className="leading-relaxed">{item.rejected}</p><p className="text-sm text-gray-500">{getColor(item.id).name} · позиция {selected.indexOf(item.id)+1}. Разбор отдельного цвета.</p></article>)}</section>}
      <section className="bg-white border rounded-3xl p-5 sm:p-7 space-y-6"><h2 className="text-2xl font-bold">Ваши два ряда</h2><Row ids={first} label="Первый проход"/><Row ids={selected} label="Второй проход"/></section>
      <section className="bg-indigo-50 rounded-3xl p-6 space-y-4"><h2 className="text-2xl font-bold">Что сохранилось и изменилось</h2>
        <p>На прежних местах осталось <strong>{same.length} из 8 цветов</strong>{same.length ? ": "+names(same.map(c=>c.id))+"." : ". Все цвета изменили позиции."}</p>
        <p>{overlap.length === 2 ? "В первую пару обоих проходов вошли те же два цвета." : overlap.length === 1 ? "В первую пару оба раза вошёл один цвет: "+names(overlap)+"." : "Состав первых двух цветов полностью изменился."}</p>
        <p>{biggest === 0 ? "Оба ряда полностью совпали." : "Самое большое перемещение — "+biggest+" поз.: "+names(changes.filter(c=>Math.abs(c.from-c.to)===biggest).map(c=>c.id))+"."}</p>
      </section>
      <section><h2 className="text-2xl font-bold mb-4">Каждый цвет: было → стало</h2><div className="grid sm:grid-cols-2 gap-3">{changes.map(c=><div key={c.id} className="flex gap-3 items-center p-4 rounded-2xl bg-white border"><span aria-hidden="true" className="w-10 h-10 rounded-lg shrink-0" style={{backgroundColor:getColor(c.id).hex}}/><div><h3 className="font-bold">{getColor(c.id).name}</h3><p className="text-sm text-gray-600">{c.from} → {c.to} · {c.from===c.to ? "место не изменилось" : c.to<c.from ? "выбран раньше" : "выбран позже"}</p></div></div>)}</div></section>
      <section className="bg-white border rounded-3xl p-6 space-y-4"><h2 className="text-2xl font-bold">Сохранить результат</h2><div className="flex flex-col sm:flex-row gap-3"><button onClick={copy} className={button+" bg-indigo-600 text-white"}>Скопировать результат</button><button onClick={start} className={button}>Начать заново</button></div><p role="status" className="text-sm">{status}</p></section>
    </div>}
  </section>;
}
