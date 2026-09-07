import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '../lib/useInView';
import { UserRole } from '../lib/constants';

const AnimatedNumber: React.FC<{ value: number; on: boolean; duration?: number }> = ({ value, on, duration = 1400 }) => {
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
    requestAnimationFrame(step);
  }, [on, value, duration]);
  return <>{v.toLocaleString('ru-RU')}</>;
};

const Row: React.FC<{ label: string; value: number; pct: number; dark?: boolean; on: boolean }> = ({ label, value, pct, dark, on }) => (
  <div>
    <div className={`text-sm mb-1.5 ${dark ? 'text-white/55' : 'text-brand-ink/50'}`}>{label}</div>
    <div className="flex items-center gap-4">
      <div className={`text-3xl md:text-4xl font-semibold tabular-nums tracking-tight min-w-[110px] ${dark ? 'text-white' : 'text-brand-ink'}`}>
        <AnimatedNumber value={value} on={on} />
      </div>
      <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${dark ? 'bg-white/10' : 'bg-brand-ink/[.06]'}`}>
        <div
          className={`h-full rounded-full ${dark ? 'bg-brand-acid' : 'bg-brand-ink/25'}`}
          style={{ width: on ? `${pct}%` : '0%', transition: 'width 1.2s cubic-bezier(.2,.8,.2,1) .1s' }}
        />
      </div>
      <span className={`text-xs tabular-nums w-9 text-right ${dark ? 'text-white/40' : 'text-brand-ink/35'}`}>{pct}%</span>
    </div>
  </div>
);

const GROWTH = [5, 10, 15, 20, 30, 45, 60, 80, 100, 110, 110];

const ComparisonSection: React.FC<{ role: UserRole }> = ({ role }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className="container-x">
      <h2 className="text-4xl md:text-5xl text-center mb-10 md:mb-14">
        {role === 'agency' ? 'Результат для клиента за 24 часа' : 'Результат за 24 часа'}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div className="card p-7 sm:p-10 md:p-12 flex flex-col justify-between">
          <div>
            <div className="text-sm text-brand-ink/40 mb-10">Обычный путь</div>
            <div className="space-y-8">
              <Row label="Подписчики" value={3850} pct={40} on={inView} />
              <Row label="Просмотры" value={1150} pct={25} on={inView} />
              <Row label="Реакции" value={12} pct={10} on={inView} />
            </div>
          </div>
          <div className="mt-12 h-[72px] flex items-end gap-1.5 opacity-30" aria-hidden="true">
            {GROWTH.map((v, i) => <div key={i} className="flex-1 rounded-sm bg-brand-ink/40" style={{ height: `${(v / 110) * 30 + 6}%` }} />)}
          </div>
        </div>

        <div className="bg-brand-purple rounded-card shadow-purple p-7 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-acid/20 blur-[90px] rounded-full pointer-events-none" />
          <div className="relative">
            <div className="flex items-start justify-between mb-10">
              <div className="text-2xl font-semibold text-brand-acid">С чит-кодом</div>
              <div className="text-right">
                <div className="text-xs text-white/50">Удержание</div>
                <div className="text-brand-acid text-xl font-semibold">98%</div>
              </div>
            </div>
            <div className="space-y-8">
              <Row label="Подписчики" value={12400} pct={98} dark on={inView} />
              <Row label="Просмотры" value={4600} pct={95} dark on={inView} />
              <Row label="Реакции" value={94} pct={92} dark on={inView} />
            </div>
          </div>
          <div className="relative mt-12 h-[72px] flex items-end gap-1.5" aria-hidden="true">
            {GROWTH.map((v, i) => (
              <div key={i} className="flex-1 rounded-sm bg-brand-acid" style={{
                height: inView ? `${(v / 110) * 100}%` : '4%',
                opacity: 0.35 + (i / GROWTH.length) * 0.65,
                transition: `height .8s cubic-bezier(.2,.8,.2,1) ${i * 50}ms`,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
