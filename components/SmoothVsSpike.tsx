import React from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';
import { TG_LINK } from '../lib/constants';

/** Плавная лесенка против резкого всплеска — блок 1 с доски. */

const SMOOTH = [100, 88, 78, 70, 63, 57, 52, 48, 44, 41, 38, 36, 34, 32, 30, 29, 28, 27];
const SPIKE  = [98, 14, 9, 7, 6, 5, 4, 92, 8, 6, 5, 4, 4, 95, 6, 5, 4, 3];

const W = 400, H = 214, PAD = { l: 4, r: 4, t: 16, b: 26 };
const THRESHOLD = 60;

const Chart: React.FC<{ data: number[]; tone: 'moss' | 'rose'; on: boolean }> = ({ data, tone, on }) => {
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const slot = innerW / data.length;
  const bw = slot * 0.62;
  const base = PAD.t + innerH;
  const y = (v: number) => PAD.t + (1 - v / 100) * innerH;
  const cx = (i: number) => PAD.l + i * slot + slot / 2;

  const uid = tone;

  // огибающая по вершинам (Catmull-Rom → cubic), только для ровной лесенки
  const envelope = React.useMemo(() => {
    const pts = data.map((v, i) => [cx(i), y(v)] as [number, number]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
      d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }, [data]);

  const ticks = [0, 24, 48, 72];
  const last = data.length - 1;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block overflow-visible" role="img"
      aria-label={tone === 'moss' ? 'Плавное затухание активности за 72 часа' : 'Резкие всплески активности'}>
      <defs>
        <linearGradient id={`bar-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id={`dim-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".42" />
          <stop offset="1" stopColor="#fff" stopOpacity=".16" />
        </linearGradient>
        <filter id={`glow-${uid}`} x="-12%" y="-45%" width="124%" height="190%">
          <feGaussianBlur stdDeviation="3.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* сетка */}
      {[0.25, 0.5, 0.75].map(k => (
        <line key={k} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + innerH * k} y2={PAD.t + innerH * k}
          stroke="#fff" strokeOpacity=".1"
          style={{ opacity: on ? 1 : 0, transition: `opacity .5s ease ${200 + k * 300}ms` }} />
      ))}

      {/* столбики */}
      {data.map((v, i) => {
        const hot = tone === 'rose' && v > THRESHOLD;
        return (
          <rect key={i} x={cx(i) - bw / 2} width={bw} y={y(v)} height={base - y(v)} rx={bw / 2.6}
            fill={tone === 'moss' || hot ? `url(#bar-${uid})` : `url(#dim-${uid})`}
            style={{
              transformOrigin: `${cx(i)}px ${base}px`,
              transform: on ? 'scaleY(1)' : 'scaleY(0.02)',
              transition: `transform .75s cubic-bezier(.2,.85,.25,1) ${(tone === 'moss' ? i * 38 : hot ? 260 + i * 12 : i * 24)}ms`,
            }} />
        );
      })}

      {/* база */}
      <line x1={PAD.l} x2={W - PAD.r} y1={base} y2={base} stroke="#fff" strokeOpacity=".28"
        pathLength={1} strokeDasharray={1} strokeDashoffset={on ? 0 : 1}
        style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.4,0,.2,1)' }} />

      {tone === 'moss' && (
        <>
          <path d={envelope} fill="none" stroke="#E2FF66" strokeWidth="2.6" strokeLinecap="round" filter={`url(#glow-${uid})`}
            pathLength={1} strokeDasharray={1} strokeDashoffset={on ? 0 : 1}
            style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) .35s' }} />
          <circle cx={cx(last)} cy={y(data[last])} r="4.5" fill="#E2FF66"
            style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'scale(.2)', transformOrigin: `${cx(last)}px ${y(data[last])}px`, transition: 'opacity .3s ease 1.8s, transform .45s cubic-bezier(.2,.8,.2,1) 1.8s' }} />
          <g style={{ opacity: on ? 1 : 0, transition: 'opacity .45s ease 2s' }}>
            <text x={cx(last) + 2} y={y(data[last]) - 13} textAnchor="end" fontSize="11" fill="#E2FF66" className="font-mono">−73% за 72 ч</text>
          </g>
        </>
      )}

      {tone === 'rose' && (
        <>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(THRESHOLD)} y2={y(THRESHOLD)} stroke="#fff" strokeOpacity=".75" strokeDasharray="5 6"
            pathLength={1} style={{ opacity: on ? 1 : 0, transition: 'opacity .5s ease 1.1s' }} />
          <g transform={`translate(${W / 2} ${y(THRESHOLD)})`}
            style={{ opacity: on ? 1 : 0, transform: on ? `translate(${W / 2}px, ${y(THRESHOLD)}px)` : `translate(${W / 2}px, ${y(THRESHOLD) + 8}px)`, transition: 'opacity .4s ease 1.35s, transform .5s cubic-bezier(.2,.8,.2,1) 1.35s' }}>
            <rect x="-56" y="-24" width="112" height="20" rx="10" fill="#fff" />
            <text x="0" y="-10" textAnchor="middle" fontSize="10.5" fill="#E03A3A" fontWeight="600">порог аномалии</text>
          </g>
          {data.map((v, i) => v > THRESHOLD && (
            <circle key={i} cx={cx(i)} cy={y(v) - 9} r="3" fill="#fff"
              style={{ opacity: on ? 1 : 0, transition: `opacity .4s ease ${1500 + i * 90}ms`, animation: on ? `pulse-dot 1.8s ease-in-out ${1.6 + i * 0.12}s infinite` : 'none' }} />
          ))}
        </>
      )}

      {/* ось часов */}
      {ticks.map(t => (
        <text key={t} x={PAD.l + (t / 72) * innerW} y={H - 7}
          textAnchor={t === 0 ? 'start' : t === 72 ? 'end' : 'middle'}
          fontSize="11" fill="#fff" fillOpacity=".55" className="font-mono"
          style={{ opacity: on ? 1 : 0, transition: `opacity .5s ease ${700 + t * 6}ms` }}>{t} ч</text>
      ))}
    </svg>
  );
};

