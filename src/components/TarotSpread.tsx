"use client";
import { useRef, useState } from "react";
import { drawTarotIds, tarotCards } from "@/lib/tarot";
const positions = [
  {name:"Ситуация",description:"Основная тема, через которую можно рассмотреть вопрос.",field:"meaning"},
  {name:"Препятствие",description:"То, чему стоит уделить внимание, прежде чем действовать.",field:"attention"},
  {name:"Совет",description:"Практический шаг, который можно примерить к ситуации.",field:"advice"},
] as const;
export default function TarotSpread(){
  const [ids,setIds]=useState<number[]>([]);
  const [status,setStatus]=useState("");
  const result=useRef<HTMLHeadingElement>(null);
  const draw=()=>{setIds(drawTarotIds(3));setStatus("");requestAnimationFrame(()=>result.current?.focus({preventScroll:true}));};
  const copy=async()=>{
    try{await navigator.clipboard.writeText(positions.map((p,i)=>p.name+": "+tarotCards[ids[i]].name+"\n"+tarotCards[ids[i]][p.field]).join("\n\n")+"\nhttps://colorstrology.ru/tarot/tri-karty");setStatus("Расклад скопирован.");}
    catch{setStatus("Не удалось скопировать. Вы можете выделить текст вручную.");}
  };
  return <section className="mt-8 space-y-6">
    {!ids.length ? <div className="rounded-3xl bg-[#171B2F] p-6 sm:p-10 text-white"><div aria-hidden="true" className="flex justify-center gap-3 mb-7">{[0,1,2].map(i=><div key={i} className="w-20 h-32 sm:w-28 sm:h-44 rounded-xl border border-amber-200/50 flex items-center justify-center text-4xl text-amber-100">✦</div>)}</div><p className="mb-6 text-slate-300">Сформулируйте вопрос про себя. Три разные карты покажут тему ситуации, возможное препятствие и совет. Вводить личные сведения не нужно.</p><button onClick={draw} className="rounded-xl min-h-12 px-6 py-3 bg-amber-100 text-slate-950 font-bold">Вытянуть три карты →</button></div>
    : <>
      <h2 ref={result} tabIndex={-1} className="text-2xl font-bold focus:outline-none">Ваш расклад</h2>
      <div className="grid md:grid-cols-3 gap-5">{positions.map((p,i)=>{const card=tarotCards[ids[i]];return <article key={p.name} className="rounded-3xl border bg-white p-5 space-y-4"><p className="text-sm font-bold uppercase tracking-widest text-indigo-700">{i+1}. {p.name}</p><div className="h-40 rounded-2xl flex flex-col items-center justify-center gap-3 text-center p-4" style={{background:card.palette[2]}}><span aria-hidden="true" className="text-5xl" style={{color:card.palette[0]}}>✦</span><h3 className="text-xl font-serif font-bold">{card.name}</h3></div><p className="text-sm text-gray-500">{p.description}</p><p className="leading-relaxed">{card[p.field]}</p><details><summary className="cursor-pointer text-sm font-semibold">Значение карты и палитра</summary><p className="text-sm text-gray-600 mt-3">{card.meaning}</p><div className="grid grid-cols-3 gap-2 mt-3">{card.palette.map(hex=><div key={hex}><div className="h-8 rounded" style={{backgroundColor:hex}}/><span className="font-mono text-[10px]">{hex}</span></div>)}</div></details></article>;})}</div>
      <div className="rounded-2xl bg-indigo-50 p-6"><h3 className="font-bold mb-3">Как прочитать вместе</h3><p>Начните с темы «{tarotCards[ids[0]].theme.toLowerCase()}», сопоставьте её с предупреждением второй карты и завершите конкретным действием из третьей. Это чтение по позициям, а не персональный анализ введённого вопроса.</p></div>
      <div className="flex flex-wrap gap-3"><button onClick={copy} className="rounded-xl min-h-12 px-6 py-3 bg-slate-900 text-white font-bold">Скопировать расклад</button><button onClick={()=>{setIds([]);setStatus("");}} className="rounded-xl border min-h-12 px-6 py-3 font-bold">Новый расклад</button></div><p role="status" className="text-sm">{status}</p>
    </>}
  </section>;
}
