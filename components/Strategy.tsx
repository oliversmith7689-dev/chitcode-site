import React from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';
import { IconBubble, IconScale, IconTrend, IconInfinity } from './Icons';

/** Блок 4 с доски: стратегия развития. Цифры — базовые ориентиры, меняются под канал. */
const METRICS = [
  { icon: <IconScale />, title: 'Баланс закупки ботов и трафика', value: '70 / 30', note: 'бионические боты к живому трафику' },
  { icon: <IconTrend />, title: 'Постепенный рост показателей', value: '+3–5%', note: 'к базе в день, адаптивная скорость' },
  { icon: <IconInfinity />, title: 'Баланс оттока и подписок', value: '1 : 12', note: 'отписок к подпискам в цикле' },
];

const Strategy: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
  <div className="container-x">
    <div ref={ref} className="card p-6 sm:p-10 md:p-14">
      <h2 className="text-3xl sm:text-4xl md:text-5xl max-w-3xl leading-[1.05]" style={revealStyle(inView, 0, { y: 16 })}>Подготовим оптимальную стратегию развития вашего канала</h2>
      <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-4 md:gap-6">
        {METRICS.map((m, i) => (
          <div key={m.title} className="rounded-inner bg-brand-paper p-6 md:p-7 flex flex-col" style={revealStyle(inView, i + 1)}>
            <IconBubble>{m.icon}</IconBubble>
            <h3 className="text-xl mt-5 leading-tight">{m.title}</h3>
            <div className="mt-auto pt-6 text-4xl md:text-5xl font-semibold tabular-nums tracking-tight text-brand-purple">{m.value}</div>
            <p className="mt-2 text-sm text-brand-ink/55">{m.note}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Strategy;
