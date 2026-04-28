import { NextResponse } from "next/server";
import japaneseColors from "@/data/birthday_colors.json";

export async function GET() {
  // Получаем текущую дату по Москве (чтобы не было сбоев из-за часовых поясов сервера)
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
  );
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mmdd = `${mm}${dd}`;

  const colorData = (japaneseColors as any)[mmdd];

  if (!colorData)
    return NextResponse.json({ error: "Color not found" }, { status: 404 });

  const MONTH_DECLENSIONS = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const dateText = `${today.getDate()} ${MONTH_DECLENSIONS[today.getMonth()]}`;

  return NextResponse.json({
    dateText,
    hex: colorData.hex.replace("#", ""),
    name: colorData.ru_name,
    feature: colorData.ru_feature,
    keywords: colorData.color_words || colorData.ru_keywords?.join(" • ") || "",
  });
}
