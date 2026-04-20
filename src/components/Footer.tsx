import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 mt-auto border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="text-3xl font-black text-white mb-6 inline-block"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Colorstrology.
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Агрегатор систем самопознания через цвет. Мы используем реальные
            теории: японскую систему 誕生色, нумерологию и классическую
            колорострологию, чтобы помочь вам узнать себя лучше.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Системы
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Японские цвета
              </Link>
            </li>
            <li>
              <Link
                href="/numerology"
                className="hover:text-white transition-colors"
              >
                Цветовая нумерология
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors opacity-50 cursor-not-allowed"
              >
                Pantone (В разработке)
              </Link>
            </li>
          </ul>
        </div>

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
              <Link href="#" className="hover:text-white transition-colors">
                О проекте
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>
          © {new Date().getFullYear()} Colorstrology Portal. Все права защищены.
        </p>
        <p className="mt-4 md:mt-0 opacity-60">Сделано с любовью к цвету.</p>
      </div>
    </footer>
  );
}
