import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования и Отказ от ответственности | Colorstrology",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: "Условия использования" }]} />
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-indigo max-w-none">
          <h1 className="text-3xl font-black font-serif mb-6">
            Пользовательское соглашение
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Редакция от мая 2026 года
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            1. Развлекательный характер проекта
          </h2>
          <p>
            Сайт <strong>Colorstrology.ru</strong> является исключительно
            информационно-развлекательным ресурсом. Все материалы, публикуемые
            на сайте, включая, но не ограничиваясь: цветовые гороскопы,
            таро-прогнозы, нумерологические расчеты и расчеты фаз луны, созданы
            исключительно в целях развлечения и самопознания.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            2. Отказ от ответственности (Disclaimer)
          </h2>
          <p>
            Информация, представленная на сайте,{" "}
            <strong>
              не является научным фактом, медицинским диагнозом, психологической
              помощью или финансовой рекомендацией
            </strong>
            .
          </p>
          <p>
            Администрация сайта не несет ответственности за любые решения,
            принятые пользователем на основе прочтения гороскопов или
            прохождения психологических тестов (таких как тест Люшера). При
            возникновении серьезных психологических проблем или вопросов,
            касающихся здоровья и финансов, мы настоятельно рекомендуем
            обращаться к дипломированным специалистам.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            3. Использование материалов
          </h2>
          <p>
            Копирование материалов сайта разрешено только при условии указания
            активной индексируемой ссылки на источник (colorstrology.ru).
            Автоматическая генерация изображений и их использование в социальных
            сетях разрешено в рамках личного использования.
          </p>
        </article>
      </div>
    </main>
  );
}