const Card: React.FC<{ tone: 'moss' | 'rose'; label: string; tag: string; caption: string; data: number[]; on: boolean; i: number }> =
  ({ tone, label, tag, caption, data, on, i }) => (
    <figure
      className={`rounded-inner text-white flex flex-col p-6 sm:p-7 md:p-8 min-h-[400px] ${tone === 'moss' ? 'bg-brand-moss' : 'bg-brand-rose'}`}
      style={revealStyle(on, i, { y: 22, step: 130 })}
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="text-xl sm:text-2xl font-semibold">{label}</div>
        <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${tone === 'moss' ? 'bg-brand-acid text-brand-ink' : 'bg-white/15 text-white'}`}>{tag}</span>
      </div>
      <div className="flex-1 flex items-end"><Chart data={data} tone={tone} on={on} /></div>
      <figcaption className="mt-6 text-sm sm:text-[15px] leading-snug text-white/85">{caption}</figcaption>
    </figure>
  );

const SmoothVsSpike: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div className="container-x">
      <div ref={ref} className="card p-6 sm:p-10 md:p-14">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8 md:mb-10">
          <h2 className="lg:col-span-7 text-3xl sm:text-4xl md:text-5xl leading-[1.05]" style={revealStyle(inView, 0, { y: 16 })}>
            Увеличивайте показатели активности канала без аномальных всплесков
          </h2>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-start gap-5" style={revealStyle(inView, 1, { y: 16 })}>
            <p className="text-brand-ink/60 text-lg leading-relaxed">
              Аналитика ищет не цифры, а паттерн. Ровное затухание за 72 часа выглядит как живой интерес. Скачки — как залив.
            </p>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-purple shrink-0">Написать куратору</a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <Card tone="moss" label="Лесенка ЧИТКОД" tag="так делаем мы" data={SMOOTH} on={inView} i={2}
            caption="Аккуратное распределение просмотров и реакций в течение 72 часов. Каждая ступень чуть ниже предыдущей." />
          <Card tone="rose" label="Обычный залив" tag="так делают другие" data={SPIKE} on={inView} i={3}
            caption="Резкий всплеск и падение активности. Всё, что выше порога, аналитика помечает как аномалию, а рекламодатель — как накрутку." />
        </div>
      </div>
    </div>
  );
};

export default SmoothVsSpike;
