"use client"; // Магическая строка! Делает компонент клиентским

export default function ShareButton({
  isLight,
  colorName,
}: {
  isLight: boolean;
  colorName: string;
}) {
  const handleShare = () => {
    // В будущем здесь будет генерация картинки (OG Image)
    alert(
      `Скоро мы научимся генерировать красивую картинку для цвета: ${colorName}!`,
    );
  };

  return (
    <button
      onClick={handleShare}
      className={`mt-4 md:mt-0 px-8 py-4 rounded-full font-bold flex-shrink-0 transition-all duration-300 active:scale-95 ${
        isLight
          ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10"
          : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10"
      }`}
    >
      Поделиться цветом
    </button>
  );
}
