"use client";
import { useEffect, useRef, useState } from "react";
import { drawTarotIds, localDay, parseDailyCard, TAROT_STORAGE_KEY, tarotCards } from "@/lib/tarot";

function track(goal: string) {
  if (!["colorstrology.ru","www.colorstrology.ru"].includes(window.location.hostname)) return;
  const ym = (window as Window & {ym?: (id:number,method:string,goal:string)=>void}).ym;
  try { ym?.(108705197,"reachGoal",goal); } catch { /* Analytics must not interrupt the card. */ }
}
export default function TarotDaily() {
  const [ready,setReady]=useState(false);
  const [day,setDay]=useState("");
  const [cardId,setCardId]=useState<number|null>(null);
  const [notice,setNotice]=useState("");
  const [status,setStatus]=useState("");
  const heading=useRef<HTMLHeadingElement>(null);
  const currentDay=useRef("");
  useEffect(()=>{
    const sync=()=>{
      const today=localDay();
      const changed=currentDay.current!==today;
      currentDay.current=today; setDay(today);
      try {
        const id=parseDailyCard(localStorage.getItem(TAROT_STORAGE_KEY),today);
        if(id!==null || changed) setCardId(id);
      } catch { if(changed) setCardId(null); setNotice("Хранилище браузера недоступно. Карта останется только до закрытия или обновления страницы."); }
      if(changed) setStatus("");
      setReady(true);
    };
    sync();
    const timer=window.setInterval(sync,30000);
    window.addEventListener("focus",sync);
    window.addEventListener("storage",sync);
    return ()=>{clearInterval(timer);window.removeEventListener("focus",sync);window.removeEventListener("storage",sync);};
  },[]);
  const draw=()=>{
    const today=localDay();
    let id: number|null=null;
    try { id=parseDailyCard(localStorage.getItem(TAROT_STORAGE_KEY),today); } catch {}
    if(id===null && today===day && cardId!==null) return;
    if(id===null) {
      id=drawTarotIds(1)[0];
      try { localStorage.setItem(TAROT_STORAGE_KEY,JSON.stringify({version:1,day:today,id})); }
      catch { setNotice("Не удалось сохранить карту в браузере. После обновления страницы результат может измениться."); }
      track("tarot_draw");
    }
    currentDay.current=today;setDay(today);setCardId(id);setStatus("");
    requestAnimationFrame(()=>heading.current?.focus({preventScroll:true}));
  };
  const card=cardId===null?null:tarotCards[cardId];
  const copy=async()=>{
    if(!card)return;
    try { await navigator.clipboard.writeText([day+" · "+card.name,card.theme,card.meaning,"Совет: "+card.advice,"Палитра: "+card.palette.join(", "),"https://colorstrology.ru/tarot/karta-dnya"].join("\n"));setStatus("Карта и палитра скопированы.");track("tarot_copy"); }
    catch {setStatus("Копирование недоступно. Можно выделить текст результата вручную.");}
  };
  return <section className="mt-8" aria-label="Вытянуть карту дня">
    {!ready && <p role="status" className="text-sm text-gray-500 mb-5">Подготавливаем колоду…</p>}
    {!card ? <div className="rounded-[2rem] bg-[#171B2F] text-white p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
      <div aria-hidden="true" className="mx-auto w-44 h-64 rounded-2xl border border-amber-200/60 p-3 rotate-3 shadow-xl"><div className="h-full rounded-xl border border-amber-200/30 flex items-center justify-center text-7xl text-amber-100 bg-gradient-to-br from-slate-700 via-indigo-950 to-slate-800">✦</div></div>
      <div><h2 className="text-3xl font-serif font-bold mb-4">Одна карта. Одна тема дня.</h2><p className="text-slate-300 leading-relaxed mb-6">Сделайте небольшую паузу и вытяните карту из полной колоды: 22 Старших и 56 Младших арканов. Все карты — в прямом положении.</p><button disabled={!ready} onClick={draw} className="w-full sm:w-auto min-h-12 rounded-xl px-7 py-4 bg-[#E8CC8D] text-slate-950 font-bold disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4">Вытянуть карту дня →</button></div>
    </div> : <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-7 items-start">
      <div className="rounded-[2rem] p-6 sm:p-8 border border-stone-200 bg-white">
        <div className="relative mx-auto max-w-72 aspect-[2/3] rounded-2xl p-5 overflow-hidden shadow-lg" style={{background:card.palette[2],color:"#202432"}}>
          <div className="absolute inset-3 border rounded-xl border-black/20"/>
          <p className="relative text-center font-serif text-xl">{card.number}</p>
          <svg aria-hidden="true" viewBox="0 0 200 220" className="w-full my-3">
            <circle cx="100" cy="106" r="74" fill={card.palette[0]}/>
            <g transform={"rotate("+(card.id*17)+" 100 106)"}><path d="M100 20 L166 106 L100 192 L34 106 Z" fill="none" stroke={card.palette[1]} strokeWidth="9"/><circle cx="100" cy="106" r="32" fill={card.palette[2]}/><path d="M100 60 L112 94 L146 106 L112 118 L100 152 L88 118 L54 106 L88 94 Z" fill={card.palette[1]}/></g>
          </svg>
          <p className="relative text-center text-2xl font-serif font-bold">{card.name}</p>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">Авторское геометрическое оформление</p>
        <h3 className="font-bold mt-7 mb-3">Палитра карты</h3>
        <div className="grid grid-cols-3 gap-2">{card.palette.map(hex=><div key={hex}><div className="h-12 rounded-lg border border-black/10" style={{backgroundColor:hex}}/><p className="text-xs sm:text-sm font-mono mt-2">{hex}</p></div>)}</div>
        <p className="text-sm text-gray-500 mt-3">Оттенки оформления, а не традиционные соответствия Таро. Светлый — для фона, насыщенный — для акцента.</p>
      </div>
      <div className="space-y-5">
        <div><p className="text-xs uppercase tracking-widest text-indigo-600 mb-2">Ваша карта дня · {card.name}</p><h2 ref={heading} tabIndex={-1} className="text-3xl sm:text-4xl font-serif font-bold focus:outline-none">{card.theme}</h2></div>
        <p className="text-lg text-gray-700 leading-relaxed">{card.meaning}</p>
        <div className="rounded-2xl bg-white border p-6"><h3 className="font-bold text-xl mb-3">На что обратить внимание</h3><p className="text-gray-700 leading-relaxed">{card.attention}</p></div>
        <div className="rounded-2xl bg-indigo-50 p-6"><h3 className="font-bold text-xl mb-3">Совет на сегодня</h3><p className="text-gray-700 leading-relaxed">{card.advice}</p></div>
        <button onClick={copy} className="min-h-12 rounded-xl bg-slate-900 text-white px-6 py-3 font-bold">Скопировать карту и палитру</button>
        <p role="status" className="text-sm text-indigo-700">{status}</p>
        <p className="text-sm text-gray-500">Эта карта останется до конца дня в этом браузере. Завтра можно вытянуть новую; случайно может выпасть та же карта.</p>
      </div>
    </div>}
    {notice && <p role="status" className="mt-4 text-sm text-amber-800">{notice}</p>}
  </section>;
}
