import React, { useMemo, useRef, useState } from 'react';
import { useInView } from '../lib/useInView';
import { IconCheck, IconEyeOff, IconShield } from './Icons';
import { TG_LINK } from '../lib/constants';

/* ---------- данные: 72 часа затухания, детерминированные ---------- */
function seeded(seed: number) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
const BUCKET = 2; // часов в одной ступени
const STEPS_N = 72 / BUCKET;
function useDecay() {
  return useMemo(() => {
    const rnd = seeded(20241225);
    const out: number[] = [];
    for (let i = 0; i < STEPS_N; i++) {
      const h = i * BUCKET + BUCKET / 2;
      const base = 420 + 4400 * Math.exp(-h / 13);
      const evening = Math.exp(-Math.pow(h - 20, 2) / 30) * 1100; // вечерний бугор первого дня
      const evening2 = Math.exp(-Math.pow(h - 44, 2) / 40) * 380;
      out.push(Math.round((base + evening + evening2) * (0.97 + rnd() * 0.06)));
    }
    return out;
  }, []);
}

const W = 1000, H = 380, PAD = { l: 18, r: 18, t: 28, b: 42 };

const StaircaseChart: React.FC<{ on: boolean }> = ({ on }) => {
  const data = useDecay();
  const max = Math.max(...data) * 1.06;
  const innerW = W - PAD.l - PAD.r, innerH = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (i / data.length) * innerW;
  const xEnd = PAD.l + innerW;
  const y = (v: number) => PAD.t + innerH - (Math.sqrt(v) / Math.sqrt(max)) * innerH;
  const slot = innerW / data.length;

  // лесенка: step-after
  const stepPath = useMemo(() => {
    let d = `M${x(0)} ${y(data[0])}`;
    for (let i = 1; i < data.length; i++) d += ` H${x(i)} V${y(data[i])}`;
    d += ` H${xEnd}`;
    return d;
  }, [data]);
  const areaPath = `${stepPath} V${PAD.t + innerH} H${x(0)} Z`;

  // плавная огибающая (Catmull-Rom → cubic)
  const smoothPath = useMemo(() => {
    const pts = data.map((v, i) => [x(i) + slot / 2, y(v)] as [number, number]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
      const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }, [data]);

  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const r = svgRef.current?.getBoundingClientRect(); if (!r) return;
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.floor(((px - PAD.l) / innerW) * data.length);
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  const ticks = [0, 12, 24, 36, 48, 60, 72];
  const hv = hover != null ? data[hover] : null;

  return (
    <svg
      ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none touch-pan-y"
      onPointerMove={onMove} onPointerLeave={() => setHover(null)}
      role="img" aria-label="Затухание просмотров поста за 72 часа по лесенке"
    >
      <defs>
        <linearGradient id="st-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E2FF66" stopOpacity=".32" />
          <stop offset="1" stopColor="#E2FF66" stopOpacity="0" />
        </linearGradient>
        <filter id="st-glow" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* сетка */}
      {[0.25, 0.5, 0.75].map(k => (
        <line key={k} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + innerH * k} y2={PAD.t + innerH * k} stroke="rgba(255,255,255,.07)" />
      ))}
      {/* потолок */}
      <line x1={PAD.l} x2={W - PAD.r} y1={y(data[0])} y2={y(data[0])} stroke="rgba(255,255,255,.35)" strokeDasharray="4 8" />
      <text x={W - PAD.r} y={y(data[0]) - 8} textAnchor="end" fontSize="13" fill="rgba(255,255,255,.6)" className="font-mono">пик</text>

      {/* столбики-тень */}
      {data.map((v, i) => (
        <rect key={i} x={x(i) + slot * 0.12} width={slot * 0.76} y={y(v)} height={PAD.t + innerH - y(v)} rx="1.5"
          fill="white" fillOpacity={hover === i ? 0.45 : 0.07}
          style={{ transformOrigin: `${x(i) + slot / 2}px ${PAD.t + innerH}px`, transform: on ? 'scaleY(1)' : 'scaleY(0)', transition: `transform .6s cubic-bezier(.2,.8,.2,1) ${i * 9}ms, fill-opacity .15s` }} />
      ))}

      {/* площадь под лесенкой */}
      <path d={areaPath} fill="url(#st-area)" style={{ opacity: on ? 1 : 0, transition: 'opacity 1.2s ease .5s' }} />

      {/* лесенка */}
      <path d={stepPath} fill="none" stroke="#E2FF66" strokeWidth="2.5" strokeLinejoin="round" filter="url(#st-glow)"
        pathLength={1} strokeDasharray={1} strokeDashoffset={on ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1) .2s' }} />

      {/* огибающая */}
      <path d={smoothPath} fill="none" stroke="white" strokeWidth="1.2" strokeOpacity=".7"
        pathLength={1} strokeDasharray={1} strokeDashoffset={on ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(.4,0,.2,1) .6s' }} />

      {/* ось X */}
      {ticks.map(t => (
        <text key={t} x={PAD.l + (t / 72) * innerW} y={H - 12} textAnchor={t === 0 ? 'start' : t === 72 ? 'end' : 'middle'} fontSize="13" fill="rgba(255,255,255,.5)" className="font-mono">{t} ч</text>
      ))}

      {/* курсор */}
      {hover != null && hv != null && (
        <g>
          <line x1={x(hover) + slot / 2} x2={x(hover) + slot / 2} y1={PAD.t} y2={PAD.t + innerH} stroke="rgba(255,255,255,.35)" />
          <circle cx={x(hover) + slot / 2} cy={y(hv)} r="6" fill="#E2FF66" stroke="#4C1191" strokeWidth="3" />
          {(() => {
            const cx = x(hover) + slot / 2; const tw = 170, th = 54, left = cx + tw + 16 > W ? cx - tw - 12 : cx + 12;
            const top = Math.max(PAD.t, Math.min(y(hv) - th / 2, PAD.t + innerH - th));
            return (
              <g transform={`translate(${left} ${top})`}>
                <rect width={tw} height={th} rx="12" fill="white" />
                <text x="14" y="21" fontSize="12" fill="#7E22CE" className="font-mono">{hover * BUCKET}–{hover * BUCKET + BUCKET} ч</text>
                <text x="14" y="42" fontSize="17" fontWeight="600" fill="#141118">{hv.toLocaleString('ru-RU')} просмотров</text>
              </g>
            );
          })()}
        </g>
      )}
    </svg>
  );
};

