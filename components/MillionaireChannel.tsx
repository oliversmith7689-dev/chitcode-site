import React from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';
import { TG_LINK } from '../lib/constants';

const POINTS = [
  { title: 'Твёрдый актив', desc: 'Не цифры, а готовый бизнес с чистой историей в TGStat и Telemetr.' },
  { title: 'Алгоритмическая органика', desc: 'Подписчики и охваты приходят по кривой естественного роста. Без меток.' },
  { title: 'Монетизация под ключ', desc: 'К концу разгона канал готов продавать рекламу от 50 до 100 тысяч рублей за пост.' },
  { title: 'Полный stealth-режим', desc: 'Строгий NDA. О том, как был собран ваш миллионник, знает только менеджер.' },
];

const MillionaireChannel: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
  <div className="container-x">
    <div ref={ref} className="bg-brand-ink rounded-card p-6 sm:p-10 md:p-16 relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-acid/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="relative grid lg:grid-cols-5 gap-10 md:gap-16 items-start">
        <div className="lg:col-span-3" style={revealStyle(inView, 0, { y: 20 })}>
          <div className="inline-flex items-center rounded-full border border-brand-acid/40 text-brand-acid text-sm px-4 py-1.5 mb-8">Флагман 100K+</div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
            Канал-миллионник<br />
            <span className="text-brand-acid price-glitch">за 1 000 000 ₽</span>
          </h2>
          <p className="mt-7 text-white/60 text-lg leading-relaxed max-w-xl">
            Собираем медиа-актив под ключ: стратегия, нейминг, инфраструктура и залив первой сотни тысяч аудитории по лесенке.
          </p>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-acid mt-10 w-full sm:w-auto">Забронировать стратегию</a>
        </div>
        <div className="lg:col-span-2 space-y-7 lg:pt-6">
          {POINTS.map((p, i) => (
            <div key={p.title} className="flex gap-5" style={revealStyle(inView, i + 1, { step: 100 })}>
              <div className="text-brand-acid/50 font-mono text-sm pt-1 tabular-nums">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-1 text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default MillionaireChannel;
