import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 mt-auto border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        {/* Бренд */}
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="text-3xl font-black text-white mb-6 inline-block font-serif"
          >
            Colorstrology.
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Ваш главный портал самопознания через цвет. Мы используем реальные
            теории: японскую систему Tanjoshoku, нумерологию и колорострологию
            Pantone, чтобы помочь вам узнать себя лучше.
          </p>
        </div>

        {/* Столбец 1 */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Личность
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link
                href="/japanese-colors"
                className="hover:text-white transition-colors"
              >
                Японский календарь
              </Link>
            </li>
            <li>
              <Link
                href="/pantone"
                className="hover:text-white transition-colors"
              >
                Цвета Pantone
              </Link>
            </li>
            <li>
              <Link
                href="/numerology"
                className="hover:text-white transition-colors"
              >
                Число судьбы
              </Link>
            </li>
            <li>
              <Link
                href="/name-color"
                className="hover:text-white transition-colors"
              >
                Цвет имени
              </Link>
            </li>
            <li>
              <Link
                href="/moon-colors"
                className="hover:text-white transition-colors"
              >
                Лунные цвета
              </Link>
            </li>
          </ul>
        </div>

        {/* Столбец 2 */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Отношения
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link
                href="/color-compatibility"
                className="hover:text-white transition-colors"
              >
                Цветовая совместимость
              </Link>
            </li>
            <li>
              <Link
                href="/moon-phase"
                className="hover:text-white transition-colors"
              >
                Совместимость Лун (Тренд)
              </Link>
            </li>
          </ul>
        </div>

        {/* Столбец 3 */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Проект
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Блог и статьи
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                На главную
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Копирайт */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>
          © {new Date().getFullYear()} Colorstrology Portal. Все права защищены.
        </p>
        <p className="mt-4 md:mt-0 opacity-60">
          Сделано с любовью к цвету и астрологии.
        </p>
      </div>
    </footer>
  );
}
