"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export default function BirthdayFinder() {
  const router = useRouter();
  const [month, setMonth] = useState("09");
  const [day, setDay] = useState("07");
  const [system, setSystem] = useState("japanese");
  const [error, setError] = useState("");
  const days = new Date(2000, Number(month), 0).getDate();
  return <form onSubmit={(event) => {
    event.preventDefault();
    if (system === "pantone" && month === "02" && day === "29") {
      setError("Для 29 февраля есть цвет в японском календаре. Выберите эту систему.");
      return;
    }
    router.push(`${system === "pantone" ? "/pantone" : ""}/${month}${day}`);
  }} className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-lg md:p-8">
    <h2 className="mb-5 font-serif text-2xl font-bold">У каждого дня свой оттенок</h2>
    <div className="grid grid-cols-2 gap-4">
      <label className="text-sm font-medium">День<select value={day} onChange={e => {setDay(e.target.value);setError("");}} className="mt-2 w-full rounded-xl border border-gray-200 bg-stone-50 p-3">{Array.from({length:days},(_,i) => String(i+1).padStart(2,"0")).map(d => <option key={d} value={d}>{Number(d)}</option>)}</select></label>
      <label className="text-sm font-medium">Месяц<select value={month} onChange={e => {const m=e.target.value;setMonth(m);setDay(String(Math.min(Number(day),new Date(2000,Number(m),0).getDate())).padStart(2,"0"));setError("");}} className="mt-2 w-full rounded-xl border border-gray-200 bg-stone-50 p-3">{months.map((m,i)=><option key={m} value={String(i+1).padStart(2,"0")}>{m}</option>)}</select></label>
    </div>
    <fieldset className="my-5"><legend className="mb-2 text-sm font-medium">Выберите календарь</legend><div className="flex flex-wrap gap-4">{[["japanese","Японский"],["pantone","Pantone"]].map(([value,label])=><label key={value} className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="birthday-system" value={value} checked={system===value} onChange={()=>{setSystem(value);setError("");}}/>{label}</label>)}</div></fieldset>
    {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
    <button className="w-full rounded-xl bg-gray-900 px-5 py-4 font-bold text-white hover:bg-indigo-700">Узнать мой цвет →</button>
    <p className="mt-3 text-xs leading-relaxed text-gray-500">Год рождения не нужен. Вы получите название оттенка, HEX-код и описание.</p>
  </form>;
}
