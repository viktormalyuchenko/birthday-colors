"use client";

import { useState, useEffect } from "react";

export default function ArticleShare({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Состояние, которое решает проблему линтера и SSR
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);

    // Проверяем поддержку Native Share только в браузере
    if (typeof navigator !== "undefined" && !!navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "Прогноз на Colorstrology",
        text: title,
        url: url,
      });
    } catch (err) {
      console.log("Share canceled");
    }
  };

  // Пока URL не загрузился, ничего не рендерим
  if (!url) return null;

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-6 border-t border-gray-100 mt-12">
      <h3 className="text-lg font-bold font-serif text-gray-900 mb-6">
        Поделиться прогнозом:
      </h3>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Кнопка нативного шаринга (Появится только на телефонах, где это работает) */}
        {canShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors shadow-md active:scale-95"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Поделиться
          </button>
        )}

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.304-.346-.108l-6.4 4.024-2.76-.86c-.6-.188-.61-.6.125-.916l10.78-4.145c.5-.188.94.108.78.892z" />
          </svg>
          Telegram
        </a>

        {/* VK (НОВАЯ ИДЕАЛЬНАЯ ИКОНКА) */}
        <a
          href={`https://vk.com/share.php?url=${url}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-[#0077FF] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.547 7.104c.2-.646 0-1.104-.836-1.104h-2.443c-.706 0-.999.366-1.164.771 0 0-1.244 2.946-3.003 4.908-.567.55-.826.729-1.174.729-.174 0-.418-.179-.418-.702V7.104c0-.706-.2-1.025-.8-1.025h-4.38c-.447 0-.716.326-.716.635 0 .664.994.819 1.094 2.683v4.041c0 .894-.16 1.057-.507 1.057-.935 0-3.216-3.037-4.565-6.505-.269-.746-.537-1.045-1.243-1.045H1.64c-.8 0-.96.366-.96.771 0 .726.935 4.204 4.385 8.351C7.382 19.382 10.425 21 13.169 21c1.64 0 1.84-.358 1.84-.974v-2.253c0-.805.17-.964.656-.964.358 0 .984.179 2.426 1.541C19.742 19.94 20.06 21 21.054 21h2.443c.8 0 1.194-.388.965-1.159-.25-.826-1.153-1.89-2.336-3.149-.607-.686-1.521-1.432-1.795-1.809-.388-.517-.279-.746 0-1.183.02-.01 3.142-4.244 3.216-5.596z" />
          </svg>
          VK
        </a>

        {/* Скопировать ссылку */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors active:scale-95"
        >
          {copied ? "✓ Скопировано" : "🔗 Ссылка"}
        </button>
      </div>
    </div>
  );
}
