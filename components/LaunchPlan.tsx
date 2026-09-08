import React from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';

/** Блок 5 с доски: план запуска. Это реальная последовательность — нумерация уместна. */
const STEPS = [
  { title: 'Аудит', desc: 'Собираем текущие показатели: подписчики, охват, частота постинга, реакции, репосты, бусты и наличие бота.' },
  { title: 'Цель на 30 дней', desc: 'Фиксируем целевую базу и желаемый диапазон активности для публикаций на ближайший месяц.' },
  { title: 'Подбор пакета', desc: 'Выбираем 10K, 25K, 50K или индивидуальный Флагман 100K+ и формируем состав работ.' },
  { title: 'План активности', desc: 'Распределяем поддержку по контент-плану, рекламным выходам и реальной динамике канала.' },
  { title: 'Расширение', desc: 'При необходимости добавляем живой трафик, запуски бота, бусты или голосования отдельными блоками.' },
];

const LaunchPlan: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
  <div className="container-x">
    <div ref={ref} className="card p-6 sm:p-10 md:p-14">
      <h2 className="text-3xl sm:text-4xl md:text-5xl" style={revealStyle(inView, 0, { y: 16 })}>План запуска</h2>
      <ol className="mt-8 md:mt-10 rounded-inner md:rounded-card bg-brand-purple p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        {STEPS.map((s, i) => {
          const acid = i % 2 === 1;
          return (
            <li key={s.title} className={`rounded-inner px-5 py-5 sm:px-7 sm:py-6 flex gap-5 sm:gap-8 items-start ${acid ? 'bg-brand-acid text-brand-ink' : 'bg-white text-brand-ink'}`} style={revealStyle(inView, i + 1, { y: 14, step: 80 })}>
              <span className={`text-2xl sm:text-3xl font-semibold tabular-nums leading-none pt-0.5 ${acid ? 'text-brand-ink' : 'text-brand-purple'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">{s.title}</h3>
                <p className={`mt-1.5 text-sm sm:text-[15px] leading-relaxed ${acid ? 'text-brand-ink/70' : 'text-brand-ink/60'}`}>{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </div>
  );
};

export default LaunchPlan;
