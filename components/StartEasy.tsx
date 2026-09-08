import React from 'react';
import { useInView } from '../lib/useInView';
import { IconArrow, IconTelegram } from './Icons';
import { TG_LINK, UserRole } from '../lib/constants';

interface Props { role: UserRole; setRole: (r: UserRole) => void; }

type Step = { title: string; desc: string; cta: string };

const CONTENT: Record<UserRole, { lead: string; steps: Step[]; note: string }> = {
  owner: {
    lead: 'Три шага, всё общение — в Telegram. Ни форм, ни звонков, ни личного кабинета.',
    steps: [
      {
        title: 'Присылаете ссылку на канал',
        desc: 'Смотрим, сколько у вас подписчиков и просмотров сейчас. Говорим прямо, что реально вырастить, а что нет.',
        cta: 'Показать канал',
      },
      {
        title: 'Выбираете объём и цену',
        desc: 'Предлагаем несколько вариантов: сколько подписчиков и просмотров добавим за месяц и сколько это будет стоить.',
        cta: 'Узнать цену',
      },
      {
        title: 'Мы работаем, вы публикуете',
        desc: 'Дальше от вас ничего не нужно. Показатели растут понемногу каждый день, без скачков, которые выдают накрутку.',
        cta: 'Начать сейчас',
      },
    ],
    note: 'Первый ответ обычно в течение часа. Предоплата не нужна, пока не согласуем объём.',
  },
  agency: {
    lead: 'Три шага для агентств. Работаем оптом и не светимся перед вашими клиентами.',
    steps: [
      {
        title: 'Один чат на все проекты',
        desc: 'Даём отдельный чат, куда вы скидываете задачи сразу по всем каналам клиентов. Не нужно писать по каждому отдельно.',
        cta: 'Получить доступ',
      },
      {
        title: 'Цена зависит от объёма',
        desc: 'Чем больше каналов ведёте, тем ниже цена за каждый. Считаем под ваш портфель, а не по общему прайсу.',
        cta: 'Обсудить условия',
      },
      {
        title: 'Клиент видит только вас',
        desc: 'Мы нигде не упоминаем, что работали с каналом. Отчёты и результат клиент получает от вашего агентства.',
        cta: 'Стать партнёром',
      },
    ],
    note: 'Подписываем NDA. Не публикуем логотипы и не храним историю заказов.',
  },
};

const StartEasy: React.FC<Props> = ({ role, setRole }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { lead, steps, note } = CONTENT[role];

  return (
    <div className="container-x">
      <div ref={ref} className="bg-brand-acid rounded-card p-6 sm:p-10 md:p-14 shadow-acid relative overflow-hidden">
        {/* шапка */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-9 md:mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl text-brand-ink">Как начать</h2>
            <p className="mt-3 text-brand-ink/65 text-lg leading-relaxed">{lead}</p>
          </div>

          <div className="bg-brand-ink/[.07] p-1 rounded-full inline-flex self-start shrink-0" role="tablist" aria-label="Кто вы">
            {([['owner', 'У меня свой канал'], ['agency', 'Я агентство']] as [UserRole, string][]).map(([r, label]) => (
              <button
                key={r}
                role="tab"
                aria-selected={role === r}
                onClick={() => setRole(r)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  role === r ? 'bg-brand-ink text-brand-acid shadow-md' : 'text-brand-ink/55 hover:text-brand-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* шаги */}
        <ol className="relative grid md:grid-cols-3 gap-4 md:gap-5">
          {steps.map((s, i) => (
            <li
              key={role + i}
              className="relative"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(14px)',
                transition: `opacity .5s ease ${i * 120}ms, transform .5s cubic-bezier(.2,.8,.2,1) ${i * 120}ms`,
              }}
            >
              <a
                href={TG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-inner p-6 md:p-7 flex flex-col justify-between h-full min-h-[260px] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(20,17,24,.28)]"
              >
                <div>
                  <span className="inline-flex w-10 h-10 md:w-11 md:h-11 rounded-full bg-brand-ink text-brand-acid items-center justify-center text-base md:text-lg font-semibold tabular-nums mb-5">
                    {i + 1}
                  </span>
                  <h3 className="text-xl md:text-[26px] leading-tight mb-3">{s.title}</h3>
                  <p className="text-[15px] text-brand-ink/60 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-7 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-brand-ink/55 group-hover:text-brand-purple transition-colors">{s.cta}</span>
                  <span className="arrow-dot bg-brand-ink text-white group-hover:bg-brand-purple"><IconArrow size={18} /></span>
                </div>
              </a>
            </li>
          ))}
        </ol>

        {/* сноска */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-ink w-full sm:w-auto">
            <IconTelegram size={18} />
            Написать в Telegram
          </a>
          <p className="text-sm text-brand-ink/55 leading-relaxed">{note}</p>
        </div>
      </div>
    </div>
  );
};

export default StartEasy;
