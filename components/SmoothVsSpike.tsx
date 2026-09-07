import React from 'react';
import { useInView } from '../lib/useInView';
import { TG_LINK } from '../lib/constants';

/** Плавная лесенка против резкого всплеска — блок 1 с доски. */

const SMOOTH = [100, 88, 78, 70, 63, 57, 52, 48, 44, 41, 38, 36, 34, 32, 30, 29, 28, 27];
const SPIKE  = [98, 14, 9, 7, 6, 5, 4, 92, 8, 6, 5, 4, 4, 95, 6, 5, 4, 3];

const Bars: React.FC<{ data: number[]; tone: 'moss' | 'rose'; on: boolean }> = ({ data, tone, on }) => {
  const W = 360, H = 190, gap = 5, top = 14;
  const bw = (W - gap * (data.length - 1)) / data.length;
  const y = (v: number) => top + (1 - v / 100) * (H - top);
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * (bw + gap) + bw / 2} ${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img"
      aria-label={tone === 'moss' ? 'Плавное затухание активности' : 'Резкие всплески активности'}>
      {/* порог подозрения */}
      {tone === 'rose' && (
        <>
          <line x1="0" x2={W} y1={y(60)} y2={y(60)} stroke="white" strokeOpacity=".6" strokeDasharray="5 6" />
          <g transform={`translate(210 ${y(60)})`}>
            <rect x="-52" y="-23" width="104" height="19" rx="9.5" fill="white" />
            <text x="0" y="-9.5" textAnchor="middle" fontSize="10" fill="#E03A3A" fontWeight="600">порог аномалии</text>
          </g>
        </>
      )}
      {data.map((v, i) => (
        <rect key={i} x={i * (bw + gap)} y={y(v)} width={bw} height={H - y(v)} rx={4}
          fill="white" fillOpacity={tone === 'moss' ? 0.92 : (v > 60 ? 1 : 0.55)}
          style={{
            transformOrigin: `${i * (bw + gap) + bw / 2}px ${H}px`,
            transform: on ? 'scaleY(1)' : 'scaleY(0.04)',
            transition: `transform .7s cubic-bezier(.2,.8,.2,1) ${i * 35}ms`,
          }} />
      ))}
      {tone === 'moss' && (
        <path d={line} fill="none" stroke="#E2FF66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={on ? 0 : 1}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) .4s' }} />
      )}
    </svg>
  );
};

const Card: React.FC<{ tone: 'moss' | 'rose'; label: string; tag: string; caption: string; data: number[]; on: boolean }> =
  ({ tone, label, tag, caption, data, on }) => (
    <figure className={`rounded-inner text-white flex flex-col p-6 sm:p-7 md:p-8 min-h-[380px] ${tone === 'moss' ? 'bg-brand-moss' : 'bg-brand-rose'}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="text-xl sm:text-2xl font-semibold">{label}</div>
        <span className={`text-xs px-3 py-1 rounded-full ${tone === 'moss' ? 'bg-brand-acid text-brand-ink' : 'bg-white/15 text-white'}`}>{tag}</span>
      </div>
      <div className="flex-1 flex items-end"><Bars data={data} tone={tone} on={on} /></div>
      <figcaption className="mt-6 text-sm sm:text-[15px] leading-snug text-white/85">{caption}</figcaption>
    </figure>
  );

const SmoothVsSpike: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div className="container-x">
      <div ref={ref} className="card p-6 sm:p-10 md:p-14">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8 md:mb-10">
          <h2 className="lg:col-span-7 text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
            Увеличивайте показатели активности канала без аномальных всплесков
          </h2>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-start gap-5">
            <p className="text-brand-ink/60 text-lg leading-relaxed">
              Аналитика ищет не цифры, а паттерн. Ровное затухание за 72 часа выглядит как живой интерес. Скачки — как залив.
            </p>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-purple shrink-0">Написать куратору</a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <Card tone="moss" label="Лесенка ЧИТКОД" tag="так делаем мы" data={SMOOTH} on={inView}
            caption="Аккуратное распределение просмотров и реакций в течение 72 часов. Каждая ступень чуть ниже предыдущей." />
          <Card tone="rose" label="Обычный залив" tag="так делают другие" data={SPIKE} on={inView}
            caption="Резкий всплеск и падение активности. Всё, что выше порога, аналитика помечает как аномалию, а рекламодатель — как накрутку." />
        </div>
      </div>
    </div>
  );
};

export default SmoothVsSpike;
