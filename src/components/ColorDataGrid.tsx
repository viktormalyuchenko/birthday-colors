"use client";

import { useState } from "react";

interface ColorDataProps {
  hex: string;
  rgb: string;
  cmyk: string;
  hsb: string;
  textColor: string;
}

export default function ColorDataGrid({
  hex,
  rgb,
  cmyk,
  hsb,
  textColor,
}: ColorDataProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (!text || text === "N/A") return;

    navigator.clipboard.writeText(text);
    setToastMsg(`${label} скопирован!`);

    // Скрываем тост через 2 секунды
    setTimeout(() => {
      setToastMsg(null);
    }, 2000);
  };

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-sm flex-grow"
        style={{ color: textColor }}
      >
        {/* Блок HEX */}
        <div
          onClick={() => handleCopy(hex, "HEX код")}
          className="group cursor-pointer p-2 -m-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <p className="font-bold mb-1 opacity-60 uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-1">
            HEX{" "}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              📋
            </span>
          </p>
          <p className="text-base sm:text-lg font-mono">{hex || "N/A"}</p>
        </div>

        {/* Блок RGB */}
        <div
          onClick={() => handleCopy(rgb.replace(/R:|G:|B:/g, ""), "RGB код")}
          className="group cursor-pointer p-2 -m-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <p className="font-bold mb-1 opacity-60 uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-1">
            RGB{" "}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              📋
            </span>
          </p>
          <p className="text-base sm:text-lg font-mono">
            {rgb.replace(/R:|G:|B:/g, "")}
          </p>
        </div>

        {/* Блок CMYK (без truncate, с break-words) */}
        <div
          onClick={() => handleCopy(cmyk, "CMYK код")}
          className="group cursor-pointer p-2 -m-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <p className="font-bold mb-1 opacity-60 uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-1">
            CMYK{" "}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              📋
            </span>
          </p>
          <p className="text-sm sm:text-base font-mono break-words">
            {cmyk || "N/A"}
          </p>
        </div>

        {/* Блок HSB (без truncate, с break-words) */}
        <div
          onClick={() => handleCopy(hsb, "HSB код")}
          className="group cursor-pointer p-2 -m-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <p className="font-bold mb-1 opacity-60 uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-1">
            HSB{" "}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              📋
            </span>
          </p>
          <p className="text-sm sm:text-base font-mono break-words">
            {hsb || "N/A"}
          </p>
        </div>
      </div>

      {/* Всплывающий TOAST */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm animate-in fade-in slide-in-from-bottom-5">
          ✨ {toastMsg}
        </div>
      )}
    </>
  );
}
