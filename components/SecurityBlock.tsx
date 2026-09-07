import React from 'react';
import { IconBot, IconGhost, IconClock } from './Icons';

/** Блок 6 с доски: «Нас выбирают профессионалы». */
const ITEMS = [
  { icon: <IconGhost />, title: 'Анонимно', desc: 'Мы не раскрываем наших клиентов. Ни логотипов, ни кейсов с названиями, ни истории связей «клиент — канал».' },
  { icon: <IconBot />, title: 'Автономно', desc: 'Алгоритм сам поддерживает все показатели по заданному контуру. Куратор вмешивается только по вашему запросу.' },
  { icon: <IconClock />, title: 'Стабильно', desc: <>Инфраструктура работает <mark className="bg-brand-acid text-brand-ink rounded px-1">99,9% времени</mark>. Своя ферма, свои прокси, никаких чужих панелей.</> },
];

const SecurityBlock: React.FC = () => (
  <div className="container-x">
    <div className="bg-brand-ink text-white rounded-card p-6 sm:p-10 md:p-14 relative overflow-hidden">
      <div className="absolute -top-32 -right-24 w-[420px] h-[420px] bg-brand-purple/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl max-w-3xl leading-[1.05]">Нас выбирают профессионалы, которые не готовы рисковать репутацией</h2>
        <p className="mt-5 text-white/55 text-lg max-w-2xl">Никаких красных меток в TGStat и Telemetr. Наш метод — моделирование поведения, а не грубый трафик.</p>
        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 md:gap-6">
          {ITEMS.map(it => (
            <div key={it.title} className="border-t border-white/12 pt-6">
              <span className="inline-flex w-12 h-12 rounded-full items-center justify-center bg-white/10 text-brand-acid">{it.icon}</span>
              <h3 className="text-2xl mt-5 mb-3">{it.title}</h3>
              <p className="text-white/60 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SecurityBlock;
