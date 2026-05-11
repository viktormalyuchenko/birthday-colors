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
    ];
  },
};

export default nextConfig;
