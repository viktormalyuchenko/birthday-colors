import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F9F9F8] text-center px-4 font-sans">
      <div className="max-w-xl">
        <h1 className="text-9xl font-black text-gray-200 mb-4 font-serif tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
          Звезды молчат
        </h2>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          Кажется, страница, которую вы ищете, была перенесена в другое
          измерение или её никогда не существовало.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-gray-900 transition-colors shadow-lg shadow-indigo-600/20"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
