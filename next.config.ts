import type { NextConfig } from "next";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog", // Главная блога
        destination: "/horoscopes",
        permanent: true, // 301 редирект (для SEO)
      },
      {
        source: "/blog/:slug*", // Все статьи блога
        destination: "/horoscopes/:slug*",
        permanent: true,
      },
      {
        source:
          "/horoscopes/taro-prognoz-na-may-2026-dlya-dev-lyubov-dengi-i-peremeny",
        destination:
          "/horoscopes/taro-prognoz-na-may-2026-dlya-vodoleev-lyubov-dengi-i-peremeny",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
