"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Отмечаем, что компонент смонтирован (нужно для Portals)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Закрываем мобильное меню при смене маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Блокируем скролл страницы при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Используем пустую строку вместо 'unset'
    }
    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // --- КОМПОНЕНТ ПОЛНОЭКРАННОГО МЕНЮ (РЕНДЕРИТСЯ В BODY) ---
  const mobileMenu =
    isMounted &&
    createPortal(
      <div
        className={`fixed inset-0 z-[99999] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Задний фон (блюр) */}
        <div
          className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Выезжающая панель */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#F9F9F8] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Кнопка закрытия сверху */}
          <div className="flex justify-end p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-gray-900 text-3xl leading-none"
            >
              &times;
            </button>
          </div>

          <div className="p-6 overflow-y-auto h-full pb-20">
            {/* Группа 1: Календари */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-2">
                Календари
              </h4>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <Link
                  href="/japanese-colors"
                  className="flex items-center gap-4 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-xl">
                    🌸
                  </span>
                  <span className="font-bold text-gray-900">
                    Японский календарь
                  </span>
                </Link>
                <Link
                  href="/pantone"
                  className="flex items-center gap-4 p-4 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                    🎨
                  </span>
                  <span className="font-bold text-gray-900">Цвета Pantone</span>
                </Link>
              </div>
            </div>

            {/* Группа 2: Личность */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-2">
                Познание себя
              </h4>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <Link
                  href="/numerology"
                  className="flex items-center gap-4 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl font-serif text-indigo-500">
                    N
                  </span>
                  <span className="font-bold text-gray-900">Число судьбы</span>
                </Link>
                <Link
                  href="/aura"
                  className="flex items-center gap-4 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-xl">
                    ✨
                  </span>
                  <span className="font-bold text-gray-900">Аура и Чакры</span>
                </Link>
                <Link
                  href="/luscher-test"
                  className="flex items-center gap-4 p-4 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
                    👁
                  </span>
                  <span className="font-bold text-gray-900">Тест Люшера</span>
                </Link>
              </div>
            </div>

            {/* Группа 3: Отношения */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-2">
                Отношения
              </h4>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <Link
                  href="/color-compatibility"
                  className="flex items-center gap-4 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-xl">
                    ❤️
                  </span>
                  <span className="font-bold text-gray-900">
                    Цветовая химия
                  </span>
                </Link>
                <Link
                  href="/moon-phase"
                  className="flex items-center gap-4 p-4 active:bg-gray-50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-xl">
                    🌔
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">Слияние Лун</span>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              href="/blog"
              className="flex justify-center items-center py-4 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-transform"
            >
              Читать Блог →
            </Link>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-gray-900 hover:text-indigo-600 transition-colors font-serif"
        >
          Colorstrology.
        </Link>

        {/* НАВИГАЦИЯ ДЕСКТОП */}
        <nav className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 items-center">
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

          <div className="relative group cursor-pointer flex items-center h-full py-6">
            <span className="hover:text-gray-900 transition-colors flex items-center">
              Личность <span className="ml-1 text-[10px]">▼</span>
            </span>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-2 flex flex-col min-w-[220px] text-left">
                <Link
                  href="/numerology"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900 tracking-normal capitalize text-sm font-medium"
                >
                  Число судьбы
                </Link>
                <Link
                  href="/name-color"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900 tracking-normal capitalize text-sm font-medium"
                >
                  Цвет имени
                </Link>
                <Link
                  href="/luscher-test"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900 tracking-normal capitalize text-sm font-medium"
                >
                  Тест Люшера
                </Link>
                <Link
                  href="/aura"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900 tracking-normal capitalize text-sm font-medium"
                >
                  Аура и Чакры
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer flex items-center h-full py-6">
            <span className="hover:text-gray-900 transition-colors flex items-center">
              Совместимость <span className="ml-1 text-[10px]">▼</span>
            </span>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-2 flex flex-col min-w-[240px] text-left">
                <Link
                  href="/color-compatibility"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900 tracking-normal capitalize text-sm font-medium"
                >
                  Цветовая химия
                </Link>
                <Link
                  href="/moon-phase"
                  className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex justify-between items-center text-gray-500 hover:text-gray-900 tracking-normal capitalize text-sm font-medium"
                >
                  Фазы Луны
                </Link>
              </div>
            </div>
          </div>

          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Блог
          </Link>
        </nav>

        {/* КНОПКА ГАМБУРГЕР (Мобилки) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-900 focus:outline-none relative"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className="w-6 h-0.5 bg-current"></span>
            <span className="w-4 h-0.5 bg-current"></span>
            <span className="w-5 h-0.5 bg-current"></span>
          </div>
        </button>
      </div>

      {/* РЕНДЕР МОБИЛЬНОГО МЕНЮ В BODY */}
      {mobileMenu}
    </header>
  );
}
