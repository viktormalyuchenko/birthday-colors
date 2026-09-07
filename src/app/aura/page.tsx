"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const CHAKRAS_DATA: Record<number, any> = {
  1: {
    name: "Муладхара",
    aura: "Красная Аура",
    color1: "#ff4d4d",
    color2: "#8b0000",
    feature: "Выживание, сила и укорененность",
    desc: "У вас невероятно мощная, земная энергия. Вы лидер, который не боится трудностей и всегда твердо стоит на ногах. Ваша аура излучает уверенность.",
  },
  2: {
    name: "Свадхистана",
    aura: "Оранжевая Аура",
    color1: "#ff9933",
    color2: "#cc5200",
    feature: "Творчество, сексуальность и эмоции",
    desc: "Вы человек страстей. Ваша аура наполнена созидательной энергией. Люди тянутся к вам за теплом, вдохновением и радостью.",
  },
  3: {
    name: "Манипура",
    aura: "Желтая Аура",
    color1: "#ffcc00",
    color2: "#b38f00",
    feature: "Воля, интеллект и амбиции",
    desc: "Вы — генератор идей с солнечной аурой. Желтый цвет ауры говорит об остром уме, лидерских качествах и способности легко зарабатывать деньги.",
  },
  4: {
    name: "Анахата",
    aura: "Зеленая Аура",
    color1: "#33cc33",
    color2: "#006600",
    feature: "Любовь, баланс и сострадание",
    desc: "Ваша аура целительна. Вы излучаете покой и безусловную любовь. Окружающие чувствуют себя в безопасности рядом с вами.",
  },
  5: {
    name: "Вишудха",
    aura: "Голубая Аура",
    color1: "#33ccff",
    color2: "#007399",
    feature: "Самовыражение и истина",
    desc: "У вас аура оратора и философа. Вы умеете доносить правду и творчески выражать свои мысли. Вы не переносите лжи.",
  },
  6: {
    name: "Аджна",
    aura: "Синяя Аура (Индиго)",
    color1: "#3333ff",
    color2: "#000099",
    feature: "Интуиция и шестое чувство",
    desc: "Вы обладаете аурой мистика. У вас невероятно развита интуиция, и вы часто предвидите события до их наступления. Вы видите людей насквозь.",
  },
  7: {
    name: "Свадхистана",
    aura: "Оранжевая Аура",
    color1: "#ff9933",
    color2: "#cc5200",
    feature: "Творчество, сексуальность и эмоции",
    desc: "Вы человек страстей. Ваша аура наполнена созидательной энергией. Люди тянутся к вам за теплом, вдохновением и радостью.",
  },
  8: {
    name: "Муладхара",
    aura: "Красная Аура",
    color1: "#ff4d4d",
    color2: "#8b0000",
    feature: "Выживание, сила и укорененность",
    desc: "У вас невероятно мощная, земная энергия. Вы лидер, который не боится трудностей и всегда твердо стоит на ногах. Ваша аура излучает уверенность.",
  },
  9: {
    name: "Сахасрара",
    aura: "Фиолетовая Аура",
    color1: "#9933ff",
    color2: "#4d0099",
    feature: "Высшая мудрость и духовность",
    desc: "Вы обладаете редчайшей фиолетовой аурой старой души. Вы мудры не по годам, склонны к глобальному альтруизму и легко отпускаете материальное ради духовного.",
  },
};

