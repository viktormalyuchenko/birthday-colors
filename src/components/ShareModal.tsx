"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ShareProps {
  colorHex: string;
  colorName: string;
  colorEnName: string;
  dateText: string;
  textColor: string;
  feature: string;
}

export default function ShareModal({
  colorHex,
  colorName,
  colorEnName,
  dateText,
  textColor,
  feature,
}: ShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Состояние для готовой картинки
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setUrl(window.location.href);
    setIsMounted(true);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Функция только ГЕНЕРИРУЕТ картинку, но НЕ скачивает её скрыто
  const generateImage = async () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1920;

    ctx.fillStyle = colorHex || "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";

    ctx.font = "300 60px sans-serif";
    ctx.fillText(dateText.toUpperCase(), width / 2, 450);

    let fontSize = 160;
    ctx.font = `bold ${fontSize}px sans-serif`;
    while (ctx.measureText(colorName).width > width - 100 && fontSize > 60) {
      fontSize -= 5;
      ctx.font = `bold ${fontSize}px sans-serif`;
    }
    ctx.fillText(colorName, width / 2, 650);

    ctx.font = "italic 60px serif";
    ctx.fillText(colorEnName, width / 2, 770);

    const words = feature.split(" ");
    let line = "";
    let y = 1050;
    const lineHeight = 70;
    ctx.font = "500 50px sans-serif";

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width - 160 && i > 0) {
        ctx.fillText(line.trim(), width / 2, y);
        line = words[i] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), width / 2, y);

    ctx.font = "bold 50px serif";
    ctx.fillText("Colorstrology.", width / 2, 1700);
    ctx.font = "30px sans-serif";
    ctx.globalAlpha = 0.7;
    ctx.fillText("colorstrology.ru", width / 2, 1760);
    ctx.globalAlpha = 1.0;

    // Сохраняем картинку в state
    const dataUrl = canvas.toDataURL("image/png");
    setGeneratedImage(dataUrl);
    setIsGenerating(false);

    // 2. Безопасный вызов Native Share API (если поддерживается телефоном)
    if (navigator.share) {
      try {
        // Конвертируем DataURL в File для мобильного шаринга
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "my-color.png", { type: "image/png" });

        await navigator.share({
          title: "Мой цвет рождения",
          text: `Мой цвет: ${colorName}! Узнай свой на Colorstrology.ru`,
          files: [file], // Отправляем картинку прямо в меню телефона!
        });
      } catch (err) {
        console.log("Шаринг отменен или не поддерживается");
      }
    }
  };

  const renderModal = () => {
    if (!isOpen || !isMounted) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4"
        onPointerDown={() => setIsOpen(false)}
      >
        <div
          className="bg-[#212121] text-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transform transition-transform"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-serif">Поделиться</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-3xl leading-none"
            >
              &times;
            </button>
          </div>

          <div className="flex gap-6 mb-8 overflow-x-auto hide-scrollbar pb-2 pt-2">
            {/* БЕЗОПАСНАЯ КНОПКА ГЕНЕРАЦИИ (БЕЗ СКРЫТОГО СКАЧИВАНИЯ) */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              {generatedImage && !navigator.share ? (
                // Если сгенерировали, но Native Share не работает (например на ПК) - показываем НАСТОЯЩУЮ ссылку <a>
                <a
                  href={generatedImage}
                  download={`${dateText.replace(" ", "_")}_colorstrology.png`}
                  className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </a>
              ) : (
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {isGenerating ? (
                    "⏳"
                  ) : (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                </button>
              )}
              <span className="text-xs text-gray-300 font-medium">
                {generatedImage && !navigator.share ? "Скачать" : "Stories"}
              </span>
            </div>

            {/* Оставляем Telegram и VK ссылки без изменений */}
            <a
              href={`https://t.me/share/url?url=${url}&text=Узнал свой цвет рождения на Colorstrology!`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-3 shrink-0 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0088cc] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.304-.346-.108l-6.4 4.024-2.76-.86c-.6-.188-.61-.6.125-.916l10.78-4.145c.5-.188.94.108.78.892z" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 font-medium">
                Telegram
              </span>
            </a>

            <a
              href={`https://vk.com/share.php?url=${url}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-3 shrink-0 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0077FF] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.543-1.675-1.161-.059-2.979 2.115-2.38 3.125-4.223 3.125-5.313 0-.61-.264-.863-.843-.863h-3.216c-.536 0-.734.203-.996.884-1.042 2.71-3.264 5.922-4.086 6.13-.404.103-.687-.042-.687-.935V6.305c0-.687-.202-1.053-.846-1.053H9.957c-.426 0-.686.208-.686.416 0 .445.626.685.626 2.21v4.721c0 .878-.458 1.055-.742 1.055-.745 0-2.42-2.96-3.411-5.918-.218-.65-.417-.98-.958-.98H1.57c-.611 0-.745.289-.745.666 0 .613.84 3.738 3.992 8.358 2.148 3.155 5.176 4.215 7.64 4.215h.705z" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 font-medium">
                ВКонтакте
              </span>
            </a>
          </div>

          <div className="flex items-center bg-[#0f0f0f] rounded-xl border border-gray-700 overflow-hidden p-1">
            <input
              type="text"
              readOnly
              value={url}
              className="bg-transparent text-sm text-gray-300 px-4 w-full outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors flex-shrink-0"
            >
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 md:mt-0 px-8 py-4 rounded-full font-bold transition-transform active:scale-95 flex-shrink-0 shadow-lg"
        style={{ backgroundColor: textColor, color: colorHex }}
      >
        Поделиться
      </button>
      <canvas
        ref={canvasRef}
        width="1080"
        height="1920"
        style={{ display: "none" }}
      ></canvas>
      {renderModal()}
    </>
  );
}
