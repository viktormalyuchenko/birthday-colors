import numerologyData from "@/data/numerology_colors.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareModal from "@/components/ShareModal";

function getContrastColor(hexcolor: string) {
  if (!hexcolor) return "#111827";
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111827" : "#ffffff";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const data = (numerologyData as any)[resolved.number];
  if (!data) return { title: "Не найдено" };

  const cleanHex = (data.hex || "cccccc").replace("#", "");

  return {
    title: `Число Судьбы ${data.number} — Цвет ${data.ru_name}`,
    description: data.ru_description,
    openGraph: {
      title: `Моё число судьбы: ${data.number} (${data.ru_name})`,
      description: data.ru_feature,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(data.ru_name)}&hex=${cleanHex}&subtitle=${encodeURIComponent("Число Судьбы " + data.number)}&system=colorstrology.viktoor.ru`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function NumerologyResultPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const resolved = await params;
  const data = (numerologyData as any)[resolved.number];

  if (!data) notFound();

  const textColor = getContrastColor(data.hex);
  const borderColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.1)";
  const glassBgColor =
    textColor === "#ffffff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)";

  return (
    <main
      className="min-h-screen flex flex-col items-center p-6 lg:p-12 transition-colors duration-500"
      style={{ backgroundColor: data.hex, color: textColor }}
    >
      <div className="w-full max-w-4xl relative z-10 pt-4">
        <Link
          href="/numerology"
          className="inline-flex items-center gap-2 mb-10 pb-1 hover:opacity-60 font-medium"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          ← Назад к калькулятору
        </Link>

        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-light mb-6 uppercase tracking-widest opacity-90">
            Число Судьбы: {data.number}
          </h3>
          <h1 className="text-6xl sm:text-8xl font-black mb-4 tracking-tighter font-serif drop-shadow-sm">
            {data.ru_name}
          </h1>
          <h2 className="text-xl md:text-3xl font-light font-serif italic opacity-90">
            {data.en_name} / Планета: {data.planet}
          </h2>
        </div>

        <div
          className="text-center text-xl md:text-3xl font-medium mb-12 p-8 rounded-3xl backdrop-blur-md"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: glassBgColor,
          }}
        >
          "{data.ru_feature}"
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="md:col-span-2 p-8 rounded-3xl backdrop-blur-md"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: glassBgColor,
            }}
          >
            <h3 className="text-2xl font-bold mb-4 font-serif">
              Психология Числа
            </h3>
            <p className="text-lg leading-relaxed opacity-95">
              {data.ru_description}
            </p>
          </div>
          <div
            className="p-8 rounded-3xl backdrop-blur-md flex flex-col justify-center"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: glassBgColor,
            }}
          >
            <h3 className="text-xl font-bold mb-4 font-serif">
              Ключевые энергии:
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.ru_keywords.map((word: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    border: `1px solid ${borderColor}`,
                    backgroundColor: glassBgColor,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ShareModal
            colorHex={data.hex}
            colorName={data.ru_name}
            colorEnName={`Число Судьбы: ${data.number}`}
            dateText=""
            textColor={textColor}
            feature={data.ru_feature}
          />
        </div>
      </div>
    </main>
  );
}
