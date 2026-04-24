"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Логотип */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="text-3xl font-black tracking-tight text-gray-900 hover:text-indigo-600 transition-colors font-serif"
        >
          Colorstrology.
        </Link>

        {/* Навигация (Десктоп) */}
        <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
          <Link
            href="/japanese-colors"
            className="hover:text-gray-900 transition-colors"
          >
            Японский
          </Link>
          <Link
            href="/numerology"
            className="hover:text-gray-900 transition-colors relative"
          >
            Нумерология{" "}
            <span className="absolute -top-3 -right-5 text-[9px] bg-indigo-50 text-indigo-600 px-1.5 rounded-sm tracking-normal">
              NEW
            </span>
          </Link>
          <Link
            href="/moon-colors"
            className="hover:text-gray-900 transition-colors relative"
          >
            Луна{" "}
            <span className="absolute -top-3 -right-5 text-[9px] bg-rose-50 text-rose-600 px-1.5 rounded-sm tracking-normal">
              Топ
            </span>
          </Link>
          <Link
            href="/pantone"
            className="hover:text-gray-900 transition-colors"
          >
            Pantone
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Блог
          </Link>
        </nav>

        {/* Кнопка Гамбургер (Мобилки) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Мобильное выпадающее меню */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col px-6 py-8 gap-6 text-sm font-bold uppercase tracking-widest text-gray-600 animate-in slide-in-from-top-4">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            Главная
          </Link>
          <Link
            href="/japanese-colors"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            Японский календарь
          </Link>
          <Link
            href="/numerology"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            Нумерология
          </Link>
          <Link
            href="/moon-colors"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            Лунные цвета
          </Link>
          <Link
            href="/pantone"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            Pantone
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            Блог
          </Link>
        </div>
      )}
    </header>
  );
}