export default function AuraPage() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateAura = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    const day = Number(date); // Берем только день рождения

    // Сводим день к числу от 1 до 9 (по ведической нумерологии влияет именно число рождения)
    let sum = day;
    while (sum > 9) {
      sum = sum
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
    setResult(CHAKRAS_DATA[sum]);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white py-16 px-4 overflow-hidden relative">
      {/* АНИМИРОВАННЫЙ ФОН АУРЫ */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-40 blur-[100px]"
        style={{
          background: result
            ? `radial-gradient(circle at 50% 50%, ${result.color1} 0%, ${result.color2} 50%, #050505 100%)`
            : "none",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: "Аура и Чакры" }]} textColor="#ffffff" />

        {!result ? (
          <div className="text-center animate-in fade-in duration-700 mt-12">
            <h1 className="text-5xl md:text-7xl font-black font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-2">
              Цвет ауры по дню рождения
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Выберите день месяца и получите символический цвет и связанную с ним чакру по таблице сайта. Это развлекательный расчёт: он не измеряет ауру или состояние здоровья.
            </p>
            <form
              onSubmit={calculateAura}
              className="flex flex-col sm:flex-row gap-4 justify-center bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md max-w-lg mx-auto"
            >
              <select aria-label="День рождения" required value={date} onChange={e=>setDate(e.target.value)} className="bg-[#171717] rounded-xl p-4 text-white min-w-0" style={{colorScheme:"dark"}}>
                <option value="">День рождения</option>
                {Array.from({length:31},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
              <button
                type="submit"
                className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-gray-200 transition-transform active:scale-95"
              >
                Узнать ауру
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in-95 fade-in duration-1000 mt-12">
            <span className="uppercase tracking-widest text-sm font-bold opacity-70 mb-4 inline-block">
              Символическая чакра: {result.name}
            </span>
            <h1
              className="text-6xl md:text-8xl font-black font-serif mb-8 drop-shadow-2xl"
              style={{ color: result.color1 }}
            >
              {result.aura}
            </h1>

            {/* Круг-визуализация ауры */}
            <div
              className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full mb-12 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${result.color1} 0%, ${result.color2} 100%)`,
                boxShadow: `0 0 80px ${result.color1}`,
              }}
            />

            <div className="bg-white/10 p-8 md:p-12 rounded-[2.5rem] border border-white/20 backdrop-blur-xl text-left max-w-3xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-bold font-serif mb-4 text-white">
                Главная энергия: {result.feature}
              </h3>
              <p className="text-lg leading-relaxed text-gray-300 mb-8">
                Цвет в этой системе связан с темой «{result.feature}». Используйте его как образ для творчества, а не как вывод о своих качествах.
              </p>

              <button
                onClick={() => setResult(null)}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1"
              >
                Выбрать другой день
              </button>
            </div>
          </div>
        )}

        {/* SEO БЛОК ДЛЯ АУРЫ */}
        <article className="mt-16 pt-10 border-t border-white/10 max-w-4xl mx-auto text-gray-300 space-y-6 leading-relaxed">
          <h2 className="text-3xl font-bold text-white">Как выбирается цвет ауры</h2>
          <p>Используется только день месяца: например, 28 → 2 + 8 = 10 → 1 + 0 = 1. Месяц и год не участвуют. Полученное число сопоставляется с цветом в таблице ниже. Это правило нашего калькулятора, а не способ наблюдения реальной ауры.</p>
          <h2 className="text-2xl font-bold text-white">Таблица чисел, цветов и чакр</h2>
          <div className="grid sm:grid-cols-2 gap-3">{Object.entries(CHAKRAS_DATA).map(([number,item])=><div key={number} className="flex gap-4 items-center rounded-2xl border border-white/15 bg-white/5 p-4"><span aria-hidden="true" className="w-12 h-12 shrink-0 rounded-full" style={{backgroundColor:item.color1}}/><div><h3 className="font-bold text-white">{number} — {item.aura}</h3><p>{item.name}</p><p className="font-mono text-sm">{item.color1}</p></div></div>)}</div>
          <details className="rounded-2xl border border-white/15 p-5"><summary className="font-bold cursor-pointer">Почему у разных людей одинаковый результат?</summary><p className="mt-3">Дни 1, 10, 19 и 28 сводятся к единице. Кроме того, в таблице некоторые числа связаны с одной чакрой. Результат не является уникальным описанием человека.</p></details>
          <details className="rounded-2xl border border-white/15 p-5"><summary className="font-bold cursor-pointer">Это то же самое, что цвет числа судьбы?</summary><p className="mt-3">Нет. Здесь учитывается только день, а число судьбы складывается из всех цифр даты рождения. Эти символические системы могут дать разные цвета.</p></details>
          <Link href="/numerology" className="inline-block text-purple-200 underline font-bold">Посчитать число судьбы по полной дате →</Link>
        </article>
      </div>
    </main>
  );
}
