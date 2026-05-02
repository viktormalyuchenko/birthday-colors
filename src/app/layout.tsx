import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script"; // ИМПОРТ ДЛЯ МЕТРИКИ
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://colorstrology.ru"),
  title: {
    default: "Colorstrology | Ваш цвет по дате рождения",
    template: "%s | Colorstrology",
  },
  description:
    "Уникальный портал самопознания. Узнайте свой личный цвет по дате рождения, числу судьбы или лунному знаку. Японский календарь, нумерология и астрология цвета.",
  keywords: [
    "колорострология",
    "цвет по дате рождения",
    "японские цвета рождения",
    "цветовая нумерология",
    "совместимость по луне",
    "фаза луны",
    "colorstrology",
  ],
  openGraph: {
    title: "Colorstrology — Познай себя через цвет",
    description:
      "Узнайте, какой оттенок управляет вашей судьбой по дате рождения.",
    url: "https://colorstrology.ru",
    siteName: "Colorstrology",
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased flex flex-col min-h-screen bg-slate-50`}
      >
        {/* ЯНДЕКС МЕТРИКА */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108705197', 'ym');

            ym(108705197, 'init', {
                 ssr:true, 
                 webvisor:true, 
                 clickmap:true, 
                 ecommerce:"dataLayer", 
                 referrer: document.referrer, 
                 url: location.href, 
                 accurateTrackBounce:true, 
                 trackLinks:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108705197"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
