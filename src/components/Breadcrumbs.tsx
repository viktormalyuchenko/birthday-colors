import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  textColor?: string; // Добавляем пропс для цвета
}

export default function Breadcrumbs({ items, textColor }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest mb-10 opacity-70"
      style={{ color: textColor || "#9CA3AF" }} // Используем цвет текста страницы или дефолтный серый
    >
      <Link href="/" className="hover:opacity-60 transition-opacity">
        Главная
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="opacity-50">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:opacity-60 transition-opacity"
            >
              {item.label}
            </Link>
          ) : (
            <span
              style={{ color: textColor || "#111827" }}
              className="opacity-100"
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
