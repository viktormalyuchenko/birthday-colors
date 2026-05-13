import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О проекте Colorstrology | Астрология и Психология цвета",
  description:
    "Узнайте больше о проекте Colorstrology. Как мы объединили японский календарь Tanjoshoku, нумерологию и фазы луны в одном агрегаторе.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F8] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: "О проекте" }]} />
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-indigo max-w-none text-gray-700">
          <h1 className="text-4xl font-black font-serif text-gray-900 mb-6">
            О проекте Colorstrology
          </h1>

          <p>
            Добро пожаловать на <strong>Colorstrology.ru</strong> — ваш главный
            путеводитель в мире цветовой психологии, астрологии и нумерологии.
          </p>

          <h2 className="text-2xl font-bold font-serif text-gray-900 mt-8 mb-4">
            Наша миссия
          </h2>
          <p>
            Мы верим, что цвет — это не просто оптическая иллюзия, а мощная
            вибрация, способная влиять на наше настроение, поступки и судьбу.
            Наша цель — собрать в одном месте самые точные и интересные системы
            самопознания через цвет.
          </p>

          <p>На портале представлены:</p>
          <ul>
            <li>
              <strong>Японский календарь (Tanjoshoku):</strong> Традиционная
              система из 366 цветов, отражающая связь человека с природой.
            </li>
            <li>
              <strong>Pantone Colorstrology:</strong> Западный подход,
              объединяющий астрологию и стандарты института цвета Pantone.
            </li>
            <li>
              <strong>Цветовая нумерология:</strong> Пифагорейская система
              расчета ауры и числа жизненного пути.
            </li>
            <li>
              <strong>Астрология эмоций:</strong> Расчеты по фазам и знакам
              Луны.
            </li>
          </ul>

          <h2 className="text-2xl font-bold font-serif text-gray-900 mt-8 mb-4">
            Контакты
          </h2>
          <p>
            Мы постоянно развиваем наш проект и открыты к предложениям. Если вы
            заметили ошибку, хотите предложить новую систему для интеграции или
            у вас есть вопросы по сотрудничеству, пишите нам:
          </p>
          <p className="font-bold text-indigo-600 text-xl">hello@viktoor.ru</p>
        </article>
      </div>
    </main>
  );
}
