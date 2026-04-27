"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Чтобы закрывать меню при смене страницы

  // Закрываем мобильное меню при переходе на новую страницу
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Блокируем скролл страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-gray-900 hover:text-indigo-600 transition-colors font-serif relative z-[60]"
        >
          Colorstrology.
        </Link>

        {/* НАВИГАЦИЯ ДЕСКТОП */}
        <nav className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
          <Link
            href="/japanese-colors"
            className="hover:text-gray-900 transition-colors"
          >
            Японский
          </Link>
          <Link
            href="/pantone"
            className="hover:text-gray-900 transition-colors"
          >
            Pantone
          </Link>

          <Link
            href="/numerology"
            className="hover:text-gray-900 transition-colors relative group"
          >
            Нумерология
            {/* Выпадающее мини-меню для нумерологии при наведении */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-2 flex flex-col min-w-[200px] text-left">
                <Link
                  href="/numerology"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Число судьбы
                </Link>
                <Link
                  href="/name-color"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Цвет имени
                </Link>
              </div>
            </div>
          </Link>

          <Link
            href="/moon-colors"
            className="hover:text-gray-900 transition-colors"
          >
            Луна
          </Link>

          <Link
            href="/color-compatibility"
            className="hover:text-gray-900 transition-colors relative group"
          >
            Совместимость
            {/* Выпадающее мини-меню для совместимости при наведении */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-2 flex flex-col min-w-[240px] text-left">
                <Link
                  href="/color-compatibility"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Цветовая химия
                </Link>
                <Link
                  href="/moon-phase"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex justify-between items-center"
                >
                  Фазы Луны{" "}
                  <span className="bg-rose-100 text-rose-600 text-[9px] px-2 py-0.5 rounded-full">
                    Тренд
                  </span>
                </Link>
              </div>
            </div>
          </Link>

          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Блог
          </Link>
        </nav>

        {/* КНОПКА ГАМБУРГЕР (Мобилки) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-900 focus:outline-none relative z-[60]"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span
              className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`}
            ></span>
            <span
              className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-4"}`}
            ></span>
            <span
              className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`}
            ></span>
          </div>
        </button>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ (ПОЛНОЭКРАННОЕ) */}
      <div
        className={`fixed inset-0 bg-white z-50 overflow-y-auto pt-24 pb-12 px-6 lg:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex flex-col gap-10">
          {/* Группа 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">
              Календари
            </h4>
            <div className="flex flex-col gap-4 text-xl font-serif font-bold text-gray-900">
              <Link href="/japanese-colors">
                Японский календарь (Tanjoshoku)
              </Link>
              <Link href="/pantone">Pantone Colorstrology</Link>
            </div>
          </div>

          {/* Группа 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">
              Анализ личности
            </h4>
            <div className="flex flex-col gap-4 text-xl font-serif font-bold text-gray-900">
              <Link href="/numerology">Число судьбы</Link>
              <Link href="/name-color">Цветовой код имени</Link>
              <Link href="/moon-colors">Лунный знак зодиака</Link>
            </div>
          </div>

          {/* Группа 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">
              Совместимость
            </h4>
            <div className="flex flex-col gap-4 text-xl font-serif font-bold text-gray-900">
              <Link href="/color-compatibility">Цветовая химия душ</Link>
              <Link href="/moon-phase" className="flex items-center gap-3">
                Слияние Фаз Луны{" "}
                <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md uppercase tracking-widest font-sans">
                  Тренд
                </span>
              </Link>
            </div>
          </div>

          {/* Группа 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">
              Проект
            </h4>
            <div className="flex flex-col gap-4 text-xl font-serif font-bold text-gray-900">
              <Link href="/blog">Блог и Статьи</Link>
              <Link href="/">На главную</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