/* ---------- блок ---------- */
const PILLARS = [
  { icon: <IconShield />, title: 'Безопасность', desc: 'Стабильная работа с автопросмотрами и учётом часовых пиков вашей аудитории.' },
  { icon: <IconEyeOff />, title: 'Невидимость', desc: 'Аккуратные лесенки не вызывают подозрений ни у TGStat, ни у Telemetr.' },
  { icon: <IconCheck />, title: 'Доверие', desc: 'Только качественные RU-боты с отложкой, без аномалий в поведении.' },
];

const StaircaseTech: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div className="container-x space-y-4 md:space-y-6">
      <div ref={ref} className="rounded-card overflow-hidden bg-[linear-gradient(160deg,#4C1191_0%,#7E22CE_60%,#8B4DFF_100%)] shadow-purple text-white p-6 sm:p-10 md:p-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl">Технология «Лесенки»</h2>
            <p className="text-white/65 mt-3 text-lg">Как расходится активность одного поста за 72 часа</p>
          </div>
          <p className="text-white/45 text-sm hidden md:block">Наведи на график</p>
        </div>

        <StaircaseChart on={inView} />

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-white/70 max-w-xl leading-relaxed">
            Просмотры и реакции приходят по математической кривой затухания: сильный старт, вечерний бугор, длинный хвост. Так выглядит пост, который действительно читали.
          </p>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-acid shrink-0">Активировать ЧИТКОД</a>
        </div>
      </div>

      <div className="card p-6 sm:p-10 md:p-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl max-w-3xl leading-[1.05]">С хирургической точностью воспроизводим поведение пользователей</h2>
        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 md:gap-6">
          {PILLARS.map(p => (
            <div key={p.title}>
              <span className="inline-flex w-12 h-12 rounded-full items-center justify-center bg-brand-ink text-brand-acid">{p.icon}</span>
              <h3 className="text-2xl mt-5 mb-3">{p.title}</h3>
              <p className="text-brand-ink/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaircaseTech;
