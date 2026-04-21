import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-gray-900 hover:text-indigo-600 transition-colors font-serif"
        >
          Colorstrology.
        </Link>

        {/* Навигация (Премиальный вид: заглавные буквы, трекинг, жирность) */}
        <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
          <Link
            href="/japanese-colors"
            className="hover:text-gray-900 transition-colors"
          >
            Японский календарь
          </Link>
          <Link
            href="/numerology"
            className="hover:text-gray-900 transition-colors relative"
          >
            Нумерология
          </Link>
          <Link
            href="/moon-colors"
            className="hover:text-gray-900 transition-colors relative"
          >
            Лунные цвета
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Блог
          </Link>
        </nav>

        {/* Мобильная кнопка */}
        <div className="md:hidden">
          <Link
            href="/blog"
            className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-900 px-5 py-2.5 rounded-full"
          >
            Меню
          </Link>
        </div>
      </div>
    </header>
  );
}
