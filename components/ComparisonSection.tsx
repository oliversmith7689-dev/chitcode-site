import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from '../lib/useInView';
import { UserRole } from '../lib/constants';
import { IconArrow } from './Icons';

/* ---------- счётчик ---------- */
const Counter: React.FC<{ value: number; on: boolean; delay?: number; duration?: number }> = ({ value, on, delay = 0, duration = 1500 }) => {
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!on || started.current) return;
    started.current = true;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setV(Math.round(ease(p) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(id);
  }, [on, value, delay, duration]);
  return <>{v.toLocaleString('ru-RU')}</>;
};

/* ---------- спарклайн ---------- */
const Spark: React.FC<{ points: number[]; dark?: boolean; on: boolean; delay?: number }> = ({ points, dark, on, delay = 0 }) => {
  const W = 120, H = 38, pad = 5;
  const max = Math.max(...points), min = Math.min(...points);
  const x = (i: number) => (i / (points.length - 1)) * W;
  const y = (v: number) => pad + (1 - (v - min) / (max - min || 1)) * (H - pad * 2);
  const { line, area } = useMemo(() => {
    const pts = points.map((v, i) => [x(i), y(v)] as [number, number]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
      d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
    }
    return { line: d, area: `${d} V${H} H0 Z` };
  }, [points]);
  const id = `sp-${dark ? 'd' : 'l'}-${points[0]}-${points.length}`;
  const stroke = dark ? '#E2FF66' : 'rgba(20,17,24,.3)';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-[104px] sm:w-[124px] h-[38px] shrink-0 overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dark ? '#E2FF66' : '#141118'} stopOpacity={dark ? '.35' : '.14'} />
          <stop offset="1" stopColor={dark ? '#E2FF66' : '#141118'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} style={{ opacity: on ? 1 : 0, transition: `opacity .8s ease ${delay + 400}ms` }} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={on ? 0 : 1}
        style={{ transition: `stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1) ${delay}ms` }} />
      <circle cx={W} cy={y(points[points.length - 1])} r="3.2"
        fill={dark ? '#E2FF66' : 'rgba(20,17,24,.35)'}
        style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'scale(.2)', transformOrigin: `${W}px ${y(points[points.length - 1])}px`, transition: `opacity .3s ease ${delay + 900}ms, transform .4s cubic-bezier(.2,.8,.2,1) ${delay + 900}ms` }} />
    </svg>
  );
};

/* ---------- строка метрики ---------- */
type Metric = { label: string; value: number; delta: string; spark: number[] };

const Row: React.FC<{ m: Metric; dark?: boolean; on: boolean; i: number }> = ({ m, dark, on, i }) => (
  <div
    className="flex items-center gap-4 sm:gap-6 py-4 border-t first:border-t-0"
    style={{
      borderColor: dark ? 'rgba(255,255,255,.12)' : 'rgba(20,17,24,.07)',
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(10px)',
      transition: `opacity .5s ease ${i * 110}ms, transform .5s cubic-bezier(.2,.8,.2,1) ${i * 110}ms`,
    }}
  >
    <div className="min-w-0 flex-1">
      <div className={`text-sm mb-1 ${dark ? 'text-white/55' : 'text-brand-ink/45'}`}>{m.label}</div>
      <div className={`text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight ${dark ? 'text-white' : 'text-brand-ink'}`}>
        <Counter value={m.value} on={on} delay={i * 110} />
      </div>
    </div>
    <span className={`text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full shrink-0 tabular-nums ${dark ? 'bg-brand-acid text-brand-ink' : 'bg-brand-ink/[.06] text-brand-ink/50'}`}>
      {m.delta}
    </span>
    <Spark points={m.spark} dark={dark} on={on} delay={i * 110 + 200} />
  </div>
);

/* ---------- данные ---------- */
const PLAIN: Metric[] = [
  { label: 'Подписчики', value: 3850, delta: '+4%', spark: [30, 31, 30, 32, 33, 32, 34, 34, 35, 35, 36, 36] },
  { label: 'Просмотры', value: 1150, delta: '+2%', spark: [22, 24, 21, 23, 22, 24, 23, 24, 23, 25, 24, 25] },
  { label: 'Реакции', value: 12, delta: '0%', spark: [8, 9, 8, 8, 9, 8, 9, 9, 8, 9, 9, 9] },
];
const CHEAT: Metric[] = [
  { label: 'Подписчики', value: 12400, delta: '×3,2', spark: [30, 38, 47, 58, 68, 79, 88, 96, 103, 108, 112, 115] },
  { label: 'Просмотры', value: 4600, delta: '×4,0', spark: [22, 30, 41, 52, 63, 74, 84, 92, 99, 105, 109, 112] },
  { label: 'Реакции', value: 94, delta: '×7,8', spark: [8, 14, 22, 31, 42, 53, 63, 72, 80, 86, 91, 94] },
];

const ComparisonSection: React.FC<{ role: UserRole }> = ({ role }) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="container-x">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl">
            {role === 'agency' ? 'Результат для клиента за 24 часа' : 'Результат за 24 часа'}
          </h2>
          <p className="mt-3 text-brand-ink/55 text-lg max-w-lg">
            Один и тот же канал, одни и те же посты. Разница — в том, кто ведёт активность.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-ink/45 shrink-0">
          <span className="w-2 h-2 rounded-full bg-brand-ink/25" />
          без нас
          <IconArrow size={16} className="mx-1 text-brand-ink/30" />
          <span className="w-2 h-2 rounded-full bg-brand-purple" />
          с чит-кодом
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 md:gap-5">
        {/* Обычный путь */}
        <div className="card p-6 sm:p-9 md:p-10 flex flex-col transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="text-xl sm:text-2xl font-semibold text-brand-ink/70">Обычный путь</div>
            <span className="text-xs px-3 py-1 rounded-full bg-brand-ink/[.06] text-brand-ink/50">органика как есть</span>
          </div>
          <div className="flex-1">
            {PLAIN.map((m, i) => <Row key={m.label} m={m} on={inView} i={i} />)}
          </div>
          <div className="mt-8 pt-6 border-t border-brand-ink/[.07] flex items-baseline justify-between">
            <span className="text-sm text-brand-ink/45">Удержание аудитории</span>
            <span className="text-2xl font-semibold tabular-nums text-brand-ink/40">41%</span>
          </div>
        </div>

        {/* С чит-кодом */}
        <div className="relative rounded-card shadow-purple p-6 sm:p-9 md:p-10 flex flex-col overflow-hidden text-white bg-[linear-gradient(155deg,#4C1191_0%,#7E22CE_55%,#8B4DFF_100%)] transition-transform duration-300 hover:-translate-y-1">
          <div className="absolute -top-28 -right-20 w-80 h-80 bg-brand-acid/25 blur-[110px] rounded-full pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-acid/60 to-transparent" />

          <div className="relative flex items-center justify-between gap-4 mb-6">
            <div className="text-xl sm:text-2xl font-semibold text-brand-acid">С чит-кодом</div>
            <span className="text-xs px-3 py-1 rounded-full bg-white/12 text-white/80">лесенка 72 часа</span>
          </div>
          <div className="relative flex-1">
            {CHEAT.map((m, i) => <Row key={m.label} m={m} dark on={inView} i={i} />)}
          </div>
          <div className="relative mt-8 pt-6 border-t border-white/12 flex items-baseline justify-between">
            <span className="text-sm text-white/55">Удержание аудитории</span>
            <span className="text-2xl font-semibold tabular-nums text-brand-acid">
              <Counter value={98} on={inView} delay={420} />%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
