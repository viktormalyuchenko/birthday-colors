import Link from "next/link";

export default function CompatibilityNav({ active }: { active: "moon" | "color" }) {
  return <nav aria-label="Вариант совместимости" className="mb-8 flex flex-wrap gap-2 text-sm">
    {[{id:"moon",href:"/moon-phase",label:"По фазам Луны"},{id:"color",href:"/color-compatibility",label:"По цветам рождения"}].map(item=><Link key={item.id} href={item.href} aria-current={active===item.id?"page":undefined} className={`rounded-full border px-5 py-3 font-semibold ${active===item.id?"border-indigo-500 bg-indigo-600 text-white":"border-gray-300 bg-white text-gray-700 hover:bg-indigo-50"}`}>{item.label}</Link>)}
  </nav>;
}
